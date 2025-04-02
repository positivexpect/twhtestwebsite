import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: {
      schema: 'public'
    },
    global: {
      fetch: fetch.bind(globalThis),
      headers: { 'x-statement-timeout': '30000' }
    }
  }
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
  try {
    console.log('Verifying captcha token...');
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}&sitekey=${process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}`,
    });

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

interface FileReference {
  name: string;
  type: string;
  size: number;
  url: string;
  path: string;
}

interface FormData {
  formType: string;
  name: string;
  email: string;
  phone: string;
  zipCode?: string;
  issueTypes?: string[];
  message?: string;
  files?: FileReference[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { captchaToken, ...formData } = body;

    // Verify captcha
    if (!captchaToken) {
      return NextResponse.json(
        { success: false, message: 'Captcha token is required' },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { success: false, message: 'Captcha verification failed. Please try again.' },
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

    // Insert into database with file references
    const { error: dbError } = await supabase
      .from('assessments')
      .insert({
        ...formData,
        files: formData.files?.map((file: FileReference) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.url,
          path: file.path.split('/form-uploads/')[1] // Ensure we only store the relative path
        })) || []
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save assessment request. Please try again.' },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.CUSTOMER_SMTP_FROM_EMAIL,
        to: process.env.CUSTOMER_ADMIN_EMAIL,
        subject: 'New Assessment Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #CD2028;">New Assessment Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              ${formData.zipCode ? `<p><strong>ZIP Code:</strong> ${formData.zipCode}</p>` : ''}
              ${formData.issueTypes?.length ? `<p><strong>Issues:</strong> ${formData.issueTypes.join(', ')}</p>` : ''}
              ${formData.message ? `<p><strong>Message:</strong> ${formData.message}</p>` : ''}
              ${formData.files?.length ? `
                <h3>Attached Files:</h3>
                <ul>
                  ${formData.files.map((file: FileReference) => `
                    <li><a href="${file.url}">${file.name}</a> (${Math.round(file.size / 1024 / 1024)}MB)</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
} 