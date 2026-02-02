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

export interface CaptchaWrapperHandle {
  reset: () => void;
}

const CaptchaWrapperComponent = ({ onVerify }: CaptchaWrapperProps, ref: React.Ref<CaptchaWrapperHandle>) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const captchaRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }
    }
  }));

  return (
    <div ref={containerRef}>
      {isVisible && (
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={onVerify}
          theme="light"
          size="normal"
        />
      )}
    </div>
  );
};

export default React.forwardRef(CaptchaWrapperComponent);
