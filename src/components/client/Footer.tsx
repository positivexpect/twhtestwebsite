'use client';

import ChatBot from './ChatBot';
import Link from 'next/link';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <a 
              href="tel:540-603-0088" 
              className="text-lg font-medium text-[#CD2028] hover:text-[#B01B22] transition-colors"
            >
              (540) 603-0088
            </a>
            <a 
              href="https://maps.google.com/?q=10944+Patriot+Highway+Suite+4745+Fredericksburg+VA+22408"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-gray-600 hover:text-[#CD2028] transition-colors"
            >
              10944 Patriot Highway, Suite 4745, Fredericksburg, VA 22408
            </a>
            <p className="mt-1">Open Mon-Thurs 9am-4pm, Fri 9am-1pm</p>
            
            <div className="mt-4">
              <Link
                href="/franchise"
                className="text-[#CD2028] hover:text-[#B01B22] font-medium"
              >
                Franchise Opportunities Available →
              </Link>
            </div>

            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/people/The-Window-Hospital/100076861613944/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#1877F2] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@thewindowhosptial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF0000] transition-colors"
                aria-label="Follow us on YouTube"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </>
  );
} 