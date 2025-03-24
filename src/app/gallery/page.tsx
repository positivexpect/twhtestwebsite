'use client';

import React from 'react';
import BeforeAfterGallery from '@/components/client/BeforeAfterGallery';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Work Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the transformations we've achieved and the common window issues we fix. From foggy glass to broken seals, we have the expertise to restore your windows to like-new condition.
          </p>
        </div>

        {/* Gallery */}
        <BeforeAfterGallery />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your windows?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Get Your Free Assessment
          </Link>
        </div>
      </div>
    </div>
  );
} 