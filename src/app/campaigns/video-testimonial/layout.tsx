import { Metadata } from 'next';
import VideoTestimonialPage from './page';

export const metadata: Metadata = {
  title: 'Video Testimonial Campaign | Share Your Window Repair Experience | The Window Hospital',
  description: 'Share your window repair experience through a video testimonial. Get a free part in exchange for your story with The Window Hospital.',
};

export default function VideoTestimonialLayout() {
  return <VideoTestimonialPage />;
} 