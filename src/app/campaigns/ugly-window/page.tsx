'use client';

import UglyWindowForm from '@/components/campaigns/UglyWindowForm';
import Image from 'next/image';

export default function UglyWindowPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Win Free Glass: Submit Your Ugliest Window Photo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Submit a photo of your ugliest window for a chance to win free glass!
            We'll select a winner once we reach 100 submissions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 pr-6">
              <p className="text-gray-600">
                Have an unsightly window that needs attention? Share it with us for a chance to win a free glass replacement!
                Our community votes on the ugliest window, and the winner gets a complete transformation.
              </p>
            </div>
            <div className="relative w-64 h-48 flex-shrink-0">
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
      </div>
    </div>
  );
} 