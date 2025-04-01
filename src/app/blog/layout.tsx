import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Repair Tips, Guides & Expert Advice | The Window Hospital',
  description: 'Explore our collection of window repair guides, maintenance tips, and expert advice to help maintain your windows.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 