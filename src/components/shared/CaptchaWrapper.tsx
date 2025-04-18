'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const HCaptcha = dynamic(() => import('@hcaptcha/react-hcaptcha'), {
  ssr: false,
  loading: () => (
    <div className="h-[78px] w-[300px] bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-sm text-gray-500">Loading verification...</span>
    </div>
  ),
});

interface CaptchaWrapperProps {
  onVerify: (token: string) => void;
}

export default function CaptchaWrapper({ onVerify }: CaptchaWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!captchaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(captchaRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={captchaRef}>
      {isVisible && (
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={onVerify}
          theme="light"
          size="normal"
        />
      )}
    </div>
  );
} 