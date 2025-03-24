'use client';

import React from 'react';
import { FaGoogle, FaToolbox, FaThumbsUp } from 'react-icons/fa';
import GoogleRating from './GoogleRating';
import ThumbtackRating from './ThumbtackRating';

export default function ReviewsDashboard() {
  const homeAdvisorStats = {
    rating: 4.93,
    reviews: 106,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Google Reviews */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="flex justify-center mb-4 text-[#4285F4]">
          <FaGoogle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Google
        </h3>
        <GoogleRating placeId="ChIJOdzghZ3xtokRrt9-myMgPOM" />
      </div>

      {/* HomeAdvisor Reviews */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="flex justify-center mb-4 text-[#F7A01D]">
          <FaToolbox className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          HomeAdvisor
        </h3>
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <FaToolbox className="w-6 h-6 text-[#F7A01D]" />
            <span className="text-lg font-medium text-gray-700">HomeAdvisor Rating</span>
          </div>
          <div className="flex items-center justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(homeAdvisorStats.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{homeAdvisorStats.rating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Based on {homeAdvisorStats.reviews} reviews</p>
          </div>
        </div>
      </div>

      {/* Thumbtack Reviews */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
        <div className="flex justify-center mb-4 text-[#4B4FA7]">
          <FaThumbsUp className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Thumbtack
        </h3>
        <ThumbtackRating />
      </div>
    </div>
  );
} 