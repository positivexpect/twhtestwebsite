'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { toBlobURL } from '@ffmpeg/util';
import CaptchaWrapper from '../shared/CaptchaWrapper';
import { uploadFile } from '@/utils/fileUpload';
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const compressionAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitError]);

  useEffect(() => {
    if (submitSuccess && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitSuccess]);

  useEffect(() => {
    // Initialize FFmpeg
    const initFFmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();
        await ffmpeg.load({
          coreURL: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.9/dist/umd/ffmpeg-core.js',
          wasmURL: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.9/dist/umd/ffmpeg-core.wasm',
        });
        ffmpegRef.current = ffmpeg;
      } catch (error) {
        console.error('Failed to initialize FFmpeg:', error);
        // Don't throw, just log the error. The form will still work without compression.
      }
    };
    initFFmpeg();
  }, []);

  const compressVideo = async (file: File): Promise<File> => {
    if (!ffmpegRef.current) {
      console.log('FFmpeg not available, uploading original file');
      return file;
    }

    try {
      const ffmpeg = ffmpegRef.current;
      const inputFileName = 'input.mp4';
      const outputFileName = 'output.mp4';
      compressionAbortRef.current = new AbortController();

      // Write the file to FFmpeg's virtual filesystem
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      // Set up progress handling
      ffmpeg.on('progress', ({ progress }) => {
        setCompressionProgress(Math.round(progress * 100));
      });

      // More aggressive compression settings
      await ffmpeg.exec([
        '-i', inputFileName,
        '-c:v', 'libx264',
        '-crf', '35', // Higher value = more compression (35 is more aggressive)
        '-preset', 'faster', // Faster compression
        '-c:a', 'aac',
        '-b:a', '96k', // Lower audio bitrate
        '-vf', 'scale=1280:-2', // Scale to 720p
        outputFileName
      ]);

      // Read the compressed file
      const data = await ffmpeg.readFile(outputFileName);
      
      // Create a new File object from the compressed data
      return new File([data], file.name.replace(/\.[^/.]+$/, '_compressed.mp4'), {
        type: 'video/mp4'
      });
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log('Video compression cancelled');
        return file;
      }
      console.error('Error compressing video:', error);
      return file;
    } finally {
      compressionAbortRef.current = null;
    }
  };

  const cancelCompression = () => {
    if (compressionAbortRef.current) {
      compressionAbortRef.current.abort();
    }
    setIsCompressing(false);
    setCompressionProgress(0);
  };

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check total file size before adding new files
    const currentTotalSize = formData.files.reduce((sum, file) => sum + file.size, 0);
    const newFilesTotalSize = Array.from(files).reduce((sum, file) => sum + file.size, 0);
    
    if (currentTotalSize + newFilesTotalSize > 1024 * 1024 * 1024) {
      alert('The total size of all files cannot exceed 1GB. Please select smaller files or fewer files.');
      return;
    }

    // Check individual file sizes
    const oversizedFiles = Array.from(files).filter(file => file.size > 1024 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Some files are too large. Each file must be under 1GB. Please compress your videos or select smaller files.');
      return;
    }

    // Check file types
    const invalidFiles = Array.from(files).filter(file => {
      const type = file.type.toLowerCase();
      return !type.startsWith('image/') && 
             !type.startsWith('video/') && 
             type !== 'application/pdf' &&
             !file.name.match(/\.(jpg|jpeg|png|gif|mp4|mov|m4v|pdf)$/i);
    });

    if (invalidFiles.length > 0) {
      alert('Some files are not supported. Please only upload images (JPG, PNG, GIF), videos (MP4, MOV, M4V), or PDFs.');
      return;
    }

    // Upload each file to Supabase
    try {
      const uploadedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          const { filePath, error } = await uploadFile(file, 'form-uploads');
          if (error) throw error;
          return file;
        })
      );

      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...uploadedFiles]
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload one or more files. Please try again.');
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setSubmitError('Please complete the captcha verification');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    // Check total file size before submission
    const totalSize = formData.files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 1024 * 1024 * 1024) {
      setSubmitError('The total size of all files exceeds 1GB. Please select smaller files or fewer files.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert files to base64 with progress tracking
      const filesWithBase64 = await Promise.all(
        formData.files.map(async (file) => {
          try {
            // Split large files into smaller chunks
            const chunkSize = 500 * 1024; // Reduced to 500KB chunks
            const chunks = [];
            let offset = 0;

            while (offset < file.size) {
              const chunk = file.slice(offset, offset + chunkSize);
              const base64Chunk = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = (error) => {
                  console.error('FileReader error:', error);
                  reject(new Error(`Unable to process "${file.name}". Please try uploading it again.`));
                };
                reader.readAsDataURL(chunk);
              });
              chunks.push(base64Chunk.split(',')[1]);
              offset += chunkSize;
            }

            return {
              name: file.name,
              type: file.type || 'application/octet-stream',
              chunks: chunks
            };
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            throw new Error(`Unable to process "${file.name}". Please try uploading it again.`);
          }
        })
      );

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'assessment',
          files: filesWithBase64,
          captchaToken
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response error:', errorText);
        if (response.status === 413) {
          throw new Error('The files are too large to upload. Please compress your videos or select smaller files.');
        }
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

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
        console.error('Server response error:', result);
        setSubmitError('We encountered an issue submitting your form. Please try again or contact us if the problem persists.');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'We encountered an issue submitting your form. Please try again or contact us if the problem persists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div ref={successRef} className="bg-green-50 p-8 rounded-lg text-center">
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
          <div ref={errorRef} className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
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
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Upload Photos or Videos (Optional)
            </label>
            <div className="mt-2">
              <FileUpload
                onUploadComplete={(filePath) => {
                  const newFiles = [...formData.files];
                  newFiles.push(new File([], filePath));
                  setFormData(prev => ({ ...prev, files: newFiles }));
                }}
                onUploadError={(error) => {
                  setSubmitError(error.message);
                }}
                accept="image/*,video/*"
                className="mb-4"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Upload photos or videos of your window issues to help us better understand your needs.
            </p>
          </div>

          {/* File List */}
          {formData.files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {formData.files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-700 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              <p className="text-sm text-gray-900 mb-4 leading-relaxed">
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
                      : 'border-gray-300 bg-white text-gray-900 hover:border-red-300'
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
                      : 'border-gray-300 bg-white text-gray-900 hover:border-red-300'
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
              <p className="mt-4 text-sm text-gray-700">
                See our <Link href="/privacy-policy" className="text-[#CD2028] hover:text-[#B01B22]">Privacy Policy</Link> for details on how we handle your information.
              </p>
            </div>
          </div>

          {/* Add captcha before the submit button */}
          <div className="sm:col-span-2">
            <CaptchaWrapper onVerify={setCaptchaToken} />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !captchaToken}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
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
          </div>
        </form>
      </div>

      {/* Add compression progress indicator */}
      {isCompressing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CD2028] mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Compressing Video</h3>
              <p className="text-sm text-gray-500 mb-4">
                This may take a few minutes depending on the video size...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-[#CD2028] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${compressionProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{compressionProgress}% complete</p>
              <button
                onClick={cancelCompression}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
              >
                Cancel Compression
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
