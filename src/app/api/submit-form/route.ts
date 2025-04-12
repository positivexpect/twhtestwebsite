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
    console.log('Checking Supabase storage bucket configuration...');
    
    // Check if we can access storage
    const { data: bucketList, error: storageError } = await supabase
      .storage
      .listBuckets();

    if (storageError) {
      console.error('Storage access error:', storageError);
      throw new Error(`Storage access failed: ${storageError.message}`);
    }

    console.log('Successfully accessed storage. Found buckets:', bucketList.map(b => b.name));

    const formUploadsBucket = bucketList.find(bucket => bucket.name === 'form-uploads');

    if (!formUploadsBucket) {
      console.log('form-uploads bucket not found, creating...');
      const { data: newBucket, error: createError } = await supabase
        .storage
        .createBucket('form-uploads', {
          public: true,
          fileSizeLimit: 104857600, // 100MB
        });

      if (createError) {
        console.error('Error creating bucket:', createError);
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }

      console.log('Successfully created form-uploads bucket with config:', newBucket);
    } else {
      console.log('Found existing form-uploads bucket:', formUploadsBucket);
      
      // Check bucket permissions
      if (!formUploadsBucket.public) {
        console.log('Bucket is not public, updating permissions...');
        const { error: updateError } = await supabase
          .storage
          .updateBucket('form-uploads', {
            public: true
          });

        if (updateError) {
          console.error('Error updating bucket permissions:', updateError);
          throw new Error(`Failed to update bucket permissions: ${updateError.message}`);
        }
        console.log('Successfully updated bucket to public access');
      }

      // Verify we can list files in the bucket
      const { data: files, error: listError } = await supabase
        .storage
        .from('form-uploads')
        .list();

      if (listError) {
        console.error('Error listing files in bucket:', listError);
        throw new Error(`Cannot access bucket contents: ${listError.message}`);
      }
      console.log(`Successfully verified bucket access. Contains ${files.length} files.`);
    }

    return true;
  } catch (error) {
    console.error('Bucket configuration error:', error);
    throw error;
  }
}

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.CUSTOMER_SMTP_HOST,
  port: parseInt(process.env.CUSTOMER_SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.CUSTOMER_SMTP_USER,
    pass: process.env.CUSTOMER_SMTP_PASS,
  },
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

