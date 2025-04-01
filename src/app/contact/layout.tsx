import { Metadata } from 'next';
import ContactPage from './page';

export const metadata: Metadata = {
  title: 'Contact Us | Free Window Assessment | The Window Hospital',
  description: 'Get a free window assessment from our expert team. Schedule your consultation today.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 