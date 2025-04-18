'use client';

import { BlogPost } from '@/types/blog';
import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', params.slug)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Post not found');

        const formattedPost: BlogPost = {
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.date,
          readTime: data.read_time,
          content: data.content,
          author: data.author,
          keywords: data.keywords,
          metaTitle: data.meta_title,
          metaDescription: data.meta_description,
          canonicalUrl: data.canonical_url,
          ogImage: data.og_image,
          structuredData: data.structured_data || {},
          isDraft: data.is_draft,
          published: data.published,
          lastModified: data.last_modified
        };

        setPost(formattedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center text-red-600">
            {error || 'Post not found'}
          </div>
        </div>
      </div>
    );
  }

  return <BlogPostLayout post={post} />;
} 