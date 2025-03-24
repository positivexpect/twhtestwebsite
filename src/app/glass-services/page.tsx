'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import AssessmentForm from '@/components/client/AssessmentForm';
import FAQSection from '@/components/client/FAQSection';
import type { FAQItem } from '@/components/client/FAQSection';
import BeforeAfterGallery from '@/components/client/BeforeAfterGallery';

const glassServicesFAQs: FAQItem[] = [
  {
    question: "Can I replace just the glass in my window?",
    answer: "Yes, in most cases you can replace just the glass, saving thousands over full window replacement. Our glass-only replacement service preserves your existing frame while restoring clarity and energy efficiency."
  },
  {
    question: "How much does glass replacement cost?",
    answer: "Glass replacement typically costs between $200-$600, depending on size and type. This is significantly less than full window replacement which can cost $1,000 or more."
  },
  {
    question: "Do you offer Low-E glass options?",
    answer: "Yes, we offer Low-E glass options that help improve energy efficiency by reflecting heat while letting light through. We can match your existing Low-E configuration or upgrade to Low-E if desired."
  },
  {
    question: "How long does glass replacement take?",
    answer: "Most glass replacements can be completed in 1-2 hours per window. We work efficiently to minimize disruption to your home."
  }
];

const commonQuestions = [
  {
    question: "Can I replace just the glass in my window?",
    answer: "Yes! In about 85% of cases, we can replace just the glass for a fraction of the cost of full window replacement. This typically saves you $600-$1200 per window."
  },
  {
    question: "Why do my windows get foggy?",
    answer: "Foggy windows occur when the seal between glass panes fails, allowing moisture to enter. This common issue affects energy efficiency but can often be fixed without replacing the entire window."
  },
  {
    question: "How much does glass repair cost?",
    answer: "Glass repair typically costs $200-$600 per window, saving you 50-80% compared to full window replacement. We provide exact quotes after assessing your specific situation."
  }
];

export default function GlassServices() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 mt-4 sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-2 sm:mb-3">Don't Replace Your Windows.</span>
              <span className="block text-[#CD2028]">Repair Them Today.</span>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Save 50-70% with our same-day glass repair services. We manufacture custom dual-pane glass units in-house.
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

      {/* Same Day Service Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Same-Day Dual-Pane Glass Manufacturing
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Bring your removable window sash to our facility by 10 AM, and we'll have your custom-made replacement ready the same day.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CD2028] text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">Fast Turnaround</h3>
                </div>
                <p className="text-gray-500">
                  No need to wait weeks for replacement windows. Our in-house manufacturing means you get your repaired windows back the same day.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CD2028] text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">Save 50-70%</h3>
                </div>
                <p className="text-gray-500">
                  Why pay thousands for new windows when you can repair your existing ones for a fraction of the cost?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Premium Manufacturing Process</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We use state-of-the-art equipment and techniques to ensure your repaired windows are as good as new.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dl className="space-y-6">
                  {[
                    {
                      title: "Precise Measurements",
                      description: "Every piece of glass is custom-measured to ensure a perfect fit in your existing frame."
                    },
                    {
                      title: "Industrial Glass Processing",
                      description: "Our industrial facility features precision cutting equipment and a specialized glass washing machine for pristine results."
                    },
                    {
                      title: "Premium Materials",
                      description: "Choose between low-profile aluminum or Super Spacer technology, with optional decorative grids between panes."
                    },
                    {
                      title: "Professional Sealing",
                      description: "We use a hot melt butyl process to create a durable, long-lasting seal for your insulated glass unit."
                    }
                  ].map((item) => (
                    <div key={item.title} className="relative">
                      <dt>
                        <p className="text-lg leading-6 font-medium text-gray-900">{item.title}</p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Glass Repair?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Maintains original frame and appearance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Significantly lower cost than replacement</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Same-day service available</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Environmentally friendly solution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Questions About Glass Repair
          </h2>
          <FAQSection faqs={commonQuestions} />
        </div>
      </section>

      {/* Before/After Preview Section */}
      <section className="mb-16">
        <Link href="/gallery" className="block text-center hover:opacity-80 transition-opacity">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-flex items-center justify-center">
            Before & After Gallery
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h2>
        </Link>
        <BeforeAfterGallery previewMode={true} />
      </section>

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
