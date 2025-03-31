'use client';

import UglyWindowForm from '@/components/campaigns/UglyWindowForm';

export default function UglyWindowPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ugly Window Contest
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Submit a photo of your ugliest window for a chance to win free glass!
            We'll select a winner once we reach 100 submissions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <UglyWindowForm />
        </div>
      </div>
    </div>
  );
} 