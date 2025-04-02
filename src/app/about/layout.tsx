import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About The Window Hospital | Trusted Window Repair Experts Since 2019',
  description: 'Family-owned window repair experts helping Fredericksburg homeowners save 50-80% on repairs since 2019.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 