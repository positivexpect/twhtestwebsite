import { InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const commonMisconceptions = [
  {
    myth: "All foggy windows need replacement",
    truth: "Most foggy windows can be repaired by restoring the seal or replacing just the glass unit",
    savings: "Save $800-1,200 per window"
  },
  {
    myth: "Hardware problems mean you need new windows",
    truth: "Window hardware can almost always be repaired or replaced",
    savings: "Save $600-900 per window"
  },
  {
    myth: "Old windows must be replaced",
    truth: "Age alone doesn't determine need for replacement - most issues are repairable",
    savings: "Save thousands on unnecessary replacements"
  }
];

const repairTypes = [
  {
    category: "Glass Services",
    description: "Fix foggy windows, seal failures, and glass issues without full replacement",
    commonIssues: [
      "Foggy glass (seal failure)",
      "Condensation between panes",
      "Cracked or chipped glass",
      "Failed thermal seals"
    ]
  },
  {
    category: "Parts Services",
    description: "Restore window functionality with expert parts repair",
    commonIssues: [
      "Difficult operation",
      "Broken hardware",
      "Balance problems",
      "Lock issues"
    ]
  },
  {
    category: "Screen Services",
    description: "Professional screen repair and replacement",
    commonIssues: [
      "Torn screens",
      "Bent frames",
      "Pet damage",
      "Missing screens"
    ]
  }
];

export default function EducationalContent() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The Truth About Window Repair vs Replacement
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Don't fall for expensive replacement sales tactics. Learn how 85% of window issues can be fixed.
          </p>
        </div>

        {/* Misconceptions Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Common Window Replacement Myths
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {commonMisconceptions.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Myth: {item.myth}</h4>
                    <p className="mt-2 text-gray-600">Truth: {item.truth}</p>
                    <p className="mt-2 text-green-600 font-semibold">{item.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repair Types Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Our Expert Repair Services
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {repairTypes.map((service, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h4 className="text-xl font-semibold text-gray-900">{service.category}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-900">Common Issues We Fix:</h5>
                    <ul className="mt-3 space-y-3">
                      {service.commonIssues.map((issue, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="ml-2 text-gray-600">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Call-to-Action */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Already Have a Replacement Quote?
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Our customers typically save 50-80% by choosing repair over replacement. 
              Get a free assessment and learn about your repair options before making an expensive decision.
            </p>
            <div className="mt-8">
              <a
                href="#assessment"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Your Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
