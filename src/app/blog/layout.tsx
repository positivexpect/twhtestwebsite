import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Repair Guides & Expert Tips: Save Money on Window Repairs | TWH',
  description: 'Explore our collection of window repair guides, maintenance tips, and expert advice to help maintain your windows.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 