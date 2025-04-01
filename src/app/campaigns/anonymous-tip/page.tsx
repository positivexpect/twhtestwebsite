'use client';

import AnonymousTipForm from '@/components/campaigns/AnonymousTipForm';
import Image from 'next/image';

export default function AnonymousTipPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Your Community: Anonymous Window Repair Tips
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Know someone in need? Submit an anonymous tip about someone who could benefit
            from our free repair services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 pr-6">
              <p className="text-gray-600">
                Help us reach those in need! If you know someone struggling with window issues
                but hesitant to seek help, let us know anonymously. We'll find a way to assist them.
              </p>
            </div>
            <div className="relative w-64 h-48 flex-shrink-0">
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
      </div>
    </div>
  );
} 