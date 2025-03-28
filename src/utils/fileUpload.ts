import { supabase } from './supabase';

export async function uploadFile(
  file: File,
  bucket: 'video-testimonials' | 'ugly-windows'
): Promise<{ filePath: string; error: Error | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload with chunking for large files
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    return { filePath, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { 
      filePath: '', 
      error: error instanceof Error ? error : new Error('Failed to upload file') 
    };
  }
}

export function getFileUrl(bucket: string, filePath: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
} 