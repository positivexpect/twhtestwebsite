import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Ensure the bucket exists and is properly configured
async function ensureBucketExists() {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      throw listError;
    }

    const formUploadsBucket = buckets.find(bucket => bucket.name === 'form-uploads');

    if (!formUploadsBucket) {
      // Create the bucket if it doesn't exist
      const { data: newBucket, error: createError } = await supabase
        .storage
        .createBucket('form-uploads', {
          public: true,
          fileSizeLimit: 104857600, // 100MB
        });

      if (createError) {
        console.error('Error creating bucket:', createError);
        throw createError;
      }

      console.log('Created form-uploads bucket');
    } else if (!formUploadsBucket.public) {
      // Make the bucket public if it exists but isn't public
      const { error: updateError } = await supabase
        .storage
        .updateBucket('form-uploads', {
          public: true
        });

      if (updateError) {
        console.error('Error updating bucket:', updateError);
        throw updateError;
      }

      console.log('Made form-uploads bucket public');
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
    throw error;
  }
}

// Initialize email transporter for customer inquiries
const transporter = nodemailer.createTransport({
  host: process.env.CUSTOMER_SMTP_HOST,
  port: Number(process.env.CUSTOMER_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.CUSTOMER_SMTP_USER,
    pass: process.env.CUSTOMER_SMTP_PASS,
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
    // Ensure bucket exists before processing
    await ensureBucketExists();

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

    // Log the received data
    console.log('Received form submission:', {
      formType: formData.formType,
      name: formData.name,
      email: formData.email,
      hasFiles: formData.files?.length > 0
    });

    // Handle file uploads if present
    let fileReferences = [];
    if (formData.files && formData.files.length > 0) {
      for (const file of formData.files) {
        try {
          // Combine chunks if they exist
          const fileBuffer = file.chunks 
            ? Buffer.concat(file.chunks.map((chunk: string) => Buffer.from(chunk, 'base64')))
            : Buffer.from(file.base64, 'base64');

          const fileName = `${uuidv4()}-${file.name}`;
          
          // Upload to Supabase in chunks
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('form-uploads')
            .upload(fileName, fileBuffer, {
              contentType: file.type,
              upsert: false,
              cacheControl: '3600'
            });

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw uploadError;
          }
          
          // Get the public URL for the file
          const { data: { publicUrl } } = supabase
            .storage
            .from('form-uploads')
            .getPublicUrl(uploadData.path);

          console.log('File uploaded successfully:', {
            fileName,
            path: uploadData.path,
            publicUrl
          });
          
          fileReferences.push({
            name: file.name,
            path: uploadData.path,
            type: file.type,
            url: publicUrl
          });
        } catch (error) {
          console.error('Error processing file:', error);
          // Continue with other files even if one fails
          continue;
        }
      }
    }

    // Store submission in database
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: formData.formType,
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
      console.error('Error storing in database:', dbError);
      throw dbError;
    }

    // Log email configuration
    console.log('Email configuration:', {
      host: process.env.CUSTOMER_SMTP_HOST,
      port: process.env.CUSTOMER_SMTP_PORT,
      from: process.env.CUSTOMER_SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL
    });

    // Create email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="https://thewindowhospital.com/images/fulllogo_transparent_nobuffer.png" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
        <h2 style="color: #CD2028;">New ${formData.formType.charAt(0).toUpperCase() + formData.formType.slice(1)} Request</h2>
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
          ${fileReferences.length > 0 ? `
          <h3 style="color: #333; margin-top: 20px;">Attached Files:</h3>
          <ul style="list-style: none; padding: 0;">
            ${fileReferences.map(file => `
              <li style="margin-bottom: 10px;">
                <a href="${file.url}" style="color: #CD2028; text-decoration: none;">
                  ${file.name}
                </a>
              </li>
            `).join('')}
          </ul>
          ` : ''}
        </div>
      </div>
    `;

    // Send email to admin
    try {
      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
        },
        to: process.env.ADMIN_EMAIL!,
        subject: `New ${formData.formType} Request from ${formData.name}`,
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

    // Send auto-reply to the customer if email is provided
    if (formData.email) {
      try {
        const autoReplyHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://thewindowhospital.com/images/fulllogo_transparent_nobuffer.png" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
            <h2 style="color: #CD2028;">Thank You for Your Request</h2>
            <p>Dear ${formData.name},</p>
            <p>We have received your request and will contact you shortly to discuss your needs.</p>
            <p>Best regards,<br/>The Window Hospital Team</p>
          </div>
        `;

        await transporter.sendMail({
          from: {
            name: 'The Window Hospital',
            address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
          },
          to: formData.email,
          subject: 'Thank You for Your Request',
          html: autoReplyHtml
        });
        console.log('Customer auto-reply sent successfully');
      } catch (emailError) {
        console.error('Error sending customer auto-reply:', emailError);
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
      message: 'Form submitted successfully',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit form. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 