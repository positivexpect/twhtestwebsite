import { InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Education() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Window Repair Education Center</h1>
          <p className="mt-4 text-xl text-gray-600">Learn why repair is often better than replacement</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Common Misconceptions</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-6 w-6 text-[#CD2028]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Myth: All foggy windows need replacement</h3>
                    <p className="mt-2 text-gray-600">Most foggy windows can be repaired by restoring the seal or replacing just the glass unit, saving you thousands.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-6 w-6 text-[#CD2028]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Myth: Old windows can't be fixed</h3>
                    <p className="mt-2 text-gray-600">Many older windows were built with higher quality materials and can be restored to like-new condition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Benefits of Repair</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Cost Savings</h3>
                    <p className="mt-2 text-gray-600">Save 50-80% compared to full window replacement while achieving the same functionality.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Environmental Impact</h3>
                    <p className="mt-2 text-gray-600">Reduce landfill waste and preserve resources by repairing instead of replacing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">When to Repair vs Replace</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Consider repair when:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Window frame is in good condition</li>
                  <li>Issues are isolated to specific components</li>
                  <li>Glass is foggy or seal is broken</li>
                  <li>Hardware is damaged or not working</li>
                  <li>Screens are torn or damaged</li>
                </ul>
                <p className="text-gray-600 mt-4">Consider replacement when:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Frame is severely rotted or damaged</li>
                  <li>Multiple major components have failed</li>
                  <li>Window is extremely old and inefficient</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#CD2028] mb-4">Maintenance Tips</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Keep your windows in top condition:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Clean tracks and sills regularly</li>
                  <li>Lubricate moving parts annually</li>
                  <li>Check weatherstripping for wear</li>
                  <li>Inspect seals for damage</li>
                  <li>Address issues promptly</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Regular maintenance can prevent costly repairs and extend window life significantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/assessment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Get a Professional Assessment
          </a>
        </div>
      </div>
    </div>
  );
}
