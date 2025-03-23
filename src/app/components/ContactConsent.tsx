'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ContactConsentProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    customerType: string;
    serviceType: string;
    urgency: string;
    issueType: string[];
    message: string;
    files: File[];
    consentToText: boolean;
    needByDate?: string;
  }) => void;
}

const CUSTOMER_TYPES = [
  'Residential',
  'Property Manager',
  'Realtor'
];

const SERVICE_TYPES = [
  'In Shop',
  'At Home',
  'Undecided'
];

const URGENCY_TYPES = [
  'ASAP',
  'Couple of days',
  'Next Week',
  'Vacation/Rental Property',
  'Home Inspection',
  'Just want to see how much I could save'
];

const ISSUE_TYPES = [
  'Foggy Glass',
  'Broken Glass',
  'Stuck Window',
  'Lock Issues',
  'Broken Hardware',
  'Screen Repair',
  'Balance Issues',
  'High Pressure Salespeople',
  'Other'
];

export default function ContactConsent({ onSubmit }: ContactConsentProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [customerType, setCustomerType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [issueTypes, setIssueTypes] = useState<string[]>([]);
  const [needByDate, setNeedByDate] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consentToText, setConsentToText] = useState<boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferredDates, setPreferredDates] = useState(['', '', '']);
  const [preferredTimes, setPreferredTimes] = useState(['', '', '']);
  const [glassSize, setGlassSize] = useState({
    width: '',
    height: '',
    unit: 'inches'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consentToText === null) {
      alert('Please select whether you agree to receive text messages');
      return;
    }
    onSubmit({
      name,
      phone,
      email,
      address,
      customerType,
      serviceType,
      urgency,
      issueType: issueTypes,
      message,
      files,
      consentToText,
      needByDate
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const toggleIssueType = (type: string) => {
    setIssueTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const updatePreferredDate = (index: number, value: string) => {
    setPreferredDates(prev => {
      const newDates = [...prev];
      newDates[index] = value;
      return newDates;
    });
  };

  const updatePreferredTime = (index: number, value: string) => {
    setPreferredTimes(prev => {
      const newTimes = [...prev];
      newTimes[index] = value;
      return newTimes;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name*
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone*
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Service Address*</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Street Address"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
              value={address.street}
              onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
              value={address.city}
              onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="State"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
              value={address.state}
              onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
            />
            <input
              type="text"
              placeholder="ZIP"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
              value={address.zip}
              onChange={(e) => setAddress(prev => ({ ...prev, zip: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Issue Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type of Issue(s)*
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ISSUE_TYPES.map(type => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                issueTypes.includes(type)
                  ? 'bg-[#CD2028] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => toggleIssueType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Upload Guidance */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">Photo Guidelines</h4>
        <p className="text-sm text-gray-600 mb-4">
          For accurate pricing, please ensure your photos show the entire window/glass area clearly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-red-200 rounded-md p-3 bg-red-50">
            <p className="text-sm text-red-600 font-medium mb-2">❌ Do not send photos like this:</p>
            <div className="relative aspect-[3/2] mb-2 overflow-hidden rounded-md">
              <Image
                src="/images/bad pic.png"
                alt="Close-up of window damage"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="text-sm text-red-600">Close-up shots make it difficult to determine the window size and overall context</p>
          </div>
          <div className="border border-green-200 rounded-md p-3 bg-green-50">
            <p className="text-sm text-green-600 font-medium mb-2">✓ Perfect photo example:</p>
            <div className="relative aspect-[3/2] mb-2 overflow-hidden rounded-md">
              <Image
                src="/images/good pic.png"
                alt="Full view of damaged window"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="text-sm text-green-600">Full window view shows the entire frame, size, and damage location</p>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
          Upload Photos or Videos
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-[#CD2028] hover:text-[#B01B22] focus-within:outline-none"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 10MB</p>
          </div>
        </div>
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-gray-500">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Optional Details Section */}
      <div className="border rounded-md">
        <button
          type="button"
          className="w-full px-4 py-2 flex items-center justify-between text-left text-gray-900 font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Additional Details (Optional) - Speed up your service!</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isExpanded && (
          <div className="p-4 border-t space-y-6">
            {/* Service Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerType" className="block text-sm font-medium text-gray-700">
                  Customer Type
                </label>
                <select
                  id="customerType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {CUSTOMER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  id="serviceType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                  Urgency
                </label>
                <select
                  id="urgency"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="">Select Urgency</option>
                  {URGENCY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="needByDate" className="block text-sm font-medium text-gray-700">
                  Need by Date
                </label>
                <input
                  type="date"
                  id="needByDate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={needByDate}
                  onChange={(e) => setNeedByDate(e.target.value)}
                />
              </div>
            </div>

            {/* Preferred Service Dates */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Preferred Service Dates & Times</h4>
              {[0, 1, 2].map((index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                    value={preferredDates[index]}
                    onChange={(e) => updatePreferredDate(index, e.target.value)}
                  />
                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                    value={preferredTimes[index]}
                    onChange={(e) => updatePreferredTime(index, e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <option value="morning">Morning (9am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-4pm)</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Glass Size */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Approximate Glass Size</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Width</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                    value={glassSize.width}
                    onChange={(e) => setGlassSize(prev => ({ ...prev, width: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Height</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                    value={glassSize.height}
                    onChange={(e) => setGlassSize(prev => ({ ...prev, height: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Unit</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                    value={glassSize.unit}
                    onChange={(e) => setGlassSize(prev => ({ ...prev, unit: e.target.value }))}
                  >
                    <option value="inches">Inches</option>
                    <option value="feet">Feet</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Message Consent */}
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-700 mb-4">
          Do you agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088? Message frequency varies and may include:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
          <li>To provide and manage our services</li>
          <li>To schedule and confirm appointments</li>
          <li>To process payments and send invoices</li>
          <li>To communicate with you regarding your inquiries and our services</li>
        </ul>
        <p className="text-sm text-gray-700 mb-4">
          We do not sell your information. This is only to communicate with The Window Hospital Inc. Message and data rates may apply. Reply STOP at any time to end or unsubscribe. For assistance, reply HELP or contact support at (540)-603-0088.
        </p>
        
        <div className="space-y-2">
          <button
            type="button"
            className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              consentToText === true
                ? 'bg-[#CD2028] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setConsentToText(true)}
          >
            Yes, I agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088
          </button>
          <button
            type="button"
            className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              consentToText === false
                ? 'bg-[#CD2028] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setConsentToText(false)}
          >
            No, I do not want to receive text messages from The Window Hospital Inc.
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          See our{' '}
          <Link href="/privacy-policy" className="text-[#CD2028] hover:text-[#B01B22]">
            Privacy Policy
          </Link>{' '}
          for details on how we handle your information.
        </p>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
        >
          Submit
        </button>
      </div>
    </form>
  );
} 