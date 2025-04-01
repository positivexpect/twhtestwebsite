import { Metadata } from 'next';
import GlassServices from './page';

export const metadata: Metadata = {
  title: 'Window Glass Repair & Replacement Services | The Window Hospital',
  description: 'Professional window glass repair and replacement services from The Window Hospital. Fix foggy glass, broken seals, and more. Save 50-80% vs replacement.',
};

export default function GlassServicesLayout() {
  return <GlassServices />;
} 