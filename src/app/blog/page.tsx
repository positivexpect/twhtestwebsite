import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Window Repair Blog | The Window Hospital',
  description: 'Expert advice on window repair, maintenance, and cost savings from The Window Hospital. Learn why repair beats replacement.',
  keywords: ['window repair', 'window maintenance', 'cost savings', 'home improvement'],
  openGraph: {
    title: 'Window Repair Blog | The Window Hospital',
    description: 'Expert advice on window repair, maintenance, and cost savings from The Window Hospital.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            The Window Hospital Blog
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Expert advice on window repair, maintenance, and cost savings
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="mt-3 text-gray-500">
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
          ))}
        </div>
      </div>
    </div>
  );
} 