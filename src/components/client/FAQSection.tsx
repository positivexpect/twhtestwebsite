'use client';

import Image from 'next/image';
import { useState } from 'react';
import { defaultFaqs } from '@/data/faqs';

export interface FAQItem {
  question: string;
  answer: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  };
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQSection({ faqs = defaultFaqs, title, description }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {title && (
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          {description && (
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <span className="ml-6 flex-shrink-0">
                {expandedIndex === index ? (
                  <svg className="h-6 w-6 text-[#CD2028]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-[#CD2028]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </button>
            
            {expandedIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                {faq.media && (
                  <div className="mt-4">
                    {faq.media.type === 'image' ? (
                      <div className="relative h-64 w-full">
                        <Image
                          src={faq.media.url}
                          alt={faq.media.alt || ''}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video">
                        <iframe
                          src={faq.media.url.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/')}
                          title={faq.media.alt || 'FAQ Video'}
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 