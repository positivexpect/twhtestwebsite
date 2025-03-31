'use client';

import AnonymousTipForm from '@/components/campaigns/AnonymousTipForm';

export default function AnonymousTipPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anonymous Tip Center
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Know someone in need? Submit an anonymous tip about someone who could benefit
            from our free repair services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <AnonymousTipForm />
        </div>
      </div>
    </div>
  );
} 