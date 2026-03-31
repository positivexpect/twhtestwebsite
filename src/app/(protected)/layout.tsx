import type { ReactNode } from 'react';
import ProtectedLayoutClient from './ProtectedLayoutClient';

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}
