import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About Us | The Window Hospital',
  description: 'Learn about The Window Hospital\'s mission to provide expert window repair services. Save money by repairing instead of replacing windows.',
};

export default function AboutLayout() {
  return <AboutPage />;
} 