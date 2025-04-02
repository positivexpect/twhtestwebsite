import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About Us: Expert Window Repair Since 2019',
  description: 'Fredericksburg\'s family-owned window repair experts. Save 50-80% on professional repairs.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 