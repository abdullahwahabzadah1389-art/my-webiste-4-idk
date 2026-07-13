import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "trusttvmountingservices@gmail.com";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

function formatTime12h(time24: string): string {
  if (!time24 || !time24.includes(':')) return time24;
  const [hours24, minutes] = time24.split(":").map(Number);
  if (isNaN(hours24) || isNaN(minutes)) return time24;
  
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const minutesStr = minutes.toString().padStart(2, '0');
  
  return `${hours12}:${minutesStr} ${period}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  try {
    if (resend) {
      const serviceDisplay = service === "Other" && customService ? `Other (${customService})` : service;
      const dateDisplay = preferredDate || "Not specified";
      const timeDisplay = preferredTime ? formatTime12h(preferredTime) : "Not specified";
      const phoneDisplay = phone || "Not specified";
      const emailDisplay = email || "Not specified";
      const notesDisplay = notes || "None";
      const addressDisplay = address || "Not specified";

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
    return res.status(500).json({ error: err.message || "Failed to process appointment" });
  }
}
