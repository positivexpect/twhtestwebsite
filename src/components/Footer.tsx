import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2>
          <Link href="/footer">
            Contact Us
          </Link>
        </h2>
        <p className="mt-4">
          Do you agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088? 
          Message frequency varies and may include communications regarding inquiries and services. 
          We do not sell your information. Reply STOP to unsubscribe.
        </p>
        <div className="mt-4 space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="textOptIn" value="yes" />
            <span>Yes, I agree to receive text messages.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="textOptIn" value="no" />
            <span>No, I do not want to receive text messages.</span>
          </label>
        </div>
        <p className="mt-4">
          See our <Link href="/privacy-policy">Privacy Policy</Link> for details on how we handle your information.
        </p>
      </div>
    </footer>
  );
}
