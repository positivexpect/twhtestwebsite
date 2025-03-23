'use client';

import Image from 'next/image';
import Link from 'next/link';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import AssessmentForm from '@/components/client/AssessmentForm';
import FAQSection from '@/components/client/FAQSection';
import type { FAQItem } from '@/components/client/FAQSection';

const screenServicesFAQs: FAQItem[] = [
  {
    question: "What types of screens do you repair?",
    answer: "We repair all types of window and door screens including standard window screens, sliding door screens, and custom-sized screens. We can also upgrade your screens to better materials."
  },
  {
    question: "How much does screen repair cost?",
    answer: "Screen repair costs vary by size and material. Basic repairs start at $20-30 per screen. For exact pricing, bring your screen to our shop or send us measurements and photos."
  },
  {
    question: "What screen materials do you offer?",
    answer: "We offer standard fiberglass mesh, heavy-duty pet screen, solar screen for UV protection, and fine mesh for better insect protection. We'll help you choose the best option for your needs."
  },
  {
    question: "How long does screen repair take?",
    answer: "Most screen repairs can be completed same-day when you bring them to our shop. For full-service repairs where we remove and reinstall screens, we typically complete the work within 1-2 business days."
  }
];

export default function ScreenServices() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 mt-4 sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-2 sm:mb-3">Professional Screen Repair</span>
              <span className="block text-[#CD2028]">Fast & Affordable</span>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Expert screen repair and replacement services. We fix window screens, door screens, and more.
            </p>
            <div className="mt-6 sm:mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md shadow">
                <Link
                  href="#get-quote"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] md:py-4 md:text-lg md:px-10"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options Section */}
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
        <FAQSection
          faqs={screenServicesFAQs}
          title="Common Questions About Screen Repair"
          description="Get answers to frequently asked questions about our screen repair services."
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
  );
}
