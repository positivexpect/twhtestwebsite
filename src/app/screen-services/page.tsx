'use client';

import Link from 'next/link';
import { CheckCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import ContactConsent from '../components/ContactConsent';

const screenServicesFAQs = [
  {
    question: "How much does it cost to repair a window screen?",
    answer: "Screen repairs start at $35-75 for re-screening in your existing frame. For full service including removal and reinstallation, there's a $150 service fee. Drop-off service at our shop is the most cost-effective option."
  },
  {
    question: "Can you repair a torn window screen?",
    answer: "Yes! We can repair most torn screens by re-screening with high-quality material. If the frame is damaged, we offer innovative replacement frames that are more durable than traditional aluminum."
  },
  {
    question: "How long does screen repair take?",
    answer: "Drop-off service can often be completed same-day. For full service (including removal and reinstallation), we typically complete the work within 1-2 business days after initial inspection."
  }
];

export default function ScreenServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-4 sm:mt-0">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-2 sm:mb-3">Screen Repair & Replacement</h1>
          <p className="mt-4 sm:mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
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

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Common Questions About Screen Repair
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get answers to frequently asked questions about our screen repair services.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-8">
              {screenServicesFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-[#CD2028] mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center text-[#CD2028] hover:text-[#B01B22]"
              >
                View all FAQs
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Get Your Screens Fixed</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ContactConsent 
                onSubmit={async (data) => {
                  // Here you would handle the form submission
                  console.log('Form submitted:', data);
                  // TODO: Add your form submission logic here
                  alert('Thank you for your submission! We will contact you shortly.');
                }}
              />
            </div>
            <div className="mt-8 text-center text-gray-600">
              <p className="mt-2">10944 Patriot Highway, Suite 4745<br />Fredericksburg, VA 22408</p>
              <p className="mt-1">Open Mon-Thurs 9am-4pm, Fri 9am-1pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
