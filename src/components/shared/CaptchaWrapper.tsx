'use client';

import { ReactNode } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface CaptchaWrapperProps {
  onVerify: (token: string | null) => void;
  children?: ReactNode;
}

export default function CaptchaWrapper({ onVerify, children }: CaptchaWrapperProps) {
  return (
    <div className="space-y-4">
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={onVerify}
        onExpire={() => onVerify(null)}
      />
      {children}
    </div>
  );
} 