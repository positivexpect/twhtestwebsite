'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { uploadFile } from '@/utils/fileUpload';
import CaptchaWrapper from '../shared/CaptchaWrapper';

export default function VideoTestimonialForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!videoUrl && !videoFile) || !captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let videoFilePath = null;
      
      // If a file was uploaded, store it
      if (videoFile) {
        const { filePath, error: uploadError } = await uploadFile(videoFile, 'video-testimonials');
        if (uploadError) throw uploadError;
        videoFilePath = filePath;
      }

      const { error } = await supabase.from('video_testimonials').insert({
        video_url: videoUrl,
        video_file_path: videoFilePath,
        contact_info: contactInfo,
        social_media_links: socialLinks.split(',').map(link => link.trim()).filter(Boolean),
      });

      if (error) throw error;

      setSubmitStatus('success');
      setVideoUrl('');
      setVideoFile(null);
      setContactInfo('');
      setSocialLinks('');
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
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
        <input
          type="file"
          id="videoFile"
          accept="video/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {videoFile && (
          <p className="mt-1 text-sm text-gray-500">
            Selected file: {videoFile.name}
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

      <button
        type="submit"
        disabled={isSubmitting || (!videoUrl && !videoFile) || !captchaToken}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (isSubmitting || (!videoUrl && !videoFile) || !captchaToken) ? 'opacity-50 cursor-not-allowed' : ''
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