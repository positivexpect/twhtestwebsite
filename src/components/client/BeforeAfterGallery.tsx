'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterImage {
  id: string;
  title: string;
  before: string;
  after: string;
  description: string;
}

interface SingleImage {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface BeforeAfterGalleryProps {
  previewMode?: boolean;
}

export default function BeforeAfterGallery({ previewMode = false }: BeforeAfterGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<BeforeAfterImage | SingleImage | null>(null);
  const [selectedType, setSelectedType] = useState<'pair' | 'single' | null>(null);

  const beforeAfterImages: BeforeAfterImage[] = [
    {
      id: '1',
      title: 'Door Glass Repair',
      before: '/images/before-after/foggydoor.jpg',
      after: '/images/before-after/cleardoor.jpg',
      description: 'Restored clarity to a foggy door glass panel'
    },
    {
      id: '2',
      title: 'Window Seal Repair',
      before: '/images/before-after/win2fog-before.JPG',
      after: '/images/before-after/win2fog-after.JPG',
      description: 'Fixed seal failure in a double-pane window'
    },
    {
      id: '3',
      title: 'Glass Panel Replacement',
      before: '/images/before-after/win3-before.jpg',
      after: '/images/before-after/win3-after.jpg',
      description: 'Replaced damaged glass panel with new safety glass'
    }
  ];

  const singleImages: SingleImage[] = [
    {
      id: 's1',
      title: 'Butyl Snake Issue',
      image: '/images/before-after/butylsnake.jpg',
      description: 'Do you have the dreaded butyl snake in your window? We can fix that!'
    },
    {
      id: 's2',
      title: 'Water Between Glass',
      image: '/images/before-after/waterholder.jpg',
      description: "Water shouldn't stay between your glass like this"
    },
    {
      id: 's3',
      title: 'Window Springs',
      image: '/images/before-after/springs.JPG',
      description: 'Window Springs - we can fix these windows'
    },
    {
      id: 's4',
      title: 'Balance System',
      image: '/images/before-after/spiralandshoe.JPG',
      description: 'Spiral balance and window balance shoe - we can fix that too'
    },
    {
      id: 's5',
      title: 'Rock Impact Damage',
      image: '/images/before-after/rockhit.JPG',
      description: 'Rock hits your glass? We got you covered'
    },
    {
      id: 's6',
      title: 'Obscure Glass Options',
      image: '/images/before-after/obscureglass.JPG',
      description: 'Need your glass obscured and don\'t want to deal with film or cling? We offer real obscure glass solutions'
    },
    {
      id: 's7',
      title: 'Low-E Failure',
      image: '/images/before-after/lowefailure.JPG',
      description: 'High-end window with high performance Low-E showing surface rust from improper edge deletion'
    },
    {
      id: 's9',
      title: 'Custom Shapes',
      image: '/images/before-after/customshapes.jpg',
      description: 'Custom shapes? We got you covered'
    },
    {
      id: 's10',
      title: 'Clear View',
      image: '/images/before-after/woodwindowhummingbird.JPG',
      description: 'Now you can see the hummingbirds clearly'
    },
    {
      id: 's11',
      title: 'Beyond Repair',
      image: '/images/before-after/thisthethe15percentthatwecantsave.JPG',
      description: 'This is one of the windows in the 15% that we can\'t save. If yours looks better than this, we probably can save it!'
    },
    {
      id: 's12',
      title: 'Quality Work',
      image: '/images/before-after/canutell.JPG',
      description: 'One out of four is done - can you tell which one?'
    },
    {
      id: 's13',
      title: 'Traditional Glazing',
      image: '/images/before-after/single.JPG',
      description: 'Single pane old school glazing - still white because it can take up to two weeks to cure'
    },
    {
      id: 's14',
      title: 'Professional Service',
      image: '/images/before-after/werelicensedandinsured.JPG',
      description: 'We are licensed and insured for your peace of mind'
    }
  ];

  return (
    <div>
      {/* Before/After Pairs */}
      <div className="mb-16">
        {!previewMode && (
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Before & After Transformations</h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedImage(image);
                setSelectedType('pair');
              }}
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-10">
                  <Image
                    src={image.before}
                    alt={`Before ${image.title}`}
                    fill
                    className="object-cover group-hover:opacity-0 transition-opacity duration-300"
                  />
                </div>
                <Image
                  src={image.after}
                  alt={`After ${image.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Single Images - Only show in full gallery mode */}
      {!previewMode && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Common Issues We Fix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {singleImages.map((image) => (
              <motion.div
                key={image.id}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedImage(image);
                  setSelectedType('single');
                }}
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                  <p className="text-sm text-gray-600">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedImage(null);
            setSelectedType(null);
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedType(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {selectedType === 'pair' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative h-80">
                  <Image
                    src={(selectedImage as BeforeAfterImage).before}
                    alt={`Before ${selectedImage.title}`}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 rounded-tr">
                    Before
                  </div>
                </div>
                <div className="relative h-80">
                  <Image
                    src={(selectedImage as BeforeAfterImage).after}
                    alt={`After ${selectedImage.title}`}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 rounded-tr">
                    After
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-[60vh] max-h-[600px]">
                <Image
                  src={(selectedImage as SingleImage).image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
              </div>
            )}
            <p className="mt-4 text-gray-600">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
} 