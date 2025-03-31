'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Unsubscribe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('unsubscribes')
        .insert({ email });

      if (error) {
        setStatus('error');
        setMessage('There was an error processing your request. Please try again.');
        console.error('Supabase error:', error);
      } else {
        setStatus('success');
        setMessage('Successfully unsubscribed! You will no longer receive our updates.');
        setEmail('');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Unsubscribe from Updates</h1>
        <p className="text-gray-600 mb-8">
          We're sorry to see you go. Enter your email address below to unsubscribe from our mailing list.
        </p>
        
        <form onSubmit={handleUnsubscribe} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Unsubscribe
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-md ${
              status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 