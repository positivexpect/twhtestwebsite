import { Metadata } from 'next';
import PartsServices from './page';

export const metadata: Metadata = {
  title: 'Window Parts & Hardware Repair Services',
  description: 'Expert window hardware and parts repair services. Save money with our repair solutions.',
};

export default function PartsServicesLayout() {
  return <PartsServices />;
} 