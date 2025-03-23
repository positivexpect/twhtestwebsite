import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">New Franchise Inquiry</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Interest:</strong> ${data.interest}</p>
          <p><strong>Has Contractor License:</strong> ${data.hasLicense}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
          <p>${data.message || 'No additional information provided.'}</p>
        </div>
      </div>
    `;

    // Create auto-reply email content
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">Thank You for Your Interest in The Window Hospital</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in The Window Hospital franchise opportunity. We have received your inquiry and will review it promptly.</p>
          <p>We aim to respond to all inquiries within 1-2 business days. In the meantime, if you have any immediate questions, please don't hesitate to reach out to us directly.</p>
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
        name: 'The Window Hospital Franchise',
        address: 'franchise@orders.thewindowhospital.com'
      },
      to: 'josh@thewindowhospital.com',
      subject: 'New Franchise Inquiry',
      html: adminEmailHtml,
      attachments: [{
        filename: 'logo.png',
        path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
        cid: 'companyLogo'
      }]
    });

    // Send auto-reply to the inquirer
    await transporter.sendMail({
      from: {
        name: 'The Window Hospital',
        address: 'franchise@orders.thewindowhospital.com'
      },
      to: data.email,
      subject: 'Thank You for Your Interest in The Window Hospital',
      html: autoReplyHtml,
      attachments: [{
        filename: 'logo.png',
        path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
        cid: 'companyLogo'
      }]
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully' 
    });

  } catch (error) {
    console.error('Error submitting franchise inquiry:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit inquiry. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 