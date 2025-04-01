import { Metadata } from 'next';
import UglyWindowPage from './page';

export const metadata: Metadata = {
  title: 'Ugly Window Contest | Win Free Glass Repair | The Window Hospital',
  description: 'Enter our Ugly Window Contest for a chance to win free glass repair. Submit a photo of your ugliest window and help others learn about repair options.',
};

export default function UglyWindowLayout() {
  return <UglyWindowPage />;
} 