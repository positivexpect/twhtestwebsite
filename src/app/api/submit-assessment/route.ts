import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyCaptcha(token: string) {
  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
  });

  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { captchaToken, ...formData } = body;

    // Verify captcha
    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { success: false, message: 'Captcha verification failed' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('assessments')
      .insert([formData]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to save assessment request' },
        { status: 500 }
      );
    }

    // Create email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">New Assessment Request</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          ${formData.address ? `
          <p><strong>Address:</strong><br/>
            ${formData.address.street}<br/>
            ${formData.address.city}, ${formData.address.state} ${formData.address.zip}
          </p>
          ` : ''}
          ${formData.zipCode ? `<p><strong>ZIP Code:</strong> ${formData.zipCode}</p>` : ''}
          ${formData.issueTypes ? `<p><strong>Issues:</strong> ${formData.issueTypes.join(', ')}</p>` : ''}
          ${formData.issueType ? `<p><strong>Issue Type:</strong> ${formData.issueType}</p>` : ''}
          ${formData.customerType ? `<p><strong>Customer Type:</strong> ${formData.customerType}</p>` : ''}
          ${formData.serviceType ? `<p><strong>Service Type:</strong> ${formData.serviceType}</p>` : ''}
          ${formData.urgency ? `<p><strong>Urgency:</strong> ${formData.urgency}</p>` : ''}
          ${formData.needByDate ? `<p><strong>Need by Date:</strong> ${formData.needByDate}</p>` : ''}
          ${formData.textConsent ? `<p><strong>SMS Consent:</strong> ${formData.textConsent}</p>` : ''}
          ${formData.message ? `
          <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
          <p>${formData.message}</p>
          ` : ''}
        </div>
      </div>
    `;

    // Create auto-reply email content
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">Thank You for Your Assessment Request</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p>Dear ${formData.name},</p>
          <p>Thank you for requesting a free assessment from The Window Hospital. We have received your request and will review it promptly.</p>
          <p>We aim to respond to all inquiries within 1 business day. In the meantime, if you have any immediate questions, please don't hesitate to reach out to us directly.</p>
          <p>Best regards,<br>The Window Hospital Team</p>
        </div>
      </div>
    `;

    // Create Nodemailer transporter with TLS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true
      }
    });

    // Send email to admin
    await transporter.sendMail({
      from: {
        name: 'The Window Hospital Assessment',
        address: process.env.SMTP_FROM_EMAIL!
      },
      to: 'josh@thewindowhospital.com',
      subject: 'New Assessment Request',
      html: adminEmailHtml,
      attachments: [{
        filename: 'logo.png',
        path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
        cid: 'companyLogo'
      }]
    });

    // Send auto-reply to the customer
    if (formData.email) {
      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.SMTP_FROM_EMAIL!
        },
        to: formData.email,
        subject: 'Thank You for Your Assessment Request',
        html: autoReplyHtml,
        attachments: [{
          filename: 'logo.png',
          path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
          cid: 'companyLogo'
        }]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 