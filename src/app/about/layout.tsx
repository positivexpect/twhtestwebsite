import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About Us: Expert Window Repair Since 2019',
  description: 'Family-owned window repair experts helping homeowners save 50-80% on repairs in Fredericksburg.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 