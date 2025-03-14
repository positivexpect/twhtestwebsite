'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  issueType: string;
  replacementQuote?: string;
  message: string;
};

const WINDOW_ISSUES = [
  { value: 'foggy', label: 'Foggy Glass / Condensation' },
  { value: 'operation', label: 'Difficult to Open/Close' },
  { value: 'draft', label: 'Drafty / Energy Loss' },
  { value: 'hardware', label: 'Broken Hardware' },
  { value: 'screen', label: 'Damaged Screen' },
  { value: 'other', label: 'Other Issue' },
];

export default function AssessmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    issueType: '',
    replacementQuote: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-green-800">Thank You!</h3>
        <p className="mt-2 text-green-600">
          We've received your request and will contact you within 1 business day to schedule your free assessment.
        </p>
        <p className="mt-4 text-green-700">
          Did you know? Our customers typically save 50-80% compared to window replacement quotes.
        </p>
      </div>
    );
  }

  return (
    <div id="assessment" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Get Your Free Window Assessment
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Find out how much you can save with our expert repair services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                required
                pattern="[0-9]{5}"
                value={formData.zipCode}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
              Window Issue
            </label>
            <div className="mt-1">
              <select
                id="issueType"
                name="issueType"
                required
                value={formData.issueType}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              >
                <option value="">Select an issue</option>
                {WINDOW_ISSUES.map(issue => (
                  <option key={issue.value} value={issue.value}>
                    {issue.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="replacementQuote" className="block text-sm font-medium text-gray-700">
              Replacement Quote (if any)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="replacementQuote"
                id="replacementQuote"
                placeholder="$"
                value={formData.replacementQuote}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              If you've received a window replacement quote, enter it here and we'll show you how much you could save
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Additional Details
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule Free Assessment
            </button>
            <p className="mt-3 text-sm text-gray-500 text-center">
              No obligation assessment • Same day appointments available • Save 50-80% vs replacement
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
