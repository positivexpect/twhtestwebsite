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
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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
      const { error } = await supabase.from('ugly_windows').insert({
        photo_file_path: photoFilePath,
        contact_info: contactInfo,
      });

      if (error) throw error;

      setSubmitStatus('success');
      setPhotoFilePath(null);
      setContactInfo('');
      setCaptchaToken(null);
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
          bucket="ugly-windows"
          accept="image/*"
          maxSize={10 * 1024 * 1024} // 10MB
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          label="Upload Photo"
          required
        />

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