import { Metadata } from 'next';
import GlassServices from './page';

export const metadata: Metadata = {
  title: 'Window Glass Repair & Replacement Services',
  description: 'Expert window glass repair and replacement. Fix foggy glass, cracks, and seal failures.',
};

export default function GlassServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 