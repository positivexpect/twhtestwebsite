import { Metadata } from 'next';
import ScreenServices from './page';

export const metadata: Metadata = {
  title: 'Window Screen Repair & Replacement | The Window Hospital',
  description: 'Professional window screen repair and replacement services from The Window Hospital. Fix damaged screens and keep bugs out of your home.',
};

export default function ScreenServicesLayout() {
  return <ScreenServices />;
} 