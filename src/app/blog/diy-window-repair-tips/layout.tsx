import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIY Window Repair Guide: Easy Fixes for Homeowners & Money-Saving Tips',
  description: 'Learn how to fix minor window issues with our expert DIY repair guide. Step-by-step instructions for common problems.',
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 