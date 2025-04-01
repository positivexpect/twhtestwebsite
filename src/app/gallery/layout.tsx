import { Metadata } from 'next';
import GalleryPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Before & After Gallery | The Window Hospital',
  description: 'View our window repair before and after gallery. See real examples of window repairs and transformations completed by The Window Hospital.',
};

export default function GalleryLayout() {
  return <GalleryPage />;
} 