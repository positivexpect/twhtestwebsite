'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type WindowPart = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

const WINDOW_PARTS: WindowPart[] = [
  {
    name: 'Window Balance',
    description: 'Replacement balance system for double-hung windows',
    price: 45,
    category: 'Hardware',
    image: '/images/parts/window-balance.jpg'
  },
  {
    name: 'Lock Set',
    description: 'Standard cam lock and keeper set',
    price: 25,
    category: 'Hardware',
    image: '/images/parts/lock-set.jpeg'
  },
  {
    name: 'Weather Stripping',
    description: 'Premium weatherseal kit for windows',
    price: 35,
    category: 'Seals',
    image: '/images/parts/weatherstrip.jpeg'
  },
  {
    name: 'Window Screen',
    description: 'Standard fiberglass window screen',
    price: 40,
    category: 'Screens',
    image: '/images/parts/window-screen.jpeg'
  },
  {
    name: 'Sash Cord',
    description: 'Replacement cord for sash windows',
    price: 20,
    category: 'Hardware',
    image: '/images/parts/sashcord.jpeg'
  },
  {
    name: 'Glass Unit',
    description: 'Double-pane insulated glass unit',
    price: 200,
    category: 'Glass',
    image: '/images/parts/glass.jpeg'
  }
];

const CATEGORIES = Array.from(new Set(WINDOW_PARTS.map(part => part.category)));

export default function Parts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParts = WINDOW_PARTS.filter(part => {
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Window Parts Catalog</h2>
          <p className="mt-4 text-xl text-gray-600">
            Browse our selection of high-quality window repair parts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredParts.map((part, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <Image
                    src={part.image}
                    alt={part.name}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{part.name}</h3>
                <p className="text-gray-600 mt-2">{part.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{part.category}</span>
                  <span className="text-lg font-semibold text-[#CD2028]">${part.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="https://windowhospital.forpartsnow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22]"
          >
            Shop Parts Now
          </Link>
          <p className="mt-4 text-gray-600">
            <Link
              href="https://windowhospital.forpartsnow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CD2028] hover:text-[#B01B22]"
            >
              Check out our full store
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
