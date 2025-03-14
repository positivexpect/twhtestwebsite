export default function PartsServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Window Parts Repair</h1>
          <p className="mt-4 text-xl text-gray-600">Professional repairs for all window components</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Hardware Repair</h2>
              <p className="text-gray-600 mb-6">
                Expert repair and replacement of window hardware to restore proper function and security.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Lock mechanism repair</li>
                <li>✓ Handle replacement</li>
                <li>✓ Hinge repair</li>
                <li>✓ Security hardware upgrades</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Balance Systems</h2>
              <p className="text-gray-600 mb-6">
                Restore smooth window operation with our balance system repair and replacement services.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Spring balance repair</li>
                <li>✓ Weight and pulley systems</li>
                <li>✓ Friction adjustment</li>
                <li>✓ Balance replacement</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Weather Stripping</h2>
              <p className="text-gray-600 mb-6">
                Improve energy efficiency and comfort with proper weather stripping solutions.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Weather strip replacement</li>
                <li>✓ Draft prevention</li>
                <li>✓ Seal restoration</li>
                <li>✓ Energy efficiency improvement</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Maintenance Services</h2>
              <p className="text-gray-600 mb-6">
                Regular maintenance to keep your windows operating smoothly and efficiently.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Track cleaning and repair</li>
                <li>✓ Lubrication service</li>
                <li>✓ Preventive maintenance</li>
                <li>✓ Operation inspection</li>
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
