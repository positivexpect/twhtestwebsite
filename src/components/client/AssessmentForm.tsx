'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  issueType: string;
  message: string;
  textConsent: 'yes' | 'no' | '';
};

export default function AssessmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    issueType: '',
    message: '',
    textConsent: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="assessment" className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Get Your Free Assessment</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find out how much you can save with our expert window repair services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
              Type of Issue
            </label>
            <select
              id="issueType"
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select an issue</option>
              <option value="glass">Glass Issues</option>
              <option value="parts">Parts Issues</option>
              <option value="screen">Screen Issues</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                Do you agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088? Message frequency varies and may include (To provide and manage our services, to schedule and confirm appointments, to process payments and send invoices, to communicate with you regarding your inquiries and our services.) We do not sell your information this is only to communicate with The Window Hospital Inc. Message and data rates may apply. Reply STOP at any time to end or unsubscribe. For assistance, reply HELP or contact support at (540)-603-0088
              </p>
              <div className="mt-6 space-y-4">
                <label className="relative block">
                  <input
                    type="radio"
                    name="textConsent"
                    value="yes"
                    checked={formData.textConsent === 'yes'}
                    onChange={(e) => setFormData({ ...formData, textConsent: e.target.value as 'yes' | 'no' })}
                    className="sr-only"
                    required
                  />
                  <div className={`cursor-pointer w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                    formData.textConsent === 'yes' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                        formData.textConsent === 'yes'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {formData.textConsent === 'yes' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="font-medium">Yes, I agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088</span>
                    </div>
                  </div>
                </label>

                <label className="relative block">
                  <input
                    type="radio"
                    name="textConsent"
                    value="no"
                    checked={formData.textConsent === 'no'}
                    onChange={(e) => setFormData({ ...formData, textConsent: e.target.value as 'yes' | 'no' })}
                    className="sr-only"
                    required
                  />
                  <div className={`cursor-pointer w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                    formData.textConsent === 'no' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                        formData.textConsent === 'no'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {formData.textConsent === 'no' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="font-medium">No, I do not want to receive text messages from The Window Hospital Inc.</span>
                    </div>
                  </div>
                </label>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                See our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a> for details on how we handle your information.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule Free Assessment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
