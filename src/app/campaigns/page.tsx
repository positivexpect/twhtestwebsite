'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            Special Offers & Community Programs at The Window Hospital
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community programs and make a difference
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
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

        {/* Direct Links - Hidden but functional */}
        <Link href="/campaigns/video-testimonial" className="hidden" />
        <Link href="/campaigns/ugly-window" className="hidden" />
        <Link href="/campaigns/anonymous-tip" className="hidden" />

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'video' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Video Testimonials</h2>
                  <p className="text-gray-600">
                    Share your story about how Window Hospital helped you avoid unnecessary window replacement.
                    Get a free part in exchange for your video testimonial!
                  </p>
                </div>
                <div className="relative w-64 h-48 ml-6">
                  <Image
                    src="/images/campaigns/pastelhappy.jpg"
                    alt="Happy customer with repaired window"
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <VideoTestimonialForm />
            </div>
          )}

          {activeTab === 'ugly' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Ugly Window Contest</h2>
                  <p className="text-gray-600">
                    Submit a photo of your ugliest window for a chance to win free glass!
                    We'll select a winner once we reach 100 submissions.
                  </p>
                </div>
                <div className="relative w-64 h-48 ml-6">
                  <Image
                    src="/images/campaigns/uglywindow.jpg"
                    alt="Example of a foggy window needing repair"
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <UglyWindowForm />
            </div>
          )}

          {activeTab === 'tip' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Anonymous Tip Center</h2>
                  <p className="text-gray-600">
                    Know someone in need? Submit an anonymous tip about someone who could benefit
                    from our free repair services.
                  </p>
                </div>
                <div className="relative w-64 h-48 ml-6">
                  <Image
                    src="/images/campaigns/helpneeded.jpg"
                    alt="Help needed sign in window"
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <AnonymousTipForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 