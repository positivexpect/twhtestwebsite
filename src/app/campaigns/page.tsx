'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import VideoTestimonialForm from '@/components/campaigns/VideoTestimonialForm';
import UglyWindowForm from '@/components/campaigns/UglyWindowForm';
import AnonymousTipForm from '@/components/campaigns/AnonymousTipForm';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Window Hospital Community Initiatives
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community programs and make a difference
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'video'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Video Testimonials
          </button>
          <button
            onClick={() => setActiveTab('ugly')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'ugly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Ugly Window Contest
          </button>
          <button
            onClick={() => setActiveTab('tip')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'tip'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Anonymous Tip Center
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'video' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Video Testimonials</h2>
              <p className="text-gray-600 mb-6">
                Share your story about how Window Hospital helped you avoid unnecessary window replacement.
                Get a free part in exchange for your video testimonial!
              </p>
              <VideoTestimonialForm />
            </div>
          )}

          {activeTab === 'ugly' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ugly Window Contest</h2>
              <p className="text-gray-600 mb-6">
                Submit a photo of your ugliest window for a chance to win free glass!
                We'll select a winner once we reach 100 submissions.
              </p>
              <UglyWindowForm />
            </div>
          )}

          {activeTab === 'tip' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Anonymous Tip Center</h2>
              <p className="text-gray-600 mb-6">
                Know someone in need? Submit an anonymous tip about someone who could benefit
                from our free repair services.
              </p>
              <AnonymousTipForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 