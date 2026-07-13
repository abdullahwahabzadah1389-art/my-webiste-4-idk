import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

// ES modules support for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe lazy check of Resend
  const getResend = () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn("⚠️ RESEND_API_KEY environment variable is missing. Emails will NOT be sent.");
      return null;
    }
    return new Resend(key);
  };

  // Default emails
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "trusttvmountingservices@gmail.com";
  const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

  // API Endpoints
  app.post("/api/appointments", async (req, res) => {
    try {
      const {
        name,
        phone,
        email,
        service,
        customService,
        preferredDate,
        preferredTime,
        address,
        notes,
      } = req.body;

      console.log("📅 Received appointment request:", req.body);

      const resend = getResend();
      if (resend) {
        // 1. Send Admin Notification Email
        const serviceDisplay = service === "Other" && customService ? `Other (${customService})` : service;
        const dateDisplay = preferredDate || "Not specified";
        const timeDisplay = preferredTime || "Not specified";
        const phoneDisplay = phone || "Not specified";
        const emailDisplay = email || "Not specified";
        const addressDisplay = address || "Not specified";
        const notesDisplay = notes || "None";

        const adminEmailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #0a1628; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">New Appointment Request</h2>
              <p style="color: #c9a227; margin: 5px 0 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Trust TV Mounting & Home Solutions</p>
            </div>
            
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">You have received a new appointment request from your website. Here are the details:</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%; color: #475569;">Customer Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone Number:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="tel:${phoneDisplay}">${phoneDisplay}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${emailDisplay}">${emailDisplay}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Service Needed:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #c9a227; font-weight: bold;">${serviceDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Preferred Date:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${dateDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Preferred Time:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${timeDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Service Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${addressDisplay}</td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #475569; font-size: 14px;">Additional Notes:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">${notesDisplay}</p>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="tel:${phoneDisplay}" style="background-color: #c9a227; color: #0a1628; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 8px; display: inline-block;">Call Customer Now</a>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e8ed; color: #94a3b8; font-size: 12px;">
              Sent from website appointment lead form.
            </div>
          </div>
        `;

        await resend.emails.send({
          from: `Trust TV Lead <${SENDER_EMAIL}>`,
          to: ADMIN_EMAIL,
          subject: `🚨 New Appointment Lead - ${name} (${serviceDisplay})`,
          html: adminEmailHtml,
        });

        // 2. Send Customer Confirmation Email (if email is provided)
        if (email && email.trim() !== "") {
          const customerEmailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; background-color: #ffffff;">
              <div style="background-color: #0a1628; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Appointment Requested</h1>
                <p style="color: #c9a227; margin: 5px 0 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Trust TV Mounting & Home Solutions</p>
              </div>
              
              <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
                <h3 style="font-size: 18px; margin-top: 0; color: #0a1628;">Hi ${name},</h3>
                <p style="font-size: 15px;">Thank you for requesting an appointment with Trust TV Mounting! We have received your request and are currently reviewing our schedule.</p>
                
                <div style="background-color: #f8fafc; border-left: 4px solid #c9a227; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                  <h4 style="margin: 0 0 10px 0; color: #0a1628; font-size: 15px;">Your Requested Service Details:</h4>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Service:</strong> ${serviceDisplay}</p>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Preferred Date:</strong> ${dateDisplay}</p>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Preferred Time:</strong> ${timeDisplay}</p>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> ${addressDisplay}</p>
                </div>
                
                <p style="font-size: 15px;"><strong>What's next?</strong></p>
                <p style="font-size: 14px; margin-top: 5px;">Our team will reach out to you via call or text within <strong>1 hour</strong> to verify and confirm your service window.</p>
                
                <p style="font-size: 15px; margin-top: 24px;">Need immediate assistance or want to make changes? Call or text us directly at:</p>
                <p style="font-size: 18px; font-weight: bold; color: #c9a227; margin: 5px 0;"><a href="tel:4697933130" style="color: #c9a227; text-decoration: none;">(469) 793-3130</a></p>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e8ed; color: #64748b; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0; font-weight: bold;">Trust TV Mounting & Home Solutions</p>
                <p style="margin: 3px 0 0 0;">Serving McKinney, Frisco, Plano, Allen, Celina, Princeton, & DFW Metroplex</p>
              </div>
            </div>
          `;

          await resend.emails.send({
            from: `Trust TV Mounting <${SENDER_EMAIL}>`,
            to: email,
            subject: `📅 Appointment Request Received - Trust TV Mounting`,
            html: customerEmailHtml,
          });
        }
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("❌ Error in appointments endpoint:", err);
      return res.status(500).json({ error: err.message || "Failed to process appointment" });
    }
  });

  app.post("/api/contact-requests", async (req, res) => {
    try {
      const { name, phone, email, details } = req.body;

      console.log("💬 Received contact/quote request:", req.body);

      const resend = getResend();
      if (resend) {
        const phoneDisplay = phone || "Not specified";
        const emailDisplay = email || "Not specified";

        // 1. Send Admin Notification Email
        const adminEmailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #0a1628; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">New Quote Request</h2>
              <p style="color: #c9a227; margin: 5px 0 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Trust TV Mounting & Home Solutions</p>
            </div>
            
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">You have received a new quote/contact request from your website. Details are below:</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%; color: #475569;">Customer Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone Number:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="tel:${phoneDisplay}">${phoneDisplay}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${emailDisplay}">${emailDisplay}</a></td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #475569; font-size: 14px;">Project details:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">${details}</p>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="tel:${phoneDisplay}" style="background-color: #c9a227; color: #0a1628; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 8px; display: inline-block;">Call Customer Now</a>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e8ed; color: #94a3b8; font-size: 12px;">
              Sent from website quote request form.
            </div>
          </div>
        `;

        await resend.emails.send({
          from: `Trust TV Lead <${SENDER_EMAIL}>`,
          to: ADMIN_EMAIL,
          subject: `💬 New Quote Lead - ${name}`,
          html: adminEmailHtml,
        });

        // 2. Send Customer Confirmation Email (if email is provided)
        if (email && email.trim() !== "") {
          const customerEmailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; background-color: #ffffff;">
              <div style="background-color: #0a1628; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Quote Request Received</h1>
                <p style="color: #c9a227; margin: 5px 0 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Trust TV Mounting & Home Solutions</p>
              </div>
              
              <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
                <h3 style="font-size: 18px; margin-top: 0; color: #0a1628;">Hi ${name},</h3>
                <p style="font-size: 15px;">We have successfully received your quote request details. Our experts are estimating the service requirements and will reach out to you shortly.</p>
                
                <p style="font-size: 15px;"><strong>What's next?</strong></p>
                <p style="font-size: 14px; margin-top: 5px;">We typically reply within <strong>30 minutes to 1 hour</strong> during business hours with a clear, honest quote!</p>
                
                <p style="font-size: 15px; margin-top: 24px;">Need immediate pricing or want to text us photos of your walls? Reach out directly at:</p>
                <p style="font-size: 18px; font-weight: bold; color: #c9a227; margin: 5px 0;"><a href="tel:4697933130" style="color: #c9a227; text-decoration: none;">(469) 793-3130</a></p>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e8ed; color: #64748b; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0; font-weight: bold;">Trust TV Mounting & Home Solutions</p>
                <p style="margin: 3px 0 0 0;">Serving McKinney, Frisco, Plano, Allen, Celina, Princeton, & DFW Metroplex</p>
              </div>
            </div>
          `;

          await resend.emails.send({
            from: `Trust TV Mounting <${SENDER_EMAIL}>`,
            to: email,
            subject: `💬 Quote Request Received - Trust TV Mounting`,
            html: customerEmailHtml,
          });
        }
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("❌ Error in contact-requests endpoint:", err);
      return res.status(500).json({ error: err.message || "Failed to process contact request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
