'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown === 'true') {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only show if mouse moves above the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleDismiss = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Don't Fall Prey to High Replacement Costs
        </h3>
        
        <p className="text-gray-600 mb-6">
          Get a free repair quote now and save up to 95% compared to window replacement.
          Most windows can be repaired, not replaced!
        </p>

        <div className="space-y-3">
          <Link
            href="/contact"
            onClick={handleDismiss}
            className="block w-full text-center bg-[#CD2028] hover:bg-[#B01B22] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Get Your Free Quote Now
          </Link>
          
          <button
            onClick={handleDismiss}
            className="block w-full text-center text-gray-600 hover:text-gray-900 font-medium py-2"
          >
            No thanks, I'll take my chances
          </button>
        </div>
      </div>
    </div>
  );
} 