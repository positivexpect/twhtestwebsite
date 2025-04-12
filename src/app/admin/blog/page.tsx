'use client';

import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });

        if (supabaseError) throw supabaseError;

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
          structuredData: post.structured_data,
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
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22]"
          >
            New Post
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {posts.map((post) => (
                <li key={post.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-lg font-medium text-[#CD2028] truncate hover:underline"
                        >
                          {post.title || 'Untitled Post'}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">
                          {post.date} • {post.readTime} • {post.isDraft ? 'Draft' : 'Published'}
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-[#CD2028] hover:text-[#B01B22]"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/blog/${post.id}`}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 