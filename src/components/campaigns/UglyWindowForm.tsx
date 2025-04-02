'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { getFileUrl } from '@/utils/fileUpload';
import Image from 'next/image';
import CaptchaWrapper from '../shared/CaptchaWrapper';
import FileUpload from '../shared/FileUpload';

interface UglyWindow {
  id: string;
  photo_file_path: string;
  contact_info: string;
  votes: number;
  status: string;
}

export default function UglyWindowForm() {
  const [photoFilePath, setPhotoFilePath] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissions, setSubmissions] = useState<UglyWindow[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('ugly_windows')
      .select('*')
      .order('submission_date', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      return;
    }

    setSubmissions(data || []);
    setTotalSubmissions(data?.length || 0);
  };

  const handleUploadComplete = (filePath: string) => {
    setPhotoFilePath(filePath);
    setErrorMessage('');
  };

  const handleUploadError = (error: string) => {
    setErrorMessage(error);
    setPhotoFilePath(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFilePath || !captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('form_submissions').insert({
        form_type: 'ugly_window_contest',
        name,
        email,
        phone,
        address: Object.values(address).some(val => val) ? address : null,
        form_data: {
          social_media_links: socialLinks.split(',').map(link => link.trim()).filter(Boolean)
        },
        files: photoFilePath ? [{
          path: photoFilePath,
          bucket: 'form-uploads'
        }] : [],
        status: 'pending'
      });

      if (error) throw error;

      setSubmitStatus('success');
      setPhotoFilePath(null);
      setName('');
      setEmail('');
      setPhone('');
      setAddress({
        street: '',
        city: '',
        state: '',
        zipCode: ''
      });
      setCaptchaToken(null);
      setSocialLinks('');
      fetchSubmissions(); // Refresh the list
    } catch (error) {
      console.error('Error submitting photo:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (id: string) => {
    if (!captchaToken) {
      setErrorMessage('Please complete the captcha before voting');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_votes', { row_id: id });
      if (error) throw error;
      setCaptchaToken(null); // Reset captcha after voting
      fetchSubmissions(); // Refresh the list
    } catch (error) {
      console.error('Error voting:', error);
      setErrorMessage('Failed to vote. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Contest Progress</h3>
        <p className="text-blue-600">
          Current Submissions: {totalSubmissions}/100
          {totalSubmissions >= 100 && (
            <span className="text-green-600 ml-2">(Contest Full!)</span>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FileUpload
          onUploadComplete={(url, file) => {
            setPhotoFilePath(url);
            setErrorMessage('');
          }}
          onUploadError={(error) => {
            setErrorMessage(error.message);
            setPhotoFilePath(null);
          }}
          accept="image/*"
          maxSize={20 * 1024 * 1024} // 20MB for images
          multiple={false}
          formType="ugly_window_contest"
          className="mb-4"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Address (Optional)</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <CaptchaWrapper onVerify={setCaptchaToken} />

        {errorMessage && (
          <div className="text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || totalSubmissions >= 100 || !captchaToken || !photoFilePath}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            (isSubmitting || totalSubmissions >= 100 || !captchaToken || !photoFilePath) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Photo'}
        </button>

        {submitStatus === 'success' && (
          <div className="text-green-600 text-center">
            Thank you for your submission! We'll notify you if you win.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-red-600 text-center">
            There was an error submitting your photo. Please try again.
          </div>
        )}
      </form>

      {submissions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Current Submissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={getFileUrl('ugly-windows', submission.photo_file_path)}
                    alt="Ugly window submission"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Votes: {submission.votes}</span>
                    <button
                      onClick={() => handleVote(submission.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Vote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 