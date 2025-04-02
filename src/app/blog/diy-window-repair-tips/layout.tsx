import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIY Window Repair Guide: Fix Common Problems & Save Money',
  description: 'Learn how to fix minor window issues with our expert DIY repair guide. Step-by-step instructions for common problems.',
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 