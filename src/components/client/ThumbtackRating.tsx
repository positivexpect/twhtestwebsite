'use client';

import React from 'react';
import Image from 'next/image';

export default function ThumbtackRating() {
  const thumbtackStats = {
    rating: 4.83,
    reviews: 139
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-3">
        <div className="relative w-[120px] h-[24px]">
          <Image
            src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg"
            alt="Thumbtack"
            className="tt-logo"
            fill
            style={{ objectFit: 'contain' }}
            sizes="120px"
          />
        </div>
        <span className="text-lg font-medium text-gray-700">Rating</span>
      </div>
      
      <div className="flex items-center justify-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative w-5 h-5">
            <Image
              src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
              alt="star"
              fill
              style={{ objectFit: 'contain' }}
              sizes="20px"
            />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900">{thumbtackStats.rating.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Based on {thumbtackStats.reviews} reviews</p>
      </div>
    </div>
  );
} 