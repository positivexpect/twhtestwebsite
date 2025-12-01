'use client';

import Link from 'next/link';

/**
 * Signup Page
 * Currently disabled - use login with operations credentials
 */

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">The Window Hospital</h1>
          <p className="text-gray-600 mt-2">Operations Portal</p>
        </div>

        {/* Message */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900">
            New user signup is disabled. Contact your administrator for access to the operations portal.
          </p>
        </div>

        {/* Back to Login */}
        <Link
          href="/login"
          className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
