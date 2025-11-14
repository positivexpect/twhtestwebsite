'use client';

import { useState } from 'react';
import Link from 'next/link';
import CaptchaWrapper from '../shared/CaptchaWrapper';
import FileUpload from '../shared/FileUpload';

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

type UploadedFile = {
  name: string;
  url: string;
  size: number;
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

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [uploadError, setUploadError] = useState('');

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

  const handleFileUploadComplete = (url: string, file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      url: url,
      size: file.size
    };
    setUploadedFiles(prev => [...prev, newFile]);
    setUploadError('');
  };

  const handleUploadError = (error: Error) => {
    setUploadError(error.message);
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
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
          captchaToken,
          files: uploadedFiles
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

      setUploadedFiles([]);
      setCaptchaToken('');
      setUploadError('');

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8" aria-label="Northern Virginia Window Assessment Request Form">
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg" role="alert" aria-live="polite">
          <p className="font-semibold">Thank you for your submission!</p>
          <p>We'll contact you shortly to schedule your free assessment.</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span aria-label="required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            id="street"
            type="text"
            value={formData.address.street}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City <span aria-label="required">*</span>
          </label>
          <input
            id="city"
            type="text"
            value={formData.address.city}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            id="state"
            type="text"
            value={formData.address.state}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        <div className="col-span-2 md:col-span-2">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code <span aria-label="required">*</span>
          </label>
          <input
            id="zip"
            type="text"
            value={formData.address.zip}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="windowType" className="block text-sm font-medium text-gray-700 mb-2">
            Window Type
          </label>
          <select
            id="windowType"
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
          <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
            Main Issue
          </label>
          <select
            id="issue"
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
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details (Optional)
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#CD2028] focus:border-[#CD2028] outline-none"
          placeholder="Tell us more about your windows or your timeline..."
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos or Videos (Optional)
        </label>
        <FileUpload
          formType="assessment"
          onUploadComplete={handleFileUploadComplete}
          onUploadError={handleUploadError}
          multiple={true}
        />
        <p className="text-sm text-gray-600 mt-2">
          Upload photos or videos of your window issues to help us better understand your needs. Maximum file size: 100MB per file.
        </p>
        {uploadError && (
          <p className="text-red-600 text-sm mt-2">{uploadError}</p>
        )}

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <span className="text-sm text-gray-700">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </span>
                  <button
                    type="button"
                    onClick={() => removeUploadedFile(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* SMS Consent */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-gray-900 mb-3">
          Do you agree to receive text messages from The Window Hospital Inc. sent from (703)-574-6003? *
        </p>

        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Message frequency varies and may include:
          <br />
          • To provide and manage our services
          <br />
          • To schedule and confirm appointments
          <br />
          • To process payments and send invoices
          <br />
          • To communicate with you regarding your inquiries and our services
          <br />
          <br />
          We do not sell your information. This is only to communicate with The Window Hospital Inc. Message and data rates may apply. Reply STOP at any time to end or unsubscribe. For assistance, reply HELP or contact support at (703)-574-6003.
        </p>

        <div className="space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="radio"
              name="textConsent"
              value="yes"
              checked={formData.textConsent === 'yes'}
              onChange={(e) => setFormData({ ...formData, textConsent: 'yes' })}
              className="w-4 h-4 text-[#CD2028] focus:ring-[#CD2028] border-gray-300 mt-0.5 flex-shrink-0"
              required
            />
            <span className="ml-3 text-sm text-gray-900">
              Yes, I agree to receive text messages from The Window Hospital Inc. sent from (703)-574-6003
            </span>
          </label>

          <label className="flex items-start cursor-pointer">
            <input
              type="radio"
              name="textConsent"
              value="no"
              checked={formData.textConsent === 'no'}
              onChange={(e) => setFormData({ ...formData, textConsent: 'no' })}
              className="w-4 h-4 text-[#CD2028] focus:ring-[#CD2028] border-gray-300 mt-0.5 flex-shrink-0"
              required
            />
            <span className="ml-3 text-sm text-gray-900">
              No, I do not want to receive text messages from The Window Hospital Inc. See our{' '}
              <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              {' '}for details on how we handle your information.
            </span>
          </label>
        </div>
      </div>

      {/* CAPTCHA */}
      <div className="mb-6">
        <CaptchaWrapper onVerify={setCaptchaToken} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#CD2028] text-white font-bold py-3 rounded-md hover:bg-[#B01B22] disabled:bg-gray-400 transition text-lg"
        aria-busy={loading}
      >
        {loading ? 'Submitting...' : 'Get Your Free Assessment'}
      </button>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Your information is secure and will only be used to schedule your free assessment.
      </p>
    </form>
  );
}
