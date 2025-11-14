import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const NovaSubmissionForm = dynamic(
  () => import('@/components/nova/NovaSubmissionForm'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-8 rounded-lg">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ),
    ssr: false
  }
);

export default function NovaPage() {
  const northernVirginiaAreas = [
    'Manassas',
    'Gainesville',
    'Warrenton',
    'Leesburg',
    'Aldie',
    'Purcellville',
    'Hillsboro',
    'Lovettsville',
    'Middleburg'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left pt-8">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Northern Virginia</span>
                  <span className="block text-[#CD2028]">Window Repair Specialists</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Serving Manassas, Gainesville, Warrenton, Leesburg and the entire Northern Virginia region. Save thousands with expert window repair services.
                </p>
                <p className="mt-2 text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
                  85% of windows can be repaired, not replaced. Most repairs $200-$600 with same-day service available.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#nova-form"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] md:py-4 md:text-lg md:px-10"
                    >
                      Get Free Assessment
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="tel:7035746003"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Call 703-574-6003
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
              Why Northern Virginia Homeowners Choose The Window Hospital
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#CD2028] text-4xl font-bold mb-3">98%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Northern Virginia homeowners trust us for reliable, honest service.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#CD2028] text-4xl font-bold mb-3">Same Day</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service Available</h3>
              <p className="text-gray-600">Most repairs completed within hours. We serve your area quickly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#CD2028] text-4xl font-bold mb-3">50-80%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save vs Replacement</h3>
              <p className="text-gray-600">Expert repairs at fraction of replacement cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Expert Window Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">Available throughout Northern Virginia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#CD2028] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🪟</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Glass Repair & Replacement</h3>
              <p className="text-gray-600 mb-3">Foggy windows, cracked glass, seal failures</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#CD2028] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Window Parts Replacement</h3>
              <p className="text-gray-600 mb-3">Frames, tracks, locks, balance systems, and more</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#CD2028] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🔲</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Screen Services</h3>
              <p className="text-gray-600 mb-3">Screen repair, replacement, and maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              We Serve Northern Virginia
            </h2>
            <p className="mt-4 text-lg text-gray-600">Including these communities and surrounding areas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {northernVirginiaAreas.map((area) => (
              <div key={area} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
                <p className="text-gray-900 font-semibold">{area}</p>
                <p className="text-gray-500 text-sm">Northern Virginia</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="nova-form" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get Your Free Assessment
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tell us about your windows and we'll provide a free, no-obligation assessment
            </p>
          </div>

          <NovaSubmissionForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can my windows be repaired instead of replaced?</h3>
              <p className="text-gray-600">85% of residential windows can be repaired rather than replaced. Our assessment will determine if your windows are candidates for repair.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How long does a typical repair take?</h3>
              <p className="text-gray-600">Most repairs are completed within the same day. Simple repairs like seal replacements might take just a few hours, while more complex work may take longer.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What areas of Northern Virginia do you serve?</h3>
              <p className="text-gray-600">We serve Manassas, Gainesville, Warrenton, Leesburg, and all surrounding areas in Northern Virginia. Contact us for service availability in your specific area.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer free assessments?</h3>
              <p className="text-gray-600">Yes! We provide completely free assessments with no obligation. Fill out our form or call us at 540-603-0088 to schedule yours.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What payment options do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, checks, and financing options. Ask about our flexible payment plans during your assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#CD2028]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Ready to Save on Your Window Repair?
          </h2>
          <p className="text-xl text-white mb-8">
            Get your free Northern Virginia window assessment today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#nova-form"
              className="px-8 py-3 bg-white text-[#CD2028] font-bold rounded-md hover:bg-gray-100 transition text-lg"
            >
              Get Free Assessment
            </a>
            <a
              href="tel:7035746003"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-[#CD2028] transition text-lg"
            >
              Call 703-574-6003
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
