'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FranchisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const benefits = [
    {
      title: "Market Opportunity",
      description: "Enter a growing market where 85% of customers are unaware of repair options, offering significant cost savings over replacement.",
      icon: (
        <svg className="w-12 h-12 text-[#CD2028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Protected Territory",
      description: "Exclusive rights to a geographic area, ensuring maximum growth potential without internal competition.",
      icon: (
        <svg className="w-12 h-12 text-[#CD2028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Advanced Technology",
      description: "Access our proprietary CRM system for seamless operations, including invoicing, job tracking, and automated marketing.",
      icon: (
        <svg className="w-12 h-12 text-[#CD2028]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const opportunities = [
    {
      title: "For Glass Makers",
      points: [
        "Expand your service offerings",
        "Access the replacement market",
        "Learn to sell screens and parts",
        "Differentiate from competitors",
        "Increase revenue streams"
      ]
    },
    {
      title: "For Entrepreneurs",
      points: [
        "Low barrier to entry",
        "Easy-to-manage services",
        "Learn valuable business skills",
        "Growth potential into manufacturing",
        "Modern business opportunity"
      ]
    }
  ];

  const interestOptions = [
    { value: "new_franchise", label: "New Franchise Opportunity" },
    { value: "software", label: "Window Repair Software" },
    { value: "affiliate", label: "Existing Glass Manufacturer - Affiliate Program" },
    { value: "other", label: "Other Opportunities" }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        message: formData.get('message'),
        formType: 'franchise'
      };

      const response = await fetch('/api/submit-franchise-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit inquiry');
      }

      setSubmitStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join The Window Hospital Family</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              Become part of a growing network of window repair specialists committed to quality, 
              honesty, and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Market Stats Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="market-stats-heading">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="market-stats-heading" className="text-3xl font-bold mb-4">A Growing Market Opportunity</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The window repair industry is experiencing significant growth, with the related window 
              coverings market projected to reach $36.54 billion by 2030. Join an industry where 
              repair services can capture significant market share through consumer education.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white" aria-labelledby="benefits-heading">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="benefits-heading" className="text-3xl font-bold mb-4">Why Choose The Window Hospital?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join a proven business model with comprehensive support and training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                role="article"
              >
                <div className="text-[#CD2028] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For Both Veterans & Newcomers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-[#CD2028]">{opportunity.title}</h3>
                <ul className="space-y-4">
                  {opportunity.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <svg className="w-6 h-6 text-[#CD2028] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Training & Support</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We provide extensive training on repair techniques, business management, and our 
              proprietary CRM system. Our ongoing support ensures your success with technical 
              assistance and marketing support.
            </p>
          </div>
        </div>
      </section>

      {/* Update CTA Section with Form */}
      <section className="py-16 bg-white" aria-labelledby="inquiry-form-heading">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="inquiry-form-heading" className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg text-gray-600">
              Fill out the form below to learn more about franchise opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  aria-required="true"
                  aria-invalid={submitStatus === 'error' ? 'true' : 'false'}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  aria-required="true"
                  aria-invalid={submitStatus === 'error' ? 'true' : 'false'}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  aria-required="true"
                  aria-invalid={submitStatus === 'error' ? 'true' : 'false'}
                />
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Desired Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  aria-required="true"
                  aria-invalid={submitStatus === 'error' ? 'true' : 'false'}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                aria-invalid={submitStatus === 'error' ? 'true' : 'false'}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]'
                }`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4" role="alert">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Thank you for your inquiry! We'll contact you shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4" role="alert">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {errorMessage || 'An error occurred. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
} 