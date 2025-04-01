import { Metadata } from 'next';
import PrivacyPolicy from './page';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection | The Window Hospital',
  description: 'Learn about how The Window Hospital protects your privacy and handles your personal information. Our commitment to data security and customer privacy.',
};

export default function PrivacyPolicyLayout() {
  return <PrivacyPolicy />;
} 