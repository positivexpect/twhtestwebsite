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

export async function POST(request: Request) {
  try {
    // Ensure bucket exists before processing
    await ensureBucketExists();

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