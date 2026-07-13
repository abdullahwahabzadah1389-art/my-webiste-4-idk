import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "trusttvmountingservices@gmail.com";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, details } = req.body;

  try {
    if (resend) {
      const phoneDisplay = phone || "Not specified";
      const emailDisplay = email || "Not specified";

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
    return res.status(500).json({ error: err.message || "Failed to process contact request" });
  }
}
