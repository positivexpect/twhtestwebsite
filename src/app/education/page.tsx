import { InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import BlogSection from '@/components/about/BlogSection';
import Link from 'next/link';

export default function Education() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
            Window Education Center
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about window repair vs replacement, cost comparisons, and maintenance tips
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight mb-8">
              Repair vs Replace Guide
            </h2>
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">See Our Process in Action</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/E0SNpWYY5Gw"
                      title="Window Glass Manufacturing Process"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Manufacturing Process</h3>
                    <p className="text-gray-600">Watch how we manufacture custom dual-pane glass units in our facility, ensuring perfect fits and superior quality.</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/LK4RVyhkfwk"
                      title="Window Repair Demonstration"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Window Repair in Action</h3>
                    <p className="text-gray-600">Watch a quick demonstration of our window repair process and see how we can fix your windows without replacement.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight mb-8">
              Cost Comparison
            </h2>
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
          </section>
        </div>

        <BlogSection />

        {/* Call to Action Section */}
        <section className="mt-16 bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight mb-4">
            Ready to Save on Your Window Repairs?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Now that you understand the benefits of window repair, let our experts assess your windows and provide a customized solution.
          </p>
          <Link
            href="/#assessment"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Get Your Free Assessment
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
