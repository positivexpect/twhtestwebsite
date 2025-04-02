import { Metadata } from 'next';
import FranchisePage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Franchise Opportunities',
  description: 'Start your own window repair business. Join our growing network of successful franchise owners.',
};

export default function FranchiseLayout() {
  return <FranchisePage />;
} 