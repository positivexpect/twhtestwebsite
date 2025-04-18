import Link from 'next/link';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-100">
              <p>
                <a 
                  href="tel:5406030088" 
                  className="text-gray-100 hover:text-white transition-colors underline underline-offset-2"
                >
                  (540) 603-0088
                </a>
              </p>
              <p>
                <a 
                  href="https://maps.google.com/?q=10944+Patriot+Highway+Suite+4745+Fredericksburg+VA+22408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 hover:text-white transition-colors underline underline-offset-2"
                >
                  10944 Patriot Highway, Suite 4745<br />
                  Fredericksburg, VA 22408
                </a>
              </p>
              <div className="text-[#E5E7EB]">
                <p>Monday-Thursday: 9am-4pm</p>
                <p>Friday: 9am-1pm</p>
                <p>Saturday-Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/glass-services" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Glass Services
                </Link>
              </li>
              <li>
                <Link href="/parts-services" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Parts Services
                </Link>
              </li>
              <li>
                <Link href="/screen-services" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Screen Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Why Choose Us?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Service Area</h3>
            <p className="text-[#E5E7EB]">
              Serving Fredericksburg, Stafford, Spotsylvania, King George, Caroline, and surrounding areas.
            </p>
            <div className="mt-4 space-y-2">
              <div>
                <Link href="/gallery" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  View Our Work Gallery
                </Link>
              </div>
              <div>
                <Link href="/reviews" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                  Read Customer Reviews
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/franchise"
                className="text-[#FF3040] hover:text-[#FF5060] font-medium underline underline-offset-2"
              >
                Franchise Opportunities Available →
              </Link>
            </div>
            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/people/The-Window-Hospital/100076861613944/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-[#1877F2] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@thewindowhosptial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-[#FF0000] transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/windowhospital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-[#1DA1F2] transition-colors"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/thewindowhospital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-[#E4405F] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center text-[#E5E7EB] text-sm">
            <p>© {new Date().getFullYear()} The Window Hospital Inc. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy-policy" className="text-gray-100 hover:text-white transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
