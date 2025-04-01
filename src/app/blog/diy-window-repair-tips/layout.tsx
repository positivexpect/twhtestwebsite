import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIY Window Repair Guide: Fix Common Issues at Home | The Window Hospital',
  description: 'Learn how to fix minor window issues with our expert DIY repair guide. Step-by-step instructions for common problems.',
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 