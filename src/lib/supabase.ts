import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPostRow = {
  id: string;
  title: string;
  description: string;
  date: string;
  read_time: string;
  content: string;
  author: string;
  keywords: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  structured_data?: Record<string, any>;
  is_draft?: boolean;
  published: boolean;
  last_modified?: string;
  created_at?: string;
}; 