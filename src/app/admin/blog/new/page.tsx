'use client';

import { BlogPost } from '@/types/blog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BlogEditor from '../components/BlogEditor';

export default function NewBlogPost() {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    description: '',
    content: '',
    author: '',
    date: new Date().toISOString(),
    readTime: '5 min read',
    keywords: [],
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogImage: '',
    structuredData: {},
    isDraft: true,
    published: false,
    lastModified: new Date().toISOString()
  });
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (updatedPost: BlogPost) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Generate a unique ID for the new post
      const id = crypto.randomUUID();
      updatedPost.id = id;

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          id: updatedPost.id,
          title: updatedPost.title,
          description: updatedPost.description,
          content: updatedPost.content,
          author: updatedPost.author,
          date: updatedPost.date,
          read_time: updatedPost.readTime,
          keywords: updatedPost.keywords,
          meta_title: updatedPost.metaTitle,
          meta_description: updatedPost.metaDescription,
          canonical_url: updatedPost.canonicalUrl,
          og_image: updatedPost.ogImage,
          structured_data: updatedPost.structuredData,
          is_draft: updatedPost.isDraft,
          published: updatedPost.published,
          last_modified: new Date().toISOString()
        });

      if (insertError) throw insertError;

      router.push('/admin/blog');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <BlogEditor
            post={post}
            onChange={setPost}
            onPreview={() => setShowPreview(!showPreview)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
} 