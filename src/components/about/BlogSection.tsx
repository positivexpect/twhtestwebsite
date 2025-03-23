import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogPosts';

// Get the first 3 blog posts for the featured section
const featuredPosts = BLOG_POSTS.slice(0, 3);

export default function BlogSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Education Center</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Stay informed with our latest articles about window repair, maintenance tips, 
            and industry insights. We're committed to helping you make educated decisions 
            about your windows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-[#CD2028] hover:text-[#B01B22] font-medium inline-flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-[#CD2028] hover:bg-[#B01B22] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
} 