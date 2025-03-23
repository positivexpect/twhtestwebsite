'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { faqSchema } from './faqData';
import ContactConsent from '../components/ContactConsent';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h1>
        
        <p className="text-xl text-gray-700 mb-12">
          85% of windows don't need replacing—save big with repairs at The Window Hospital Inc.!
        </p>

        <div className="space-y-8">
          {faqSchema.mainEntity.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {faq.name}
              </h2>
              <p className="text-gray-600">
                {faq.acceptedAnswer.text}
              </p>
            </motion.div>
          ))}
        </div>

        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get Your Free Assessment
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ContactConsent 
              onSubmit={async (data) => {
                // Here you would handle the form submission
                console.log('Form submitted:', data);
                // TODO: Add your form submission logic here
                alert('Thank you for your submission! We will contact you shortly.');
              }}
            />
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p className="mt-2">10944 Patriot Highway, Suite 4745<br />Fredericksburg, VA 22408</p>
            <p className="mt-1">Open Mon-Thurs 9am-4pm, Fri 9am-1pm</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQPage; 