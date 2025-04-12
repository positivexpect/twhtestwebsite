'use client';

import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode();

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
      <div className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'bg-gray-900 min-h-screen' : 'bg-white'}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center pt-16">
          <h1 className={`text-4xl font-extrabold sm:text-5xl md:text-6xl tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            The Window Hospital Blog
          </h1>
          <p className={`mt-4 text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Expert advice on window repair, maintenance, and cost savings
          </p>
        </div>

        <div className="grid gap-6 mt-12 px-4 sm:px-6 lg:px-8 pb-16">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No published posts yet.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="block group"
              >
                <div className={`rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}>
                  <h2 className={`text-xl font-semibold group-hover:text-[#CD2028] ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h2>
                  <p className={`mt-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.description}
                  </p>
                  <div className={`mt-4 flex items-center text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
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