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

export async function POST(request: Request) {
  try {
    // Ensure bucket exists before processing
    await ensureBucketExists();

    const data = await request.json();
    const formType = data.formType || 'assessment';
    
    // Log the received data
    console.log('Received form submission:', {
      formType,
      name: data.name,
      email: data.email,
      hasFiles: data.files?.length > 0
    });

    // Handle file uploads if present
    let fileReferences = [];
    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        const fileBuffer = Buffer.from(file.base64, 'base64');
        const fileName = `${uuidv4()}-${file.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('form-uploads')
          .upload(fileName, fileBuffer, {
            contentType: file.type,
            upsert: false
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
      }
    }

    // Store submission in database
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: formType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        form_data: data,
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
        <h2 style="color: #CD2028;">New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Request</h2>
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
        subject: `New ${formType} Request from ${data.name}`,
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
    if (data.email) {
      try {
        const autoReplyHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://thewindowhospital.com/images/fulllogo_transparent_nobuffer.png" alt="The Window Hospital" style="width: 200px; margin-bottom: 20px;" />
            <h2 style="color: #CD2028;">Thank You for Your Request</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your request and will contact you shortly to discuss your needs.</p>
            <p>Best regards,<br/>The Window Hospital Team</p>
          </div>
        `;

        await transporter.sendMail({
          from: {
            name: 'The Window Hospital',
            address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
          },
          to: data.email,
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