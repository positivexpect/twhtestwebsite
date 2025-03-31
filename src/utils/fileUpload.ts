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
    console.log('Attempting to upload file:', {
      name: file.name,
      type: file.type,
      size: file.size,
      bucket: bucket
    });

    const fileName = `${Date.now()}-${file.name}`;
    let uploadedChunks = 0;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for await (const chunk of createChunks(file)) {
      uploadedChunks++;
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
        console.error('Upload error:', data);
        throw new Error(data.error || 'Upload failed');
      }

      // Update progress
      if (data.progress && onProgress) {
        onProgress(data.progress);
      }

      // If this is the last chunk, verify the upload
      if (uploadedChunks === totalChunks) {
        console.log('Final chunk uploaded, verifying file...');
        
        // Verify the file exists in the bucket
        const { data: files } = await supabase
          .storage
          .from(bucket)
          .list();
        
        const uploadedFile = files?.find(f => f.name === fileName);
        if (!uploadedFile) {
          throw new Error('File not found in bucket after upload');
        }

        console.log('Upload successful:', {
          path: data.path,
          url: data.url,
          size: uploadedFile.metadata?.size
        });

        return { filePath: data.path, error: null };
      }
    }

    throw new Error('Upload incomplete');
  } catch (error) {
    console.error('Upload error:', error);
    return { filePath: '', error: error as Error };
  }
}

export function getFileUrl(bucket: string, filePath: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
} 