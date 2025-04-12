'use client';

import { BlogPost } from '@/types/blog';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BlogEditor from '../../components/BlogEditor';

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleSave = async (updatedPost: BlogPost) => {
    try {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
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
        })
        .eq('id', updatedPost.id);

      if (updateError) throw updateError;

      router.refresh();
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  };

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

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <BlogEditor 
          post={post} 
          onSave={handleSave}
          onChange={(updatedPost) => setPost(typeof updatedPost === 'function' ? updatedPost(post) : updatedPost)}
          onPreview={() => setShowPreview(!showPreview)}
        />
      </div>
    </div>
  );
} 