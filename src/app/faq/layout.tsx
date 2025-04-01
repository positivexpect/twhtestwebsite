import { Metadata } from 'next';
import FAQPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair FAQ | Common Questions & Answers | The Window Hospital',
  description: 'Find answers to frequently asked questions about window repair, costs, and services from The Window Hospital. Expert guidance for all your window repair needs.',
};

export default function FAQLayout() {
  return <FAQPage />;
} 