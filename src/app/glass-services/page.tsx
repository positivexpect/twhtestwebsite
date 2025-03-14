import Image from 'next/image';

export default function GlassServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Glass Repair Services</h1>
          <p className="mt-4 text-xl text-gray-600">Expert solutions for all your window glass issues</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Foggy Glass Solutions</h2>
              <p className="text-gray-600 mb-6">
                Don't replace your entire window due to foggy glass. Our expert technicians can repair
                seal failures and restore clarity to your windows at a fraction of replacement cost.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Seal repair and replacement</li>
                <li>✓ Moisture removal</li>
                <li>✓ Defogging services</li>
                <li>✓ UV protection restoration</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Glass Replacement</h2>
              <p className="text-gray-600 mb-6">
                When repair isn't possible, we offer targeted glass replacement without replacing the
                entire window unit, saving you significant costs.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Single pane replacement</li>
                <li>✓ Double pane unit replacement</li>
                <li>✓ Safety glass installation</li>
                <li>✓ Energy-efficient glass options</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Scratch Removal</h2>
              <p className="text-gray-600 mb-6">
                Professional scratch removal services to restore clarity and appearance to your windows.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Surface scratch repair</li>
                <li>✓ Glass polishing</li>
                <li>✓ Clarity restoration</li>
                <li>✓ Protection application</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Emergency Services</h2>
              <p className="text-gray-600 mb-6">
                Quick response for urgent glass issues to secure and protect your property.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ 24/7 emergency response</li>
                <li>✓ Temporary securing solutions</li>
                <li>✓ Same-day service available</li>
                <li>✓ Insurance claim assistance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/assessment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Schedule a Free Assessment
          </a>
        </div>
      </div>
    </div>
  );
}
