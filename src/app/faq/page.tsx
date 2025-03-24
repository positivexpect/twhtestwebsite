'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { faqData } from './faqData';
import AssessmentForm from '@/components/client/AssessmentForm';
import FAQSection from '@/components/client/FAQSection';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FAQSection
          faqs={faqData}
          title="Frequently Asked Questions"
          description="85% of windows don't need replacing—save big with repairs at The Window Hospital Inc.!"
        />

        <section className="mt-16">
          <AssessmentForm />
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