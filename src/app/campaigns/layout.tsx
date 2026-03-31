import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Window Repair Offers & Programs',
  description: 'Discover our window repair promotions, community initiatives, and special programs to save on your repairs.',
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
