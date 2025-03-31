import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey
  });
  throw new Error('Missing required environment variables');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Store chunks temporarily
const chunks = new Map<string, { 
  chunks: Buffer[],
  contentType: string,
  totalSize: number,
  receivedSize: number
}>();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const chunk = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const contentType = formData.get('contentType') as string;
    const chunkIndex = parseInt(formData.get('chunkIndex') as string);
    const totalChunks = parseInt(formData.get('totalChunks') as string);
    const totalSize = parseInt(formData.get('totalSize') as string);
    
    if (!chunk || !fileName || !contentType || isNaN(chunkIndex) || isNaN(totalChunks) || isNaN(totalSize)) {
      console.error('Invalid upload data:', {
        hasChunk: !!chunk,
        fileName,
        contentType,
        chunkIndex,
        totalChunks,
        totalSize
      });
      return NextResponse.json(
        { error: 'Invalid upload data' },
        { status: 400 }
      );
    }

    // Initialize file data if not exists
    if (!chunks.has(fileName)) {
      chunks.set(fileName, {
        chunks: new Array(totalChunks),
        contentType,
        totalSize,
        receivedSize: 0
      });
    }

    const fileData = chunks.get(fileName)!;
    
    // Convert chunk to buffer and store
    const buffer = Buffer.from(await chunk.arrayBuffer());
    fileData.chunks[chunkIndex - 1] = buffer;
    fileData.receivedSize += buffer.length;

    console.log('Processing chunk upload:', {
      fileName,
      chunkIndex,
      totalChunks,
      progress: `${Math.round((fileData.receivedSize / fileData.totalSize) * 100)}%`,
      chunkSize: buffer.length
    });

    // If we haven't received all chunks yet, return progress
    if (fileData.receivedSize < fileData.totalSize) {
      return NextResponse.json({
        status: 'chunk_received',
        progress: Math.round((fileData.receivedSize / fileData.totalSize) * 100)
      });
    }

    // All chunks received, combine and upload
    console.log('All chunks received, combining...');
    
    try {
      const completeBuffer = Buffer.concat(fileData.chunks);
      chunks.delete(fileName); // Clean up stored chunks immediately

      console.log('Uploading complete file:', {
        fileName,
        totalSize: completeBuffer.length,
        bucket: 'form-uploads'
      });

      const { data, error } = await supabase
        .storage
        .from('form-uploads')
        .upload(fileName, completeBuffer, {
          contentType: fileData.contentType,
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

      // Get the public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('form-uploads')
        .getPublicUrl(data.path);

      console.log('Upload successful:', {
        path: data.path,
        url: publicUrl,
        size: completeBuffer.length
      });

      return NextResponse.json({
        path: data.path,
        url: publicUrl
      });
    } catch (error) {
      console.error('Error processing complete file:', error);
      chunks.delete(fileName); // Clean up on error
      return NextResponse.json(
        { error: 'Failed to process complete file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 