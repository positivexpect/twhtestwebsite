'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';

interface CaptchaWrapperProps {
  onVerify: (token: string | null) => void;
}

export default function CaptchaWrapper({ onVerify }: CaptchaWrapperProps) {
  return (
    <div 
      className="flex justify-center my-4 touch-none" 
      style={{ touchAction: 'none' }}
    >
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
        onVerify={(token) => onVerify(token)}
        onExpire={() => onVerify(null)}
        onError={() => onVerify(null)}
        theme="light"
        size="normal"
      />
    </div>
  );
} 