import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogPosts';
import BlogPostLayout from '@/components/BlogPostLayout';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);
  if (!post) return {};
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
  };
}

export default function BlogPost({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostLayout post={post} />;
} 