import { Metadata } from 'next';
import ScreenServices from './page';

export const metadata: Metadata = {
  title: 'Window Screen Repair & Replacement Services',
  description: 'Professional window screen repair and replacement services. Fast and affordable solutions.',
};

export default function ScreenServicesLayout() {
  return <ScreenServices />;
} 