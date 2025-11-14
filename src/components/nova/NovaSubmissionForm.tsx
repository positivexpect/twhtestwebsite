'use client';

import { useState, useRef } from 'react';
import CaptchaWrapper from '../shared/CaptchaWrapper';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  windowType: string;
  issue: string;
  windowCount: string;
  message: string;
  textConsent: 'yes' | 'no' | '';
};

const WINDOW_TYPES = [
  'Single Hung',
  'Double Hung',
  'Casement',
  'Sliding',
  'Picture',
  'Bay/Bow',
  'Awning',
  'Other'
];

const ISSUES = [
  'Foggy/Cloudy Glass',
  'Broken Glass',
  'Seal Failure',
  'Lock/Handle Issues',
  'Balance Issues',
  'Screen Issues',
  'Frame Damage',
  'Not Sure - Need Assessment',
  'Multiple Issues'
];

export default function NovaSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: 'VA',
      zip: ''
    },
    windowType: '',
    issue: '',
    windowCount: '',
    message: '',
    textConsent: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const captchaRef = useRef<any>(null);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.address.city.trim()) {
      setError('City is required');
      return false;
    }
    if (!formData.address.zip.trim()) {
      setError('ZIP code is required');
      return false;
    }
    if (formData.textConsent === '') {
      setError('Please indicate your SMS preference');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const captchaToken = captchaRef.current?.getResponse();
      if (!captchaToken) {
        setError('Please complete the CAPTCHA');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/submit-nova', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: 'VA',
          zip: ''
        },
        windowType: '',
        issue: '',
        windowCount: '',
        message: '',
        textConsent: ''
      });

      if (captchaRef.current) {
        captchaRef.current.reset();
      }

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          <p className="font-semibold">Thank you for your submission!</p>
          <p>We'll contact you shortly to schedule your free assessment.</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            value={formData.address.street}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.address.state}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        <div className="col-span-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.address.zip}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Window Type
          </label>
          <select
            value={formData.windowType}
            onChange={(e) => setFormData({ ...formData, windowType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          >
            <option value="">Select type</option>
            {WINDOW_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Issue
          </label>
          <select
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          >
            <option value="">Select issue</option>
            {ISSUES.map(issue => (
              <option key={issue} value={issue}>{issue}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Approximate Number of Windows to Assess
        </label>
        <input
          type="number"
          min="1"
          value={formData.windowCount}
          onChange={(e) => setFormData({ ...formData, windowCount: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          placeholder="e.g., 8"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          placeholder="Tell us more about your windows or your timeline..."
        />
      </div>

      {/* SMS Consent */}
      <div className="mb-6">
        <p className="text-sm text-gray-700 font-medium mb-3">
          May we text you with updates about your assessment? *
        </p>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="textConsent"
              value="yes"
              checked={formData.textConsent === 'yes'}
              onChange={(e) => setFormData({ ...formData, textConsent: 'yes' })}
              className="w-4 h-4 text-[#CD2028] focus:ring-[#CD2028] border-gray-300"
              required
            />
            <span className="ml-3 text-gray-700">
              Yes, text me with updates (standard rates may apply)
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="textConsent"
              value="no"
              checked={formData.textConsent === 'no'}
              onChange={(e) => setFormData({ ...formData, textConsent: 'no' })}
              className="w-4 h-4 text-[#CD2028] focus:ring-[#CD2028] border-gray-300"
              required
            />
            <span className="ml-3 text-gray-700">
              No, contact me by email or phone only
            </span>
          </label>
        </div>
      </div>

      {/* CAPTCHA */}
      <div className="mb-6">
        <CaptchaWrapper ref={captchaRef} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#CD2028] text-white font-bold py-3 rounded-md hover:bg-[#B01B22] disabled:bg-gray-400 transition text-lg"
      >
        {loading ? 'Submitting...' : 'Get Your Free Assessment'}
      </button>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Your information is secure and will only be used to schedule your free assessment.
      </p>
    </form>
  );
}
