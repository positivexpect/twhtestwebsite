'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import CaptchaWrapper from '../shared/CaptchaWrapper';
import FileUpload from '../shared/FileUpload';

export default function VideoTestimonialForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFilePath, setVideoFilePath] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [socialLinks, setSocialLinks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!videoUrl && !videoFilePath) || !captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('form_submissions').insert({
        form_type: 'video_testimonial',
        name,
        email,
        phone,
        address: Object.values(address).some(val => val) ? address : null,
        form_data: {
          video_url: videoUrl,
          social_media_links: socialLinks.split(',').map(link => link.trim()).filter(Boolean)
        },
        files: videoFilePath ? [{
          path: videoFilePath,
          bucket: 'form-uploads'
        }] : [],
        status: 'pending'
      });

      if (error) throw error;

      setSubmitStatus('success');
      setVideoUrl('');
      setVideoFilePath(null);
      setName('');
      setEmail('');
      setPhone('');
      setAddress({
        street: '',
        city: '',
        state: '',
        zipCode: ''
      });
      setSocialLinks('');
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video Upload or URL
          </label>
          <div className="mt-1 space-y-4">
            <FileUpload
              onUploadComplete={(url, file) => {
                setVideoFilePath(url);
                setErrorMessage('');
              }}
              onUploadError={(error) => {
                setErrorMessage(error.message);
                setVideoFilePath(null);
              }}
              accept="video/*"
              maxSize={500 * 1024 * 1024} // 500MB for video files
              multiple={false}
              formType="video_testimonial"
              className="mb-4"
            />
            <div className="text-center text-sm text-gray-500">
              - OR -
            </div>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Address (Optional)
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            placeholder="Street Address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <div className="grid grid-cols-6 gap-4">
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="City"
              className="col-span-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              placeholder="State"
              className="col-span-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              placeholder="ZIP Code"
              className="col-span-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Media Links (Optional)
          </label>
          <input
            type="text"
            value={socialLinks}
            onChange={(e) => setSocialLinks(e.target.value)}
            placeholder="Enter links separated by commas"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}

      {submitStatus === 'success' && (
        <div className="text-green-600 text-sm">
          Thank you for submitting your video testimonial! We'll review it shortly.
        </div>
      )}

      <div className="space-y-4">
        <CaptchaWrapper onVerify={setCaptchaToken} />
        
        <button
          type="submit"
          disabled={isSubmitting || (!videoUrl && !videoFilePath) || !captchaToken}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isSubmitting || (!videoUrl && !videoFilePath) || !captchaToken
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
} 