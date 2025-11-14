'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
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
  onVerify?: (token: string) => void;
}

const CaptchaWrapper = forwardRef<any, CaptchaWrapperProps>(
  ({ onVerify }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hcaptchaRef = useRef<any>(null);

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

    // Expose hcaptcha ref methods through the forwarded ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(hcaptchaRef.current);
        } else {
          ref.current = hcaptchaRef.current;
        }
      }
    }, [ref]);

    return (
      <div ref={containerRef}>
        {isVisible && (
          <HCaptcha
            ref={hcaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
            onVerify={onVerify}
            theme="light"
            size="normal"
          />
        )}
      </div>
    );
  }
);

CaptchaWrapper.displayName = 'CaptchaWrapper';

export default CaptchaWrapper;
