'use client';

import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('date', { ascending: false });

        if (fetchError) throw fetchError;

        // Convert from database format to BlogPost format
        const formattedPosts: BlogPost[] = data.map(post => ({
          id: post.id,
          title: post.title,
          description: post.description,
          date: post.date,
          readTime: post.read_time,
          content: post.content,
          author: post.author,
          keywords: post.keywords,
          metaTitle: post.meta_title,
          metaDescription: post.meta_description,
          canonicalUrl: post.canonical_url,
          ogImage: post.og_image,
          structuredData: post.structured_data || {},
          isDraft: post.is_draft,
          published: post.published,
          lastModified: post.last_modified
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center pt-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
            The Window Hospital Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert advice on window repair, maintenance, and cost savings
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-16">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No published posts yet.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#CD2028]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-gray-600">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 