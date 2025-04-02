import { Metadata } from 'next';
import CampaignsPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair Offers & Programs | The Window Hospital',
  description: 'Discover our window repair promotions, community initiatives, and special programs to save on your repairs.',
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 