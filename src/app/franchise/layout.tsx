import { Metadata } from 'next';
import FranchisePage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Franchise Opportunities | Join The Window Hospital',
  description: 'Start your own window repair business with The Window Hospital franchise. Join our network of successful professionals.',
};

export default function FranchiseLayout() {
  return <FranchisePage />;
} 