import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About Us: Expert Window Repair Since 2019',
  description: 'Family-owned window repair experts in Fredericksburg. Save up to 80% vs replacement.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 