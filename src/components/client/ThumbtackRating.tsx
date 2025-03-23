'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ThumbtackRating() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Thumbtack widget script
    const script = document.createElement('script');
    script.src = 'https://www.thumbtack.com/profile/widgets/scripts/?service_pk=211393566261601435&widget_id=review&type=star';
    script.async = true;
    
    // Add script only if it hasn't been added yet
    if (widgetRef.current && !document.querySelector('script[src*="thumbtack.com/profile/widgets"]')) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      script.remove();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 mb-3">
          <Image
            src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg"
            alt="Thumbtack"
            className="tt-logo"
            width={120}
            height={24}
          />
          <span className="text-lg font-medium text-gray-700">Rating</span>
        </div>
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
              alt="star"
              width={20}
              height={20}
            />
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">5.0</p>
          <p className="text-sm text-gray-600">123 reviews</p>
        </div>
      </div>
    </div>
  );
} 