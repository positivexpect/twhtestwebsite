import { Metadata } from 'next';
import PrivacyPolicy from './page';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection',
  description: 'Our commitment to protecting your privacy and personal information.',
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 