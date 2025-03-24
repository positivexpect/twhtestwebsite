'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaStar } from 'react-icons/fa';
import { SiHomeadvisor } from 'react-icons/si';
import { motion } from 'framer-motion';

// We'll create these components next
import ReviewsDashboard from '@/components/client/ReviewsDashboard';
import ReviewsList from '@/components/client/ReviewsList';
import AssessmentForm from '@/components/client/AssessmentForm';
import ReviewPopup from '@/components/client/ReviewPopup';

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [starFilter, setStarFilter] = useState(5); // Default to 5 stars
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStarFilter, setSelectedStarFilter] = useState(5); // Track the selected star filter

  const handleStarFilter = (stars: number) => {
    setSelectedStarFilter(stars); // Store the selected star filter
    if (stars < 4) {
      setIsPopupOpen(true);
    } else {
      setStarFilter(stars);
    }
  };

  const handleShowLowerReviews = () => {
    setStarFilter(selectedStarFilter); // Use the selected star filter instead of defaulting to 4
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Customer Reviews
        </h1>
        <p className="text-xl text-gray-600">
          See what our satisfied customers have to say about our window repair services
        </p>
      </div>

      {/* Overall Rating Section */}
      <div className="bg-gray-50 py-12 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-400 h-12 w-12" />
              ))}
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">4.88</h2>
            <p className="text-xl text-gray-600">Overall Rating</p>
            <p className="mt-2 text-gray-500">Based on 300+ Reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews Dashboard */}
      <div className="mb-16">
        <ReviewsDashboard />
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all'
                    ? 'bg-[#CD2028] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setActiveFilter('google')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  activeFilter === 'google'
                    ? 'bg-[#4285F4] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Google
              </button>
              <button
                onClick={() => setActiveFilter('homeadvisor')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  activeFilter === 'homeadvisor'
                    ? 'bg-[#F68D2E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SiHomeadvisor className="h-5 w-5 mr-2" />
                HomeAdvisor
              </button>
              <button
                onClick={() => setActiveFilter('thumbtack')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  activeFilter === 'thumbtack'
                    ? 'bg-[#009FD9] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.722-15.556l-7.444 7.444-3.556-3.556 1.111-1.111 2.444 2.444 6.333-6.333 1.112 1.112z" />
                </svg>
                Thumbtack
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => handleStarFilter(stars)}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    selectedStarFilter === stars // Use selectedStarFilter for visual feedback
                      ? 'bg-[#CD2028] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaStar className={`${selectedStarFilter === stars ? 'text-white' : 'text-yellow-400'}`} />
                  <span className="ml-1">{stars}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setStarFilter(0);
                  setSelectedStarFilter(0);
                }}
                className={`px-3 py-1 rounded-md ${
                  selectedStarFilter === 0
                    ? 'bg-[#CD2028] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ReviewsList filter={activeFilter} starFilter={starFilter} />
      </div>

      {/* Assessment Form */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Free Assessment
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your window issues and we'll provide a detailed assessment
            </p>
          </div>
          <AssessmentForm />
        </div>
      </div>

      {/* Review Popup */}
      <ReviewPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onShowLowerReviews={handleShowLowerReviews}
      />
    </div>
  );
} 