export async function POST(request: Request) {
  try {
    console.log('Starting form submission process...');
    
    // Verify bucket configuration
    try {
      await ensureBucketExists();
      console.log('Bucket verification successful');
    } catch (bucketError) {
      console.error('Critical bucket configuration error:', bucketError);
      return NextResponse.json({
        success: false,
        message: 'Server storage configuration error. Please contact support.',
        error: bucketError instanceof Error ? bucketError.message : 'Unknown bucket error'
      }, { status: 500 });
    }

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
        { success: false, message: 'Captcha verification failed. Please refresh the page and try again.' },
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

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // Handle file uploads if present
    let fileReferences = [];
    let failedUploads = [];
    
    if (formData.files && formData.files.length > 0) {
      for (const file of formData.files) {
        try {
          console.log('Processing file:', {
            name: file.name,
            type: file.type,
            hasChunks: !!file.chunks,
            hasBase64: !!file.base64,
            size: file.size || 0
          });

          // Skip empty files
          if (!file.chunks?.length && !file.base64) {
            console.warn(`Skipping empty file: ${file.name}`);
            continue;
          }

          let fileBuffer;
          try {
            // Combine chunks if they exist
            if (file.chunks?.length) {
              const chunks = file.chunks.map((chunk: string, index: number) => {
                try {
                  const buffer = Buffer.from(chunk, 'base64');
                  console.log(`Processed chunk ${index + 1}/${file.chunks.length} for ${file.name}: ${buffer.length} bytes`);
                  return buffer;
                } catch (e) {
                  console.error(`Error decoding chunk ${index + 1}/${file.chunks.length} for ${file.name}:`, e);
                  throw new Error(`Failed to decode chunk for ${file.name}`);
                }
              });
              fileBuffer = Buffer.concat(chunks);
            } else if (file.base64) {
              fileBuffer = Buffer.from(file.base64, 'base64');
            } else {
              throw new Error(`No valid data found for ${file.name}`);
            }
          } catch (e) {
            console.error('Error processing file buffer:', e);
            throw new Error(`Failed to process file data for ${file.name}`);
          }

          // Only proceed if we have actual data
          if (fileBuffer.length === 0) {
            console.warn(`Empty file buffer for ${file.name}, skipping`);
            continue;
          }

          console.log('File buffer created:', {
            name: file.name,
            size: fileBuffer.length
          });

          const fileName = `${Date.now()}-${file.name}`;
          
          // Upload to Supabase with retries
          let uploadAttempt = 0;
          let uploadSuccess = false;
          let lastError;

          while (uploadAttempt < 3 && !uploadSuccess) {
            try {
              const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('form-uploads')
                .upload(fileName, fileBuffer, {
                  contentType: file.type || 'application/octet-stream',
                  upsert: uploadAttempt > 0, // Allow overwrite on retry
                  cacheControl: '3600'
                });

              if (uploadError) {
                throw uploadError;
              }
              
              // Get the public URL
              const { data: { publicUrl } } = supabase
                .storage
                .from('form-uploads')
                .getPublicUrl(uploadData.path);

              console.log('File uploaded successfully:', {
                fileName,
                path: uploadData.path,
                publicUrl,
                size: fileBuffer.length,
                attempt: uploadAttempt + 1
              });
              
              fileReferences.push({
                name: file.name,
                path: uploadData.path,
                type: file.type,
                url: publicUrl,
                size: fileBuffer.length
              });

              uploadSuccess = true;
            } catch (error) {
              lastError = error;
              uploadAttempt++;
              console.error(`Upload attempt ${uploadAttempt} failed:`, error);
              
              if (uploadAttempt < 3) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, uploadAttempt)));
              }
            }
          }

          if (!uploadSuccess) {
            throw lastError || new Error(`Failed to upload ${file.name} after 3 attempts`);
          }
        } catch (error) {
          console.error('Error processing file:', error);
          failedUploads.push({
            name: file.name,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    // If all files failed to upload but some files were attempted, return error
    if (formData.files?.length > 0 && fileReferences.length === 0 && failedUploads.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'All file uploads failed',
        errors: failedUploads
      }, { status: 500 });
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
      console.error('Database error:', dbError);
      return NextResponse.json({
        success: false,
        message: 'Failed to save submission',
        error: dbError.message
      }, { status: 500 });
    }

    // Send email notifications
    try {
      await transporter.sendMail({
        from: {
          name: 'The Window Hospital',
          address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
        },
        to: process.env.ADMIN_EMAIL,
        subject: `New ${formData.formType} Submission`,
        html: `
          <h2>New Form Submission</h2>
          <p><strong>Type:</strong> ${formData.formType}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          ${formData.address ? `
            <p><strong>Address:</strong><br>
            ${formData.address.street}<br>
            ${formData.address.city}, ${formData.address.state} ${formData.address.zip}
            </p>
          ` : ''}
          ${fileReferences.length > 0 ? `
            <p><strong>Uploaded Files:</strong></p>
            <ul>
              ${fileReferences.map(file => `
                <li><a href="${file.url}">${file.name}</a> (${Math.round(file.size / 1024)}KB)</li>
              `).join('')}
            </ul>
          ` : ''}
        `
      });

      // Send confirmation email to customer
      if (formData.email) {
        await transporter.sendMail({
          from: {
            name: 'The Window Hospital',
            address: process.env.CUSTOMER_SMTP_FROM_EMAIL!
          },
          to: formData.email,
          subject: 'Thank you for your submission',
          html: `
            <h2>Thank you for contacting The Window Hospital</h2>
            <p>We have received your submission and will get back to you shortly.</p>
            <p>If you have any immediate questions, please don't hesitate to call us.</p>
          `
        });
      }
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Continue with the response even if email fails
    }

    // Return success with partial upload info if some files failed
    return NextResponse.json({
      success: true,
      data: submission,
      failedUploads: failedUploads.length > 0 ? failedUploads : undefined
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 