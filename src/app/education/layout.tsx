import { Metadata } from 'next';
import EducationPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Education & Tips | The Window Hospital',
  description: 'Learn about window repair with expert tips and guides from The Window Hospital.',
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 