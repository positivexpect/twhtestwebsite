import { Metadata } from 'next';
import CampaignsPage from './page';

export const metadata: Metadata = {
  title: 'Special Offers & Promotions | The Window Hospital',
  description: 'Take advantage of special offers and promotions from The Window Hospital. Save money on window repairs with our current deals and contests.',
};

export default function CampaignsLayout() {
  return <CampaignsPage />;
} 