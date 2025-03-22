'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ScreenServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Screen Repair & Replacement</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Don't let damaged screens keep your windows closed. We offer quick, professional screen repair and replacement services with innovative solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Screen Repair Service</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Quick re-screening service at our shop (same-day possible)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Professional removal and reinstallation available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">High-quality screen material for durability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Full inspection of screen hardware and components</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Frame Replacement</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Innovative frame solutions more durable than traditional aluminum</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Custom sizing for perfect fit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Modern materials that resist breaking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Complete assembly and installation available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Options */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#CD2028] mb-3">Drop-off Service</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Bring screens to our shop</li>
                  <li>• Quick turnaround time</li>
                  <li>• Most cost-effective option</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#CD2028] mb-3">Full Service</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• $150 inspection fee</li>
                  <li>• We remove & reinstall</li>
                  <li>• Complete service at our shop</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Fix Your Screens?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Professional Service?</h3>
                <p className="text-gray-600 mb-4">Schedule an inspection or text us a photo</p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22]"
                >
                  Schedule Service
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Have Questions?</h3>
                <p className="text-gray-600 mb-4">Text us a photo for quick advice</p>
                <a 
                  href="tel:540-603-0088" 
                  className="text-lg font-medium text-[#CD2028] hover:text-[#B01B22] transition-colors"
                >
                  (540) 603-0088
                </a>
              </div>
            </div>
            <div className="mt-8 text-gray-600">
              <p className="mt-2">10944 Patriot Highway, Suite 4745<br />Fredericksburg, VA 22408</p>
              <p className="mt-1">Open Mon-Thurs 9am-4pm, Fri 9am-1pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
