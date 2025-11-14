import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  host: process.env.CUSTOMER_SMTP_HOST,
  port: parseInt(process.env.CUSTOMER_SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.CUSTOMER_SMTP_USER,
    pass: process.env.CUSTOMER_SMTP_PASS,
  },
});

async function verifyCaptcha(token: string) {
  try {
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Captcha verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { captchaToken, files = [], ...formData } = body;

    if (!captchaToken) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Convert file objects to references with URL
    const fileReferences = files.map((file: any) => ({
      name: file.name,
      url: file.url,
      size: file.size
    }));

    const { data: submission, error: dbError } = await supabase
      .from('nova_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        form_data: formData,
        files: fileReferences
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save submission' },
        { status: 500 }
      );
    }

    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #CD2028;">New Northern Virginia Assessment Request (Nova)</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            ${formData.address ? `
              <p><strong>Address:</strong><br/>
                ${formData.address.street ? formData.address.street + '<br/>' : ''}
                ${formData.address.city}, ${formData.address.state} ${formData.address.zip}
              </p>
            ` : ''}
            ${formData.windowType ? `<p><strong>Window Type:</strong> ${formData.windowType}</p>` : ''}
            ${formData.issue ? `<p><strong>Main Issue:</strong> ${formData.issue}</p>` : ''}
            ${formData.windowCount ? `<p><strong>Number of Windows:</strong> ${formData.windowCount}</p>` : ''}
            ${formData.message ? `<p><strong>Additional Details:</strong><br/>${formData.message}</p>` : ''}
            <p><strong>SMS Consent:</strong> ${formData.textConsent === 'yes' ? 'Yes' : 'No'}</p>
            ${fileReferences.length > 0 ? `
              <p><strong>Uploaded Files:</strong></p>
              <ul>
                ${fileReferences.map(file => `
                  <li><a href="${file.url}">${file.name}</a> (${Math.round(file.size / 1024)}KB)</li>
                `).join('')}
              </ul>
            ` : ''}
            <p style="margin-top: 20px; color: #999; font-size: 12px;">Submitted from: Northern Virginia (Nova) Page | Submission ID: ${submission?.id}</p>
          </div>
        </div>
      `;

      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #CD2028;">Thank You for Your Assessment Request</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for submitting your window assessment request to The Window Hospital. We've received your information and will contact you shortly to schedule your free assessment.</p>
          <p><strong>What to expect:</strong></p>
          <ul>
            <li>A call or text (if you opted in) from our team within 1 business day</li>
            <li>A convenient time to visit your home for a free assessment</li>
            <li>A detailed quote with repair options and savings information</li>
          </ul>
          <p>If you have any immediate questions, feel free to call us at <strong>540-603-0088</strong>.</p>
          <p>Best regards,<br/>The Window Hospital Team<br/>Serving Northern Virginia</p>
        </div>
      `;

      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
        },
        to: [process.env.ADMIN_EMAIL, 'doug@thewindowhospital.com'].join(','),
        subject: 'New Northern Virginia Assessment Request (Nova)',
        html: adminEmailHtml
      });

      if (formData.email) {
        await transporter.sendMail({
          from: {
            name: 'The Window Hospital',
            address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
          },
          to: formData.email,
          subject: 'Thank You for Your Assessment Request - The Window Hospital',
          html: customerEmailHtml
        });
      }
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
    }

    return NextResponse.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
