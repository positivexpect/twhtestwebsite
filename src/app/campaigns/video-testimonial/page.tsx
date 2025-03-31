'use client';

import VideoTestimonialForm from '@/components/campaigns/VideoTestimonialForm';
import Image from 'next/image';

export default function VideoTestimonialPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Testimonial Program
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Share your story about how Window Hospital helped you avoid unnecessary window replacement.
            Get a free part in exchange for your video testimonial!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 pr-6">
              <p className="text-gray-600">
                Your experience matters! Share your Window Hospital success story through a video testimonial
                and receive a free window part as our way of saying thank you.
              </p>
            </div>
            <div className="relative w-64 h-48 flex-shrink-0">
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
      </div>
    </div>
  );
} 