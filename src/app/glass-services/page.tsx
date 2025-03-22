'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GlassServices() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Don't Replace Your Windows.</span>
              <span className="block text-[#CD2028]">Repair Them Today.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Save 50-70% with our same-day glass repair services. We manufacture custom dual-pane glass units in-house.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="#get-quote"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] md:py-4 md:text-lg md:px-10"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Same Day Service Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Same-Day Dual-Pane Glass Manufacturing
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Bring your removable window sash to our facility by 10 AM, and we'll have your custom-made replacement ready the same day.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CD2028] text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">Fast Turnaround</h3>
                </div>
                <p className="text-gray-500">
                  No need to wait weeks for replacement windows. Our in-house manufacturing means you get your repaired windows back the same day.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CD2028] text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">Save 50-70%</h3>
                </div>
                <p className="text-gray-500">
                  Why pay thousands for new windows when you can repair your existing ones for a fraction of the cost?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Premium Manufacturing Process</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We use state-of-the-art equipment and techniques to ensure your repaired windows are as good as new.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dl className="space-y-6">
                  {[
                    {
                      title: "Precise Measurements",
                      description: "Every piece of glass is custom-measured to ensure a perfect fit in your existing frame."
                    },
                    {
                      title: "Industrial Glass Processing",
                      description: "Our industrial facility features precision cutting equipment and a specialized glass washing machine for pristine results."
                    },
                    {
                      title: "Premium Materials",
                      description: "Choose between low-profile aluminum or Super Spacer technology, with optional decorative grids between panes."
                    },
                    {
                      title: "Professional Sealing",
                      description: "We use a hot melt butyl process to create a durable, long-lasting seal for your insulated glass unit."
                    }
                  ].map((item) => (
                    <div key={item.title} className="relative">
                      <dt>
                        <p className="text-lg leading-6 font-medium text-gray-900">{item.title}</p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Glass Repair?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Maintains original frame and appearance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Significantly lower cost than replacement</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Same-day service available</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-600">Environmentally friendly solution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="get-quote" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Need a Fast Quote?</h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Text a photo of your damaged window to:
                  <br />
                  <a href="tel:540-603-0088" className="text-[#CD2028] font-bold text-xl hover:text-[#B01B22] transition-colors">
                    (540) 603-0088
                  </a>
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Our Facility</h3>
                  <p className="text-gray-600">10944 Patriot Highway, Suite 4745<br />Fredericksburg, VA 22408</p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span>
                    <br />
                    Monday-Thursday: 9am-4pm
                    <br />
                    Friday: 9am-1pm
                  </p>
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="https://maps.google.com/?q=10944+Patriot+Highway+Suite+4745+Fredericksburg+VA+22408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] transition-colors"
                  >
                    Get Directions
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
