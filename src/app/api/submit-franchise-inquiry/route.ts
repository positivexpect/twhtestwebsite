import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize email transporter for franchise inquiries
const transporter = nodemailer.createTransport({
  host: process.env.FRANCHISE_SMTP_HOST,
  port: Number(process.env.FRANCHISE_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.FRANCHISE_SMTP_USER,
    pass: process.env.FRANCHISE_SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the received data
    console.log('Received franchise inquiry:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location
    });

    // Store submission in database
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'franchise',
        name: data.name,
        email: data.email,
        phone: data.phone,
        form_data: data
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error storing in database:', dbError);
      throw dbError;
    }

    // Log email configuration
    console.log('Email configuration:', {
      host: process.env.FRANCHISE_SMTP_HOST,
      port: process.env.FRANCHISE_SMTP_PORT,
      from: process.env.FRANCHISE_SMTP_FROM_EMAIL,
      to: process.env.FRANCHISE_ADMIN_EMAIL
    });

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
          ${data.message ? `
          <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
          <p>${data.message}</p>
          ` : ''}
        </div>
      </div>
    `;

    // Send email to admin
    try {
      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.FRANCHISE_SMTP_FROM_EMAIL!
        },
        to: process.env.FRANCHISE_ADMIN_EMAIL!,
        subject: `New Franchise Inquiry from ${data.name}`,
        html: adminEmailHtml,
        attachments: [{
          filename: 'logo.png',
          path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
          cid: 'companyLogo'
        }]
      });
      console.log('Admin email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
      // Don't throw here, continue with the rest of the process
    }

    // Send auto-reply to the franchise inquirer
    if (data.email) {
      try {
        const autoReplyHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="cid:companyLogo" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
            <h2 style="color: #CD2028;">Thank You for Your Franchise Inquiry</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your franchise inquiry and will contact you shortly to discuss this exciting opportunity.</p>
            <p>Best regards,<br/>The Window Hospital Team</p>
          </div>
        `;

        await transporter.sendMail({
          from: {
            name: 'The Window Hospital',
            address: process.env.FRANCHISE_SMTP_FROM_EMAIL!
          },
          to: data.email,
          subject: 'Thank You for Your Franchise Inquiry',
          html: autoReplyHtml,
          attachments: [{
            filename: 'logo.png',
            path: './public/images/fulllogo_transparent_nobuffer - Copy.png',
            cid: 'companyLogo'
          }]
        });
        console.log('Franchise inquirer auto-reply sent successfully');
      } catch (emailError) {
        console.error('Error sending franchise inquirer auto-reply:', emailError);
        // Don't throw here, continue with the rest of the process
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Franchise inquiry submitted successfully',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Error submitting franchise inquiry:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit franchise inquiry. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 