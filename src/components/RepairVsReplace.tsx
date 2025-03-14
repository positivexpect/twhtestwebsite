import { CheckCircleIcon } from '@heroicons/react/24/solid';

const comparisonData = [
  {
    repair: {
      benefit: "Average Cost: $200-600 per window",
      detail: "Fix only what's needed, preserve original materials"
    },
    replace: {
      drawback: "Average Cost: $1,000-3,000+ per window",
      detail: "Complete removal and replacement required"
    }
  },
  {
    repair: {
      benefit: "Same-Day Service Available",
      detail: "Most repairs completed within hours"
    },
    replace: {
      drawback: "3-6 Weeks Average Wait Time",
      detail: "Manufacturing and installation delays"
    }
  },
  {
    repair: {
      benefit: "Preserves Home's Character",
      detail: "Maintains original architectural features"
    },
    replace: {
      drawback: "Changes Home's Appearance",
      detail: "New windows may not match home's style"
    }
  },
  {
    repair: {
      benefit: "Environmentally Friendly",
      detail: "Reduces landfill waste and carbon footprint"
    },
    replace: {
      drawback: "Environmental Impact",
      detail: "Generates significant waste and emissions"
    }
  }
];

export default function RepairVsReplace() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Repair vs. Replace: The Truth About Window Costs
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Don't fall for the replacement sales pitch. Learn why repair is often the smarter choice.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <h3 className="ml-3 text-xl font-medium text-gray-900">
                    Window Repair Benefits
                  </h3>
                </div>
                <div className="mt-8 space-y-6">
                  {comparisonData.map((item, index) => (
                    <div key={`repair-${index}`} className="flex">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-lg font-medium text-gray-900">{item.repair.benefit}</p>
                        <p className="mt-2 text-gray-500">{item.repair.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                  </svg>
                  <h3 className="ml-3 text-xl font-medium text-gray-900">
                    Replacement Drawbacks
                  </h3>
                </div>
                <div className="mt-8 space-y-6">
                  {comparisonData.map((item, index) => (
                    <div key={`replace-${index}`} className="flex">
                      <svg className="h-6 w-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-lg font-medium text-gray-900">{item.replace.drawback}</p>
                        <p className="mt-2 text-gray-500">{item.replace.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#assessment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Your Free Window Assessment
          </a>
        </div>
      </div>
    </div>
  );
}
