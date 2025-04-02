import { Metadata } from 'next';
import EducationPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Education & Tips',
  description: 'Learn about window repair with expert tips and guides. Save money with DIY maintenance advice.',
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 