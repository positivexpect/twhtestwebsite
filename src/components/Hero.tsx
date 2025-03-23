import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center lg:text-left pt-8">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Stop Overpaying for</span>
                <span className="block text-[#CD2028]">Window Replacement</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                85% of windows can be repaired, not replaced. Save thousands with our expert window repair services in Fredericksburg, VA.
              </p>
              <p className="mt-2 text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
                Text <a href="tel:5406030088" className="text-blue-600 font-semibold hover:text-blue-800">540-603-0088</a> with a picture of your window for a quick quote!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] md:py-4 md:text-lg md:px-10"
                  >
                    Get Professional Assessment
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#savings-calculator"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Calculate Savings
                  </a>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>✓ Most repairs $200-$600</p>
                <p>✓ Same day service available</p>
                <p>✓ Serving Fredericksburg & surrounding areas</p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {/* Background decorative element */}
        <div className="absolute inset-0 bg-blue-50/80 transform -skew-y-6 translate-y-20 rounded-lg lg:rounded-l-lg z-0"></div>
        
        {/* Window images container */}
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden rounded-lg lg:rounded-l-lg shadow-2xl z-10">
          {/* Base image (clear window) */}
          <div className="absolute inset-0 w-[110%] h-[113%] -top-[8%] -right-[10%] -left-[7%] -bottom-[5%]">
            <Image
              src="/images/clearglass.jpg"
              alt="Clear window showing beautiful mountain view"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Overlay image (foggy window) that disappears on hover */}
          <div className="absolute inset-0 w-[110%] h-[113%] -top-[8%] -right-[10%] -left-[7%] -bottom-[5%] transition-opacity duration-1000 ease-in-out hover:opacity-0">
            <Image
              src="/images/foggy.jpg"
              alt="Foggy window with condensation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Subtle overlay to integrate with site colors */}
          <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
