import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const services = [
  {
    id: 1,
    image: '/images/glassicon.jpg',
    title: 'Glass Repair & Replacement',
    description: 'Expert glass repair and replacement services for all window types.',
    link: '/services/glass',
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
    id: 2,
    image: '/images/partsicon.jpeg',
    title: 'Parts Replacement',
    description: 'Quality replacement parts to keep your windows functioning properly.',
    link: '/services/parts',
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
    id: 3,
    image: '/images/screenicon.jpeg',
    title: 'Screen Services',
    description: 'Professional window screen repair and replacement.',
    link: '/services/screens',
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
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Professional window repair services for residential and commercial properties
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link 
              key={service.id}
              href={service.link}
              className="relative block group"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 transition-opacity duration-300">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                  className="transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-base text-gray-500">{service.description}</p>
              </div>
            </Link>
          ))}
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
