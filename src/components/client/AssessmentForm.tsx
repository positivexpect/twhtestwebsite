'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
  issueTypes: string[];
  customerType: string;
  serviceType: string;
  urgency: string;
  needByDate: string;
  preferredDates: string[];
  preferredTimes: string[];
  glassSize: {
    width: string;
    height: string;
    unit: string;
  };
  files: File[];
  textConsent: 'yes' | 'no' | '';
};

const ISSUE_TYPES = [
  'Foggy Glass',
  'Broken Glass',
  'Seal Failure',
  'Lock Issues',
  'Balance Issues',
  'Screen Issues',
  'High Pressure Salespeople',
  'Failed Home Inspection',
  'Other'
];

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

export default function AssessmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    issueTypes: [],
    customerType: '',
    serviceType: '',
    urgency: '',
    needByDate: '',
    preferredDates: ['', '', ''],
    preferredTimes: ['', '', ''],
    glassSize: {
      width: '',
      height: '',
      unit: 'inches'
    },
    files: [],
    textConsent: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleIssueType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      issueTypes: prev.issueTypes.includes(type)
        ? prev.issueTypes.filter(t => t !== type)
        : [...prev.issueTypes, type]
    }));
  };

  const updatePreferredDate = (index: number, value: string) => {
    const newDates = [...formData.preferredDates];
    newDates[index] = value;
    setFormData(prev => ({ ...prev, preferredDates: newDates }));
  };

  const updatePreferredTime = (index: number, value: string) => {
    const newTimes = [...formData.preferredTimes];
    newTimes[index] = value;
    setFormData(prev => ({ ...prev, preferredTimes: newTimes }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: [...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zip: ''
          },
          issueTypes: [],
          customerType: '',
          serviceType: '',
          urgency: '',
          needByDate: '',
          preferredDates: ['', '', ''],
          preferredTimes: ['', '', ''],
          glassSize: {
            width: '',
            height: '',
            unit: 'inches'
          },
          files: [],
          textConsent: ''
        });
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

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-green-800">Thank You!</h3>
        <p className="mt-2 text-green-600">
          We've received your assessment request and will contact you within 1 business day to schedule your free assessment.
        </p>
        <p className="mt-4 text-green-700">
          Did you know? Our customers typically save 50-80% compared to window replacement quotes.
        </p>
      </div>
    );
  }

  return (
    <section id="assessment" className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Get Your Free Assessment</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find out how much you can save with our expert window repair services
          </p>
        </div>

        {submitError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.address.street}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={formData.address.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={formData.address.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm"
                  value={formData.address.zip}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, zip: e.target.value } }))}
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
                    formData.issueTypes.includes(type)
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
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#CD2028] hover:text-[#B01B22] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#CD2028]"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {formData.files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-500">
                {formData.files.map((file, index) => (
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
                      value={formData.customerType}
                      onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
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
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
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
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
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
                      value={formData.needByDate}
                      onChange={(e) => setFormData({ ...formData, needByDate: e.target.value })}
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
                        value={formData.preferredDates[index]}
                        onChange={(e) => updatePreferredDate(index, e.target.value)}
                      />
                      <select
                        className="rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                        value={formData.preferredTimes[index]}
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
                        value={formData.glassSize.width}
                        onChange={(e) => setFormData(prev => ({ ...prev, glassSize: { ...prev.glassSize, width: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Height</label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                        value={formData.glassSize.height}
                        onChange={(e) => setFormData(prev => ({ ...prev, glassSize: { ...prev.glassSize, height: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Unit</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028]"
                        value={formData.glassSize.unit}
                        onChange={(e) => setFormData(prev => ({ ...prev, glassSize: { ...prev.glassSize, unit: e.target.value } }))}
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
                      ? 'border-[#CD2028] bg-red-50 text-red-700' 
                      : 'border-gray-300 hover:border-red-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                        formData.textConsent === 'yes'
                          ? 'border-[#CD2028] bg-[#CD2028]'
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
                      ? 'border-[#CD2028] bg-red-50 text-red-700' 
                      : 'border-gray-300 hover:border-red-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                        formData.textConsent === 'no'
                          ? 'border-[#CD2028] bg-[#CD2028]'
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
                See our <a href="/privacy-policy" className="text-[#CD2028] hover:text-[#B01B22]">Privacy Policy</a> for details on how we handle your information.
              </p>
            </div>
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
          </div>
        </form>
      </div>
    </section>
  );
}
