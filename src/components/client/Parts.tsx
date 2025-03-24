'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const parts = [
  {
    id: 1,
    title: 'Window Balance',
    description: 'Essential for smooth window operation, our balances ensure your windows stay in place when opened.',
    image: '/images/parts/window-balance.jpg'
  },
  {
    id: 2,
    title: 'Lock Sets',
    description: 'High-quality window locks for security and proper seal maintenance.',
    image: '/images/parts/lock-set.jpeg'
  },
  {
    id: 3,
    title: 'Weather Stripping',
    description: 'Keep drafts out and energy efficiency in with our professional weather stripping.',
    image: '/images/parts/weatherstrip.jpeg'
  },
  {
    id: 4,
    title: 'Window Screens',
    description: 'Custom-fit screens for any window type, providing ventilation while keeping insects out.',
    image: '/images/parts/window-screen.jpeg'
  },
  {
    id: 5,
    title: 'Sash Cords',
    description: 'Restore the functionality of traditional windows with our durable sash cords.',
    image: '/images/parts/sashcord.jpeg'
  },
  {
    id: 6,
    title: 'Glass Units',
    description: 'From single pane to high-efficiency double pane units, we have the right glass for your needs.',
    image: '/images/parts/glass.jpeg'
  }
];

export default function Parts() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Window Parts We Replace</h2>
          <p className="mt-4 text-xl text-gray-600">
            Quality replacement parts to restore your windows to perfect working condition
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part, index) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={part.image}
                  alt={part.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{part.title}</h3>
                <p className="text-gray-600">{part.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Parts Store Link */}
        <div className="mt-12 text-center">
          <Link
            href="https://windowhospital.forpartsnow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]"
          >
            Visit Our Parts Store
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <p className="mt-4 text-gray-600">
            Browse our complete catalog of window parts and hardware
          </p>
        </div>
      </div>
    </div>
  );
}
