import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About The Window Hospital | Expert Window Repair Since 2019',
  description: 'Discover how we help homeowners save 50-80% through expert window repair services. Family-owned business serving Fredericksburg since 2019.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 