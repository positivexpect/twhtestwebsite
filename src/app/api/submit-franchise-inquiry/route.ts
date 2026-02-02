import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// CAPTCHA verification function
async function verifyCaptcha(token: string) {
  try {
    console.log('Verifying captcha token...');
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    if (!response.ok) {
      console.error('Captcha verification HTTP error:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('Captcha verification response:', {
      success: data.success,
      errorCodes: data['error-codes'],
      hostname: data.hostname
    });

    return data.success;
  } catch (error) {
    console.error('Captcha verification error:', error);
    return false;
  }
}

// Initialize email transporter for franchise inquiries
const transporter = nodemailer.createTransport({
  host: process.env.FRANCHISE_SMTP_HOST,
  port: Number(process.env.FRANCHISE_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.FRANCHISE_SMTP_USER,
    pass: process.env.FRANCHISE_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Verify SMTP connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { captchaToken, ...formData } = data;

    // Verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Log the received data
    console.log('Received franchise inquiry:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location
    });

    // Store submission in database
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'franchise',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        form_data: formData
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
        <img src="https://thewindowhospital.com/images/fulllogo_transparent_nobuffer.png" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">New Franchise Inquiry</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Location:</strong> ${formData.location}</p>
          ${formData.message ? `
          <h3 style="color: #333; margin-top: 20px;">Additional Information:</h3>
          <p>${formData.message}</p>
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
        subject: `New Franchise Inquiry from ${formData.name}`,
        html: adminEmailHtml
      });
      console.log('Admin email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
      // Log the full error details
      if (emailError instanceof Error) {
        console.error('Email error details:', {
          message: emailError.message,
          stack: emailError.stack,
          code: (emailError as any).code,
          command: (emailError as any).command
        });
      }
      // Don't throw here, continue with the rest of the process
    }

    // Send auto-reply to the franchise inquirer
    if (data.email) {
      try {
        const autoReplyHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://thewindowhospital.com/images/fulllogo_transparent_nobuffer.png" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
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
          html: autoReplyHtml
        });
        console.log('Franchise inquirer auto-reply sent successfully');
      } catch (emailError) {
        console.error('Error sending franchise inquirer auto-reply:', emailError);
        // Log the full error details
        if (emailError instanceof Error) {
          console.error('Email error details:', {
            message: emailError.message,
            stack: emailError.stack,
            code: (emailError as any).code,
            command: (emailError as any).command
          });
        }
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
