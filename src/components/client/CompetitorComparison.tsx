import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const CompetitorComparison = () => {
  const competitors = [
    {
      name: 'Window Replacement Companies',
      description: 'Traditional window replacement companies often push full window replacement, which can cost $1,000+ per window.',
      cons: [
        'High cost ($1,000+ per window)',
        'Long installation time',
        'Disruption to home',
        'Waste of perfectly good frames',
        'Often unnecessary for most issues'
      ]
    }
  ];

  const repairBenefits = [
    {
      title: 'Cost Savings',
      description: 'Save 50-80% compared to full window replacement',
      details: 'Most repairs cost $200-$600 vs. $1,000+ for replacement'
    },
    {
      title: 'Quick Service',
      description: 'Most repairs completed in 1-2 hours',
      details: 'No need to wait weeks for replacement windows'
    },
    {
      title: 'Minimal Disruption',
      description: 'No need to remove entire window frames',
      details: 'Keep your existing frames and trim intact'
    },
    {
      title: 'Energy Efficient',
      description: 'Restore original energy efficiency',
      details: 'Fix drafts and condensation issues'
    },
    {
      title: 'Nationwide Parts',
      description: 'Access to window parts nationwide',
      details: 'We can help you find parts even if you\'re not in our service area'
    }
  ];

  return (
    <section className="bg-white py-16" aria-labelledby="comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="comparison-section" className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Window Repair Over Replacement?
          </h2>
          <p className="text-xl text-gray-600">
            85% of windows can be repaired, not replaced. Save thousands with our expert repair services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Repair Benefits */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Window Repair Benefits</h3>
            <div className="space-y-6">
              {repairBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <FaCheck className="h-6 w-6 text-green-500 mt-1" aria-hidden="true" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{benefit.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Comparison */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Window Replacement</h3>
            <div className="space-y-6">
              {competitors.map((competitor, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{competitor.name}</h4>
                  <p className="text-gray-600 mb-4">{competitor.description}</p>
                  <ul className="space-y-3">
                    {competitor.cons.map((con, conIndex) => (
                      <li key={conIndex} className="flex items-start">
                        <FaTimes className="h-6 w-6 text-red-500 mt-1" aria-hidden="true" />
                        <span className="ml-4 text-gray-600">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-600 mb-6">
            Ready to save thousands on your window repairs?
          </p>
          <a
            href="#assessment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Get Your Free Assessment
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparison; 