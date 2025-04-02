import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Ensure bucket exists and is properly configured
async function ensureBucketExists() {
  try {
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      throw listError;
    }

    const formUploadsBucket = buckets.find(bucket => bucket.name === 'form-uploads');

    if (!formUploadsBucket) {
      const { error: createError } = await supabase
        .storage
        .createBucket('form-uploads', {
          public: true,
          fileSizeLimit: 524288000, // 500MB
          allowedMimeTypes: ['image/*', 'video/*']
        });

      if (createError) {
        console.error('Error creating bucket:', createError);
        throw createError;
      }
    } else {
      // Update bucket configuration if needed
      const { error: updateError } = await supabase
        .storage
        .updateBucket('form-uploads', {
          public: true,
          fileSizeLimit: 524288000, // 500MB
          allowedMimeTypes: ['image/*', 'video/*']
        });

      if (updateError) {
        console.error('Error updating bucket:', updateError);
        throw updateError;
      }
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
    throw error;
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Ensure bucket exists
    await ensureBucketExists();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const contentType = formData.get('contentType') as string;
    const formType = formData.get('formType') as string;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: 'File and filename are required' },
        { status: 400 }
      );
    }

    // Validate file type based on form type
    const fileType = contentType.split('/')[0];
    if (formType === 'video_testimonial' && fileType !== 'video') {
      return NextResponse.json(
        { error: 'Only video files are allowed for video testimonials' },
        { status: 400 }
      );
    }
    if (formType === 'ugly_window_contest' && fileType !== 'image') {
      return NextResponse.json(
        { error: 'Only image files are allowed for the ugly window contest' },
        { status: 400 }
      );
    }
    if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Only image and video files are allowed' },
        { status: 400 }
      );
    }

    // Create a unique filename with form type prefix if available
    const timestamp = Date.now();
    const sanitizedName = fileName
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const uniqueFileName = formType 
      ? `${formType}/${timestamp}-${sanitizedName}`
      : `${timestamp}-${sanitizedName}`;

    console.log('Processing upload:', {
      originalName: fileName,
      sanitizedName: uniqueFileName,
      contentType,
      size: file.size,
      formType
    });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase with increased timeout
    const { data, error } = await supabase
      .storage
      .from('form-uploads')
      .upload(uniqueFileName, buffer, {
        contentType: contentType || 'application/octet-stream',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('Upload successful:', {
      path: data.path,
      size: buffer.length,
      formType
    });

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('form-uploads')
      .getPublicUrl(data.path);

    return NextResponse.json({
      path: data.path,
      url: publicUrl
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 