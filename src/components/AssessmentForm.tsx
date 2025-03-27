'use client';

import { useState } from 'react';
import CaptchaWrapper from './shared/CaptchaWrapper';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setSubmitError('Please complete the captcha verification');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          zipCode: '',
          issueType: '',
          replacementQuote: '',
          message: '',
        });
        setCaptchaToken(null);
      } else {
        setSubmitError(result.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
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

        {submitError && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{submitError}</span>
          </div>
        )}

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
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
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
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
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
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
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
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
              Type of Issue
            </label>
            <div className="mt-1">
              <select
                id="issueType"
                name="issueType"
                required
                value={formData.issueType}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Select an issue</option>
                {WINDOW_ISSUES.map((issue) => (
                  <option key={issue.value} value={issue.value}>
                    {issue.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="replacementQuote" className="block text-sm font-medium text-gray-700">
              Do you have a replacement quote? (Optional)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="replacementQuote"
                id="replacementQuote"
                value={formData.replacementQuote}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
                placeholder="Enter amount if you have a quote"
              />
            </div>
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
                className="block w-full shadow-sm sm:text-sm focus:ring-[#CD2028] focus:border-[#CD2028] border-gray-300 rounded-md text-gray-900"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <CaptchaWrapper onVerify={setCaptchaToken} />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting || !captchaToken}
              className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white ${
                isSubmitting || !captchaToken
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]'
              }`}
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
                'Schedule Free Assessment'
              )}
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
