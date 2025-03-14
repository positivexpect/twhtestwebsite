'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    image: '/images/parts/balance.jpg'
  },
  {
    name: 'Lock Set',
    description: 'Standard cam lock and keeper set',
    price: 25,
    category: 'Hardware',
    image: '/images/parts/lock.jpg'
  },
  {
    name: 'Weather Stripping',
    description: 'Premium weatherseal kit for windows',
    price: 35,
    category: 'Seals',
    image: '/images/parts/weatherstrip.jpg'
  },
  {
    name: 'Window Screen',
    description: 'Standard fiberglass window screen',
    price: 40,
    category: 'Screens',
    image: '/images/parts/screen.jpg'
  },
  {
    name: 'Sash Cord',
    description: 'Replacement cord for sash windows',
    price: 20,
    category: 'Hardware',
    image: '/images/parts/cord.jpg'
  },
  {
    name: 'Glass Unit',
    description: 'Double-pane insulated glass unit',
    price: 200,
    category: 'Glass',
    image: '/images/parts/glass.jpg'
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
    <div id="parts" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Window Parts Catalog
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Browse our selection of high-quality window repair parts
          </p>
        </div>

        <div className="mt-12">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <div className="p-4 flex items-center justify-center">
                    {/* Placeholder for part image */}
                    <div className="text-4xl text-gray-400">🔧</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{part.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{part.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {part.category}
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      ${part.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No parts found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Don't see the part you need? Contact us for assistance
          </p>
          <Link href="/parts">
            {`Parts`}
          </Link>
        </div>
      </div>
    </div>
  );
}
