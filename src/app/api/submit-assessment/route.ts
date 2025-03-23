import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">New Assessment Request</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.address ? `
          <p><strong>Address:</strong><br/>
            ${data.address.street}<br/>
            ${data.address.city}, ${data.address.state} ${data.address.zip}
          </p>
          ` : ''}
          ${data.zipCode ? `<p><strong>ZIP Code:</strong> ${data.zipCode}</p>` : ''}
          ${data.issueTypes ? `<p><strong>Issues:</strong> ${data.issueTypes.join(', ')}</p>` : ''}
          ${data.issueType ? `<p><strong>Issue Type:</strong> ${data.issueType}</p>` : ''}
          ${data.customerType ? `<p><strong>Customer Type:</strong> ${data.customerType}</p>` : ''}
          ${data.serviceType ? `<p><strong>Service Type:</strong> ${data.serviceType}</p>` : ''}
          ${data.urgency ? `<p><strong>Urgency:</strong> ${data.urgency}</p>` : ''}
          ${data.needByDate ? `<p><strong>Need by Date:</strong> ${data.needByDate}</p>` : ''}
          ${data.textConsent ? `<p><strong>SMS Consent:</strong> ${data.textConsent}</p>` : ''}
          ${data.message ? `
          <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
          <p>${data.message}</p>
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
          <p>Dear ${data.name},</p>
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
    if (data.email) {
      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.SMTP_FROM_EMAIL!
        },
        to: data.email,
        subject: 'Thank You for Your Assessment Request',
        html: autoReplyHtml,
        attachments: [{
          filename: 'logo.png',
          path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
          cid: 'companyLogo'
        }]
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Assessment request submitted successfully' 
    });

  } catch (error) {
    console.error('Error submitting assessment request:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit request. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 