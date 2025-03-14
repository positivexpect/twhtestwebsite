export default function ScreenServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Screen Repair Services</h1>
          <p className="mt-4 text-xl text-gray-600">Expert window screen repair and replacement solutions</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Screen Repair</h2>
              <p className="text-gray-600 mb-6">
                Professional repair services to fix tears, holes, and damaged screens without full replacement.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Patch repairs</li>
                <li>✓ Frame straightening</li>
                <li>✓ Corner repair</li>
                <li>✓ Spline replacement</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Screen Replacement</h2>
              <p className="text-gray-600 mb-6">
                Complete screen replacement services with high-quality materials and expert installation.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Full screen replacement</li>
                <li>✓ Custom sizing</li>
                <li>✓ Material options</li>
                <li>✓ Frame replacement</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Pet-Resistant Screens</h2>
              <p className="text-gray-600 mb-6">
                Durable screen solutions designed to withstand damage from pets while maintaining visibility.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Heavy-duty mesh</li>
                <li>✓ Reinforced edges</li>
                <li>✓ Pet-proof installation</li>
                <li>✓ Scratch-resistant material</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Solar Screens</h2>
              <p className="text-gray-600 mb-6">
                Energy-efficient screen solutions to reduce heat and protect your interior.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ UV protection</li>
                <li>✓ Heat reduction</li>
                <li>✓ Energy savings</li>
                <li>✓ Glare reduction</li>
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
