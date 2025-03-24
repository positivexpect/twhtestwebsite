'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLock } from 'react-icons/fa';

export default function ScoopCentralPage() {
  const stories = {
    oopsies: [
      {
        title: 'The Fingerprint Fiasco',
        customer: 'Richard S.',
        rating: 4.0,
        story: "A rogue smudge slipped through—our bad! Customer wasn't thrilled, and we get it. Now we've got eagle eyes on every pane."
      },
      {
        title: 'The Molding Mix-Up',
        customer: 'Craig S.',
        rating: 5.0,
        story: "Thought we'd save the day with new molding, didn't ask first. He wanted perfection—we missed the mark. Now we're all about options."
      },
      {
        title: 'The Latch Letdown',
        customer: 'Ms A.',
        rating: 4.0,
        story: "Glass? Nailed it. Latch? Forgot it. She called us out, and we deserved it. Checklists are our new BFF."
      }
    ],
    rules: [
      {
        title: 'Karen Rule',
        story: "She wanted a custom window in 60 minutes flat—uh, no. We hustled (call logs prove it), delivered next day, threw in a discount. Still got a stink-eye. Rule: Timelines set, expectations met."
      },
      {
        title: 'Chad Rule',
        story: 'Dude broke his new glass with a golf swing—caught on our cam. Offered a cheap fix, got a "you suck" anyway. Rule: You break it, we don\'t buy it.'
      },
      {
        title: 'Becky Rule',
        story: "Signed off on a tint, then hated it. We swapped it cheap—still mad. Texts show she picked it! Rule: Sign here, no tears later."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/reviews" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            Back to Reviews
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">The Scoop: Where the Tea Gets Spilled</h1>
            <FaLock className="text-gray-400" />
          </div>

          <p className="text-gray-600 mb-12">
            You can't please all the people all the time—P.T. Barnum called it, and we live it. 
            You clicked for the dirt, and we've got you covered. Our 106 reviews average 4.9 stars, 
            but here's the fun stuff: where we goofed, learned, and dealt with some wild cards. 
            Grab a snack—this gets good.
          </p>

          {/* We'll Take That L Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">We'll Take That L: Our Oopsies</h2>
            <p className="text-gray-600 mb-6">
              Nobody's flawless, and we've taken a few L's. Here's what happened and how we bounced back.
            </p>
            <div className="grid gap-6">
              {stories.oopsies.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{story.title}</h3>
                    <span className="text-sm text-gray-500">★ {story.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{story.customer}</p>
                  <p className="text-gray-600">{story.story}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* The Rulebook Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Rulebook: Tales of the Tough Nuts</h2>
            <p className="text-gray-600 mb-6">
              Some folks are a special breed—here's where they inspired our rules. 
              Virginia's cool with us having receipts (one-party consent state!), 
              but we'll keep it chill and just tell the story.
            </p>
            <div className="grid gap-6">
              {stories.rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{rule.title}</h3>
                  <p className="text-gray-600">{rule.story}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h2>
            <p className="text-gray-600">
              We're not hiding the mess—it's how we grow. 95% of our reviews are 5 stars, 
              but these stories? They're the spice. You'll see us own it, fix it, and sometimes just laugh it off.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 