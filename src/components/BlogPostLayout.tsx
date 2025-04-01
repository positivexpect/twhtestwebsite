import { BlogPost } from '@/types/blog';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Script from 'next/script';

interface BlogPostLayoutProps {
  post: BlogPost;
}

export function generateMetadata(post: BlogPost): Metadata {
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
    },
    alternates: {
      canonical: post.canonicalUrl,
    },
  };
}

export default function BlogPostLayout({ post }: BlogPostLayoutProps) {
  return (
    <>
      {post.structuredData && (
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(post.structuredData)}
        </Script>
      )}
      
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-8">
          <nav className="mb-8">
            <Link 
              href="/blog"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Blog
            </Link>
          </nav>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
              h2: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
              h3: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Schedule a Repair Consultation
          </Link>
        </div>
      </article>
    </>
  );
} 