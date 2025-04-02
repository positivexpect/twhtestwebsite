import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Repair Market Surges to Record High',
  description: 'Read about the growing trend of window repairs in the home improvement market.',
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 