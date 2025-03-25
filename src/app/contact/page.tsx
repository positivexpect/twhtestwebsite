'use client';

import React from 'react';
import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import AssessmentForm from '@/components/client/AssessmentForm';
import dynamic from 'next/dynamic';
import GoogleRating from '@/components/client/GoogleRating';

const StoreLocator = dynamic(() => import('@/components/client/StoreLocator'), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight mb-8">
              Get Your Free Window Assessment
            </h1>

            {/* Contact Details */}
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-[#CD2028]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1">
                    <a href="tel:5406030088" className="text-[#CD2028] hover:text-[#B01B22]">
                      (540) 603-0088
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Text us for quick quotes and scheduling
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-[#CD2028]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Location</h3>
                  <p className="mt-1">
                    10944 Patriot Highway, Suite 4745<br />
                    Fredericksburg, VA 22408
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-[#CD2028]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                  <p className="mt-1">Monday-Thursday: 9am-4pm</p>
                  <p>Friday: 9am-1pm</p>
                  <p>Saturday-Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <StarIcon className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-medium text-gray-900 ml-2">Love Our Service?</h3>
              </div>
              
              {/* Google Rating Display */}
              <div className="mb-4">
                <GoogleRating placeId="ChIJOdzghZ3xtokRrt9-myMgPOM" />
              </div>

              <p className="text-gray-600 mb-4">
                Your feedback helps us serve the Fredericksburg community better. Share your experience with others!
              </p>
              <a
                href="https://g.page/r/Ca7ffpsjIDzjEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22]"
              >
                Leave a Review on Google
              </a>
            </div>

            {/* Store Locator Map */}
            <div className="mt-12">
              <StoreLocator />
            </div>
          </div>

          {/* Assessment Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <AssessmentForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage; 