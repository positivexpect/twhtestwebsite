import { Metadata } from 'next';
import VideoTestimonialPage from './page';

export const metadata: Metadata = {
  title: 'Share Your Window Repair Story | The Window Hospital',
  description: 'Share your window repair experience and get a free part. Join our customer testimonial program.',
};

export default function VideoTestimonialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 