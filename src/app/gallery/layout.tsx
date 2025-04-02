import { Metadata } from 'next';
import GalleryPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Before & After Gallery',
  description: 'See our window repair transformations. Browse before and after photos of our work.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 