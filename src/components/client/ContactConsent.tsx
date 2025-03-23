import React from 'react';
import Image from 'next/image';

export default function ContactConsent() {
  return (
    <div>
      <div className="relative aspect-[3/2] mb-2 overflow-hidden rounded-md">
        <Image
          src="/images/bad pic.png"
          alt="Close-up of window damage"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-red-600">Close-up shots make it difficult to determine the window size and overall context</p>
      <div className="border border-green-200 rounded-md p-3 bg-green-50">
        <p className="text-sm text-green-600 font-medium mb-2">✓ Perfect photo example:</p>
        <div className="relative aspect-[3/2] mb-2 overflow-hidden rounded-md">
          <Image
            src="/images/good pic.png"
            alt="Full view of damaged window"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
} 