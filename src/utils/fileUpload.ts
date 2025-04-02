import { supabase } from './supabase';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks for better reliability

async function* createChunks(file: File) {
  let offset = 0;
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + CHUNK_SIZE);
    offset += chunk.size;
    yield chunk;
  }
}

export async function uploadFile(
  file: File,
  bucket: 'form-uploads',
  onProgress?: (progress: number) => void
): Promise<{ filePath: string; error: Error | null }> {
  try {
    // Validate file size
    if (file.size === 0) {
      throw new Error('File is empty');
    }

    if (file.size > 1024 * 1024 * 1024) { // 1GB
      throw new Error('File size exceeds 1GB limit');
    }

    console.log('Attempting to upload file:', {
      name: file.name,
      type: file.type,
      size: file.size,
      bucket: bucket
    });

    const fileName = `${Date.now()}-${file.name}`;
    let uploadedChunks = 0;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let lastError: Error | null = null;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    for await (const chunk of createChunks(file)) {
      uploadedChunks++;
      let chunkUploaded = false;
      
      while (!chunkUploaded && retryCount < MAX_RETRIES) {
        try {
          console.log(`Uploading chunk ${uploadedChunks}/${totalChunks} (${Math.round(chunk.size / 1024 / 1024)}MB)`);

          const formData = new FormData();
          formData.append('file', chunk);
          formData.append('fileName', fileName);
          formData.append('contentType', file.type);
          formData.append('chunkIndex', uploadedChunks.toString());
          formData.append('totalChunks', totalChunks.toString());
          formData.append('totalSize', file.size.toString());

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Upload failed');
          }

          // Update progress
          if (data.progress && onProgress) {
            onProgress(data.progress);
          }

          chunkUploaded = true;
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          retryCount++;
          if (retryCount < MAX_RETRIES) {
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
            console.log(`Retrying chunk upload (attempt ${retryCount + 1}/${MAX_RETRIES})`);
          }
        }
      }

      if (!chunkUploaded) {
        throw new Error(`Failed to upload chunk ${uploadedChunks} after ${MAX_RETRIES} attempts: ${lastError?.message || 'Unknown error'}`);
      }
    }

    return { filePath: fileName, error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { filePath: '', error: error instanceof Error ? error : new Error('Unknown upload error') };
  }
}

export function getFileUrl(bucket: string, filePath: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
} 