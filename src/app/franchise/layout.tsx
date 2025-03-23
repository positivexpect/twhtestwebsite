import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise Opportunities | The Window Hospital',
  description: 'Join The Window Hospital family and become part of our growing network of window repair specialists. Learn about our franchise opportunities, training, and support.',
};

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 