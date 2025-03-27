'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { uploadFile, getFileUrl } from '@/utils/fileUpload';
import Image from 'next/image';
import CaptchaWrapper from '../shared/CaptchaWrapper';

interface UglyWindow {
  id: string;
  photo_file_path: string;
  contact_info: string;
  votes: number;
  status: string;
}

export default function UglyWindowForm() {
  const [file, setFile] = useState<File | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissions, setSubmissions] = useState<UglyWindow[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Upload file to Supabase storage
      const { filePath, error: uploadError } = await uploadFile(file, 'ugly-windows');
      if (uploadError) throw uploadError;

      // Insert record into database
      const { error: dbError } = await supabase.from('ugly_windows').insert({
        photo_file_path: filePath,
        contact_info: contactInfo,
      });

      if (dbError) throw dbError;

      setSubmitStatus('success');
      setFile(null);
      setContactInfo('');
      setCaptchaToken(null);
      fetchSubmissions(); // Refresh the list
    } catch (error) {
      console.error('Error submitting photo:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (id: string) => {
    if (!captchaToken) {
      alert('Please complete the captcha before voting');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_votes', { row_id: id });
      if (error) throw error;
      setCaptchaToken(null); // Reset captcha after voting
      fetchSubmissions(); // Refresh the list
    } catch (error) {
      console.error('Error voting:', error);
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
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {file && (
            <p className="mt-1 text-sm text-gray-500">
              Selected file: {file.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
            Contact Information
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Name, Email, Phone"
          />
        </div>

        <CaptchaWrapper onVerify={setCaptchaToken} />

        <button
          type="submit"
          disabled={isSubmitting || totalSubmissions >= 100 || !captchaToken}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            (isSubmitting || totalSubmissions >= 100 || !captchaToken) ? 'opacity-50 cursor-not-allowed' : ''
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

      <div className="mt-8">
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
    </div>
  );
} 