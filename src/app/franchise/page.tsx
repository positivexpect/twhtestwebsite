'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FranchisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-franchise-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your interest! We will contact you soon.',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again later.',
      });
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join The Window Hospital Family</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Become part of a growing network of window repair specialists committed to quality, 
              honesty, and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Market Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">A Growing Market Opportunity</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The window repair industry is experiencing significant growth, with the related window 
              coverings market projected to reach $36.54 billion by 2030. Join an industry where 
              repair services can capture significant market share through consumer education.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose The Window Hospital?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
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
      <section className="py-16 bg-[#CD2028] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Fill out the form below to learn more about this exciting opportunity and 
              join our growing network of successful window repair specialists.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {submitStatus.type && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    placeholder="John Smith"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    placeholder="(555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location (City, State) *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    placeholder="Richmond, VA"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Interest Dropdown */}
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    I'm Interested In *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    disabled={isSubmitting}
                  >
                    <option value="">Select an option</option>
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-gray-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contractor License */}
                <div>
                  <label htmlFor="hasLicense" className="block text-sm font-medium text-gray-700 mb-1">
                    Do you currently have a contractor license?
                  </label>
                  <select
                    id="hasLicense"
                    name="hasLicense"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                    disabled={isSubmitting}
                  >
                    <option value="">Select an option</option>
                    <option value="yes" className="text-gray-900">Yes</option>
                    <option value="no" className="text-gray-900">No</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#CD2028] focus:border-[#CD2028] text-gray-900"
                  placeholder="Tell us about your background and what interests you about this opportunity..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-block bg-[#CD2028] text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#B01B22]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 