'use client';

import { DarkModeProvider } from '@/contexts/DarkModeContext';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DarkModeProvider>
      <div className="relative">
        <div className="fixed top-4 right-4 z-50">
          <DarkModeToggle />
        </div>
        {children}
      </div>
    </DarkModeProvider>
  );
} 