import Image from 'next/image';
import { ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Glass Repair',
    description: 'Fix foggy windows, seal failures, cracks, and chips without full replacement. Save 50-80% compared to new windows.',
    image: '/images/glassicon.jpg',
    features: [
      'Foggy Glass Repair',
      'Seal Failure Fix',
      'Glass Replacement',
      'Energy Efficiency Restoration'
    ],
    savingsRange: '$600-$1,200 per window',
    faqs: [
      {
        question: 'Can I replace just the glass in my window?',
        answer: 'Yes, in 85% of cases, you can replace just the glass for $200-$600, saving thousands over full replacement.'
      },
      {
        question: 'Why do my windows become foggy?',
        answer: 'Foggy windows result from seal failure, letting moisture condense between panes. This is fixable for $200-$600.'
      }
    ]
  },
  {
    title: 'Parts Repair',
    description: 'Restore window functionality with expert parts repair and replacement. No need to replace the entire window.',
    image: '/images/partsicon.jpeg',
    features: [
      'Hardware Replacement',
      'Balance Repair',
      'Lock Mechanism Fix',
      'Smooth Operation Restoration'
    ],
    savingsRange: '$400-$800 per window',
    faqs: [
      {
        question: 'What are muntins/grids?',
        answer: 'Muntins or grids are bars dividing a window into smaller panes. We can repair or replace these while keeping your existing window.'
      },
      {
        question: 'Is it more efficient to replace my window or parts?',
        answer: 'If your frame is good, parts repair at $200-$300 beats $1,000+ replacements in cost and efficiency.'
      }
    ]
  },
  {
    title: 'Screen Services',
    description: 'Professional screen repair and replacement services. Custom-fit screens for any window type.',
    image: '/images/screenicon.jpeg',
    features: [
      'Screen Repair',
      'New Screen Installation',
      'Pet-Resistant Screens',
      'Solar Screen Options'
    ],
    savingsRange: '$50-$200 per screen',
    faqs: [
      {
        question: 'Can screens be repaired instead of replaced?',
        answer: 'Yes, most screen damage can be repaired for $50-$150, compared to $1,000+ for new windows with screens.'
      },
      {
        question: 'Do you offer pet-resistant screen options?',
        answer: 'Yes, we offer heavy-duty pet-resistant screens that are 7x stronger than standard screens.'
      }
    ]
  }
];

export default function Services() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Expert Window Repair Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            85% of windows can be fixed instead of replaced. Text <a href="tel:5406030088" className="text-blue-600 font-semibold hover:text-blue-800">540-603-0088</a> with a picture for a quick quote!
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {services.map((service) => (
              <div key={service.title} className="relative group">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-lg text-gray-500">
                  {service.description}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900">What We Fix:</h4>
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <ArrowRightIcon className="h-4 w-4 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-lg font-semibold text-green-600">
                    Typical Savings: {service.savingsRange}
                  </span>
                </div>
                
                {/* FAQ Section */}
                <div className="mt-6 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
                    Common Questions
                  </h4>
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-gray-900">{faq.question}</h5>
                      <p className="mt-1 text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href="#assessment"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22]"
                  >
                    Get Quote
                    <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-500">
            Not sure what service you need? Text us at <a href="tel:5406030088" className="text-[#CD2028] font-semibold hover:text-[#B01B22]">540-603-0088</a> with a picture for a free assessment.
          </p>
          <div className="mt-8">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] md:py-4 md:text-lg md:px-10"
            >
              Get Free Assessment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
