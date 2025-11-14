'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatBot = dynamic(() => import('@/components/client/ChatBot'), {
  ssr: false,
});

export default function ChatBotWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check initial size
    setIsDesktop(window.innerWidth >= 1024);

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) return null;

  return <ChatBot />;
}
