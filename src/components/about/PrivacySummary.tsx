import Link from 'next/link';

export default function PrivacySummary() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          Your privacy is important to us. Review our full{' '}
          <Link 
            href="/privacy-policy" 
            className="text-[#CD2028] hover:text-[#B01B22] underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
} 