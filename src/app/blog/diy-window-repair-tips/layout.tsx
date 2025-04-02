import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIY Window Repair: Step-by-Step Guide to Fix Common Problems',
  description: 'Learn how to fix minor window issues with our expert DIY repair guide. Step-by-step instructions for common problems.',
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 