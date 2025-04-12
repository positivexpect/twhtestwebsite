import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase client with minimal configuration
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'blog-post-images';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface StoredImage {
  name: string;
  url: string;
  size: number;
  created: string;
}

export async function listImages(): Promise<StoredImage[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list();

    if (error) {
      console.error('Error listing images:', error);
      throw error;
    }

    if (!data) return [];

    // Get public URLs for all images
    const images = await Promise.all(
      data.map(async (file) => {
        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: publicUrl,
          size: file.metadata?.size || 0,
          created: file.created_at || new Date().toISOString()
        };
      })
    );

    // Sort by creation date, newest first
    return images.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  } catch (error) {
    console.error('Error in listImages:', error);
    return [];
  }
}

export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    // Create a unique file name with timestamp and original extension
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    console.log('Attempting to upload to bucket:', BUCKET_NAME);
    console.log('File name:', fileName);
    console.log('File size:', file.size);
    console.log('File type:', file.type);

    // Simple upload with minimal options
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
    throw new Error('Image upload failed');
  }
}

export function generateImageMarkdown(url: string, alt: string = '', title: string = ''): string {
  const titleAttr = title ? ` "${title}"` : '';
  return `![${alt}](${url}${titleAttr})`;
} 