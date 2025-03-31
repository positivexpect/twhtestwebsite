'use client';

import VideoTestimonialForm from '@/components/campaigns/VideoTestimonialForm';

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
          <VideoTestimonialForm />
        </div>
      </div>
    </div>
  );
} 