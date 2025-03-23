'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon, WrenchScrewdriverIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import AssessmentForm from '@/components/client/AssessmentForm';
import FAQSection from '@/components/client/FAQSection';
import type { FAQItem } from '@/components/client/FAQSection';

const partsServicesFAQs: FAQItem[] = [
  {
    question: "What window parts do you carry?",
    answer: "We stock a wide range of window parts including balances, locks, operators, weatherstripping, and more. Our inventory covers most major window brands and styles."
  },
  {
    question: "How do I know which part I need?",
    answer: "Our experts can help identify the correct part based on photos or measurements of your window. We also have detailed guides and video tutorials to help you identify parts."
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we offer professional installation services for all window parts. However, many parts can also be installed DIY with our video tutorials and guides."
  },
  {
    question: "What brands do you service?",
    answer: "We service most major window brands including Andersen, Pella, Marvin, Jeld-Wen, and many others. Contact us with your window details for specific part availability."
  }
];

export default function PartsServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-4 sm:mt-0">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-2 sm:mb-3">Window Parts & Hardware Repair</h1>
          <p className="mt-4 sm:mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            As a reformed sales rep, I know the truth: Most windows don't need replacing—they just need the right parts and expertise.
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Single Part vs Multiple Parts Repair</h2>
            <p className="text-lg text-gray-700 mb-6">
              I'll be honest—as a former window sales rep, I was trained to push replacements over repairs. But here's the truth: most windows just need the right parts and proper maintenance to function like new.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#CD2028] mb-3">Single Part Repair</h3>
                <p className="text-gray-600">$165 total for one part repair</p>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• $15 for parts (e.g., tilt latch)</li>
                  <li>• $150 service inspection fee</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#CD2028] mb-3">Multiple Parts Repair</h3>
                <p className="text-gray-600">As low as $30 per window</p>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• $15 per part</li>
                  <li>• One-time $150 service fee</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-700">
              Compare this to the national average of $1,500 per window replacement—the savings are significant!
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Professional Service</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Comprehensive $150 inspection to identify all issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Expert diagnosis of window problems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Documentation of future maintenance needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Professional installation available</span>
                </li>
              </ul>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Area Coverage</h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <iframe 
                    src="https://commutetimemap.com/embedded?places=38.261952%253B-77.497926%253B1%253B3600%253B%25234143f4&places=37.538509%253B-77.434280%253B1%253B3600%253B%2523fc0000&places=38.029570%253B-76.580790%253B1%253B3600%253B%2523b241f4&places=27.994697%253B-80.636614%253B1%253B3600%253B%2523f441cd&places=39.962260%253B-83.000707%253B1%253B3600%253B%2523006d2a&operation=union" 
                    name="commuteTimeMapIFrame" 
                    scrolling="no" 
                    frameBorder="0" 
                    height="400" 
                    width="100%"
                    title="Service Area Coverage Map"
                    className="w-full"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">Map shows our service coverage areas across multiple locations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">DIY Options</h2>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">
                    <span className="font-medium">Extensive Parts Catalog</span> - Access thousands of parts from major brands including Andersen, Pella, Marvin, and more
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">
                    <span className="font-medium">All Categories Covered</span> - Window hardware, balances, weatherstrip, door hardware, screen parts, and more
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Expert advice via text - send us photos of your window issues for part identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">Professional installation help available if needed after DIY purchase</span>
                </li>
              </ul>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-gray-600">
                  We understand that a $150 service fee can be steep for a single part repair. That's why we provide free DIY resources to help you save money!
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg className="h-6 w-6 text-[#CD2028]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3 className="ml-2 text-lg font-bold text-gray-900">Online Parts Store</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Browse our complete catalog of window and door parts. Find exactly what you need with detailed descriptions and specifications.
                  </p>
                  <Link
                    href="https://windowhospital.forpartsnow.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#CD2028] hover:text-[#B01B22] font-medium"
                  >
                    Shop Parts Now
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <h3 className="ml-2 text-lg font-bold text-gray-900">Free DIY Tutorial Videos</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Watch our step-by-step guides for common window repairs. Learn how to install parts correctly and save on service fees!
                  </p>
                  <Link
                    href="https://www.youtube.com/@thewindowhosptial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#CD2028] hover:text-[#B01B22] font-medium"
                  >
                    Watch Our Tutorials
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FAQSection
            faqs={partsServicesFAQs}
            title="Common Questions About Window Parts & Repairs"
            description="Get answers to frequently asked questions about window parts and repairs."
          />
        </div>

        {/* Contact Section */}
        <section id="get-quote" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <AssessmentForm />
              <div className="mt-8 text-center text-gray-600">
                <p className="font-medium mb-2">Visit Our Facility</p>
                <p>10944 Patriot Highway, Suite 4745<br />Fredericksburg, VA 22408</p>
                <p className="mt-2">
                  <span className="font-medium">Hours:</span>
                  <br />
                  Monday-Thursday: 9am-4pm
                  <br />
                  Friday: 9am-1pm
                </p>
                <div className="mt-4">
                  <Link
                    href="https://maps.google.com/?q=10944+Patriot+Highway+Suite+4745+Fredericksburg+VA+22408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] transition-colors"
                  >
                    Get Directions
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
