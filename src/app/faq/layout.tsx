import { Metadata } from 'next';
import FAQPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair FAQ: Common Questions & Answers',
  description: 'Find answers to frequently asked questions about window repair, costs, and services.',
};

export default function FAQLayout() {
  return <FAQPage />;
} 