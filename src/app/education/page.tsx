'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function EducationPage() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('date', { ascending: false })
          .limit(3);

        if (error) throw error;

        const formattedPosts = data.map(post => ({
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

        setRecentPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching recent posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Window Education Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Learn about window repair vs replacement, cost comparisons, and maintenance tips
        </p>
      </div>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">See Our Process in Action</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/E0SNpWYY5Gw"
                title="Our Manufacturing Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Manufacturing Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch how we manufacture custom dual-pane glass units in our facility, ensuring perfect fits and superior quality.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LK4RVyhkfwk"
                title="Window Repair in Action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Window Repair in Action</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch a quick demonstration of our window repair process and see how we can fix your windows without replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Common Misconceptions</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Myth: All foggy windows need replacement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Most foggy windows can be repaired by restoring the seal or replacing just the glass unit, saving you thousands.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Myth: Old windows can't be fixed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Many older windows were built with higher quality materials and can be restored to like-new condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {loading ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">Loading latest articles...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#CD2028] hover:text-[#B01B22] font-semibold inline-flex items-center group"
                    >
                      Read More
                      <svg 
                        className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">No articles available.</p>
            </div>
          )}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-lg font-semibold text-[#CD2028] hover:text-[#B01B22] group"
          >
            View All Articles
            <svg 
              className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Save on Your Window Repairs?</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Now that you understand the benefits of window repair, let our experts assess your windows and provide a customized solution.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          Get Your Free Assessment
        </Link>
      </section>
    </div>
  );
}
