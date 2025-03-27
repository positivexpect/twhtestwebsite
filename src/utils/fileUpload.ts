import { supabase } from './supabase';

export async function uploadFile(
  file: File,
  bucket: 'video-testimonials' | 'ugly-windows'
): Promise<{ filePath: string; error: Error | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return { filePath, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { filePath: '', error: error as Error };
  }
}

export function getFileUrl(bucket: string, filePath: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
} 