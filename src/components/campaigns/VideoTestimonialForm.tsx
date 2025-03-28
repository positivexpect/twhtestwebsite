'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import CaptchaWrapper from '../shared/CaptchaWrapper';
import FileUpload from '../shared/FileUpload';

export default function VideoTestimonialForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFilePath, setVideoFilePath] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleUploadComplete = (filePath: string) => {
    setVideoFilePath(filePath);
    setErrorMessage('');
  };

  const handleUploadError = (error: string) => {
    setErrorMessage(error);
    setVideoFilePath(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!videoUrl && !videoFilePath) || !captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('video_testimonials').insert({
        video_url: videoUrl,
        video_file_path: videoFilePath,
        contact_info: contactInfo,
        social_media_links: socialLinks.split(',').map(link => link.trim()).filter(Boolean),
      });

      if (error) throw error;

      setSubmitStatus('success');
      setVideoUrl('');
      setVideoFilePath(null);
      setContactInfo('');
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
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
          Video URL (YouTube, TikTok, or Instagram)
        </label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Or upload your video file directly:
        </p>
        
        <FileUpload
          bucket="video-testimonials"
          accept="video/*"
          maxSize={500 * 1024 * 1024} // 500MB
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          label="Upload Video"
          required={!videoUrl}
        />
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

      <div>
        <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700">
          Social Media Links (comma-separated)
        </label>
        <input
          type="text"
          id="socialLinks"
          value={socialLinks}
          onChange={(e) => setSocialLinks(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://instagram.com/..., https://facebook.com/..."
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
        disabled={isSubmitting || (!videoUrl && !videoFilePath) || !captchaToken}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (isSubmitting || (!videoUrl && !videoFilePath) || !captchaToken) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
      </button>

      {submitStatus === 'success' && (
        <div className="text-green-600 text-center">
          Thank you for your submission! We'll review it and get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-red-600 text-center">
          There was an error submitting your testimonial. Please try again.
        </div>
      )}
    </form>
  );
} 