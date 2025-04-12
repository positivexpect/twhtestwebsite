'use client';

import { BlogPost } from '@/types/blog';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Script from 'next/script';
import rehypeRaw from 'rehype-raw';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface BlogPostLayoutProps {
  post: BlogPost;
}

function stripMetadataSection(content: string): string {
  // First clean up the metadata sections
  const withoutMetadata = content
    .replace(/---METADATA---[\s\S]*?(Page Title:|Meta Description:|Schema Markup:)[\s\S]*?(\n\n|$)/g, '')
    .replace(/Page Title:[\s\S]*?Schema Markup:[\s\S]*?}(\n|$)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Then clean up table formatting
  const cleanContent = withoutMetadata
    // Remove extra table formatting characters
    .replace(/\|\s*\|/g, '|')
    // Remove extra dashes in table headers
    .replace(/\|-+\|/g, '|')
    // Ensure proper table header formatting
    .replace(/\|[\s-]*\n/g, '|\n')
    // Clean up any remaining multiple pipes
    .replace(/\|{2,}/g, '|')
    .trim();

  return cleanContent;
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
  const { isDarkMode } = useDarkMode();
  const cleanContent = stripMetadataSection(post.content);

  return (
    <>
      {post.structuredData && (
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(post.structuredData)}
        </Script>
      )}
      
      <article className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <header className="mb-8">
          <nav className="mb-8">
            <Link 
              href="/blog"
              className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-[#CD2028] hover:text-[#B01B22]'}`}
            >
              ← Back to Blog
            </Link>
          </nav>
          
          <h1 className={`text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {post.title}
          </h1>
          
          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
        </header>

        <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h2 className={`text-3xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3 className={`text-2xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className={`text-xl font-bold mt-4 mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {children}
                </h4>
              ),
              a: ({ href, children }) => (
                <Link 
                  href={href || '#'} 
                  className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-[#CD2028] hover:text-[#B01B22]'} underline`}
                >
                  {children}
                </Link>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className={`min-w-full border divide-y ${
                    isDarkMode 
                      ? 'border-gray-700 divide-gray-700 bg-gray-800' 
                      : 'border-gray-200 divide-gray-200 bg-white'
                  }`}>
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className={`divide-y ${
                  isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className={`${
                  isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-50'
                } transition-colors`}>
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r last:border-r-0 ${
                  isDarkMode 
                    ? 'text-gray-400 border-gray-700 bg-gray-800' 
                    : 'text-gray-500 border-gray-200 bg-gray-50'
                }`}>
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className={`px-6 py-4 text-sm border-r last:border-r-0 align-top ${
                  isDarkMode 
                    ? 'text-gray-300 border-gray-700' 
                    : 'text-gray-900 border-gray-200'
                }`}>
                  {children}
                </td>
              ),
              details: ({ children }) => (
                <details className="my-6 border rounded-lg overflow-hidden shadow-sm">
                  {children}
                </details>
              ),
              summary: ({ children }) => (
                <summary className="px-6 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-[#CD2028]">
                  {children}
                </summary>
              ),
              p: ({ children }) => (
                <p className={`my-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {children}
                </p>
              ),
              div: ({ children }) => (
                <div className="my-6">
                  {children}
                </div>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">
                  {children}
                </strong>
              ),
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </div>

        <div className={`mt-12 border-t pt-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Link 
            href="/contact"
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
              isDarkMode 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-[#CD2028] hover:bg-[#B01B22]'
            }`}
          >
            Schedule a Repair Consultation
          </Link>
        </div>
      </article>
    </>
  );
} 