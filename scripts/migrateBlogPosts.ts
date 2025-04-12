import { createClient } from '@supabase/supabase-js';
import { BLOG_POSTS } from '../src/data/blogPosts';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateBlogPosts() {
  console.log('Starting blog post migration...');

  for (const post of BLOG_POSTS) {
    try {
      const postToSave = {
        id: post.id,
        title: post.title,
        description: post.description,
        date: post.date,
        read_time: post.readTime,
        content: post.content,
        author: post.author,
        keywords: post.keywords,
        meta_title: post.metaTitle,
        meta_description: post.metaDescription,
        canonical_url: post.canonicalUrl,
        og_image: post.ogImage,
        structured_data: post.structuredData,
        is_draft: post.isDraft || false,
        published: true,
        last_modified: new Date().toISOString()
      };

      const { error } = await supabase
        .from('blog_posts')
        .upsert([postToSave], { onConflict: 'id' });

      if (error) {
        console.error(`Error migrating post ${post.id}:`, error);
      } else {
        console.log(`Successfully migrated post: ${post.id}`);
      }
    } catch (err) {
      console.error(`Error processing post ${post.id}:`, err);
    }
  }

  console.log('Blog post migration complete!');
}

migrateBlogPosts(); 