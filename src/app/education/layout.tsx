import { Metadata } from 'next';
import EducationPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Education Center | Expert Tips & Guides | The Window Hospital',
  description: 'Learn about window repair, maintenance, and cost-saving tips from The Window Hospital\'s education center. Expert guides and resources for homeowners.',
};

export default function EducationLayout() {
  return <EducationPage />;
} 