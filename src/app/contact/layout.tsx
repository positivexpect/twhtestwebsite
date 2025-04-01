import { Metadata } from 'next';
import ContactPage from './page';

export const metadata: Metadata = {
  title: 'Contact The Window Hospital | Free Window Assessment in Fredericksburg, VA',
  description: 'Get your free window assessment from The Window Hospital. Expert window repair services in Fredericksburg, VA. Save 50-80% on window repairs vs replacement.',
};

export default function ContactLayout() {
  return <ContactPage />;
} 