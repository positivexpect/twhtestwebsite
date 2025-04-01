import { Metadata } from 'next';
import AnonymousTipPage from './page';

export const metadata: Metadata = {
  title: 'Submit Anonymous Window Repair Tips | The Window Hospital',
  description: 'Help your community by anonymously referring someone in need of window repair services.',
};

export default function AnonymousTipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 