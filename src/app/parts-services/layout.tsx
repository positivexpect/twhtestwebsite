import { Metadata } from 'next';
import PartsServices from './page';

export const metadata: Metadata = {
  title: 'Window Parts & Hardware Repair Services | The Window Hospital',
  description: 'Expert window parts and hardware repair services from The Window Hospital. Save money by repairing window components instead of replacing entire units.',
};

export default function PartsServicesLayout() {
  return <PartsServices />;
} 