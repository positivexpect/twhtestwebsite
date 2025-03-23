'use client';

import React from 'react';
import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import ContactConsent from '../components/ContactConsent';
import dynamic from 'next/dynamic';

const GoogleMap = dynamic(() => import('@/components/client/GoogleMap'), {
  ssr: false,
});

const GoogleRating = dynamic(() => import('@/components/client/GoogleRating'), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Get Your Free Window Assessment
            </h1>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-[#CD2028] mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Quick Quote by Text</h3>
                  <p className="mt-1 text-gray-600">
                    Text <a href="tel:5406030088" className="text-[#CD2028] font-semibold hover:text-[#B01B22]">540-603-0088</a> with a picture of your window for a fast response
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-[#CD2028] mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                  <p className="mt-1 text-gray-600">
                    10944 Patriot Highway, Suite 4745<br />
                    Fredericksburg, VA 22408
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <ClockIcon className="h-6 w-6 text-[#CD2028] mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Monday - Thursday: 9am - 4pm<br />
                    Friday: 9am - 1pm<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  85% of windows can be repaired, not replaced
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Save 50-80% compared to replacement
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Most repairs cost $200-$600
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Same day service available
                </li>
              </ul>
            </div>

            {/* Google Reviews Section */}
            <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <StarIcon className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-medium text-gray-900 ml-2">Love Our Service?</h3>
              </div>
              
              {/* Google Rating Display */}
              <GoogleRating placeId="ChIJCfPfZxmvtokRHj3UZPsjf68" />

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

            {/* Google Map */}
            <div className="mt-12">
              <GoogleMap />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Request a Free Assessment
            </h2>
            
            <ContactConsent 
              onSubmit={async (data) => {
                // Here you would handle the form submission
                console.log('Form submitted:', data);
                // TODO: Add your form submission logic here
                alert('Thank you for your submission! We will contact you shortly.');
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage; 