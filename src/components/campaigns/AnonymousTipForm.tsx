'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import CaptchaWrapper from '../shared/CaptchaWrapper';

export default function AnonymousTipForm() {
  const [personInfo, setPersonInfo] = useState('');
  const [tipperInfo, setTipperInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('anonymous_tips').insert({
        person_in_need_info: personInfo,
        tipper_info: tipperInfo || null,
      });

      if (error) throw error;

      setSubmitStatus('success');
      setPersonInfo('');
      setTipperInfo('');
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error submitting tip:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="personInfo" className="block text-sm font-medium text-gray-700">
          Information About Person in Need
        </label>
        <textarea
          id="personInfo"
          value={personInfo}
          onChange={(e) => setPersonInfo(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Please provide details about the person in need, including their situation and location if possible."
        />
      </div>

      <div>
        <label htmlFor="tipperInfo" className="block text-sm font-medium text-gray-700">
          Your Contact Information (Optional)
        </label>
        <input
          type="text"
          id="tipperInfo"
          value={tipperInfo}
          onChange={(e) => setTipperInfo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Name, Email, Phone (optional)"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your information is optional and will be kept confidential
        </p>
      </div>

      <CaptchaWrapper onVerify={setCaptchaToken} />

      <button
        type="submit"
        disabled={isSubmitting || !captchaToken}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (isSubmitting || !captchaToken) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Tip'}
      </button>

      {submitStatus === 'success' && (
        <div className="text-green-600 text-center">
          Thank you for your tip. We'll review it and take appropriate action.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-red-600 text-center">
          There was an error submitting your tip. Please try again.
        </div>
      )}
    </form>
  );
} 