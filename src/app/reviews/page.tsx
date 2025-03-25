'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaStar } from 'react-icons/fa';
import { SiHomeadvisor } from 'react-icons/si';
import { motion } from 'framer-motion';

// We'll create these components next
import ReviewsDashboard from '@/components/client/ReviewsDashboard';
import ReviewsList from '@/components/client/ReviewsList';
import AssessmentForm from '@/components/client/AssessmentForm';
import ReviewPopup from '@/components/client/ReviewPopup';
import CompetitorComparison from '@/components/client/CompetitorComparison';

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [starFilter, setStarFilter] = useState(5); // Default to 5 stars
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStarFilter, setSelectedStarFilter] = useState(5); // Track the selected star filter

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "name": "The Window Hospital Inc.",
    "image": "https://thewindowhospital.com/images/logo.png",
    "description": "Professional window repair services in Fredericksburg, VA. Specializing in window repair, glass replacement, and maintenance. Save 50-80% compared to window replacement.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10944 Patriot Highway, Suite 4745",
      "addressLocality": "Fredericksburg",
      "addressRegion": "VA",
      "postalCode": "22408",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.2822,
      "longitude": -77.5562
    },
    "url": "https://thewindowhospital.com",
    "telephone": "+1-540-603-0088",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.88",
      "reviewCount": "300",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Fredericksburg",
        "containedInPlace": {
          "@type": "State",
          "name": "Virginia"
        }
      },
      {
        "@type": "State",
        "name": "Virginia"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 38.2822,
        "longitude": -77.5562
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Window Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Glass Repair",
            "description": "Repair foggy or damaged window glass at 50-80% less than replacement cost",
            "offers": {
              "@type": "Offer",
              "price": "200",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Parts Supply",
            "description": "Nationwide window parts supply and distribution",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/thewindowhospital",
      "https://www.instagram.com/thewindowhospital",
      "https://www.youtube.com/thewindowhospital"
    ],
    "foundingDate": "2015",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10"
    },
    "award": [
      "Best Window Repair Service 2023",
      "Top Rated Local Business 2023"
    ],
    "knowsAbout": [
      "Window Repair",
      "Glass Replacement",
      "Window Parts",
      "Energy Efficiency",
      "Window Maintenance"
    ],
    "hasMap": "https://www.google.com/maps/place/The+Window+Hospital+Inc./@38.2822,-77.5562,15z/",
    "paymentAccepted": [
      "Cash",
      "Credit Card",
      "Check"
    ],
    "currenciesAccepted": "USD",
    "paymentMethods": [
      "Cash",
      "Credit Card",
      "Check"
    ],
    "serviceType": [
      "Window Repair",
      "Glass Replacement",
      "Parts Supply",
      "Maintenance"
    ],
    "slogan": "85% of windows can be repaired, not replaced!",
    "brand": {
      "@type": "Brand",
      "name": "The Window Hospital Inc.",
      "logo": "https://thewindowhospital.com/images/logo.png"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://thewindowhospital.com/reviews"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://thewindowhospital.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "150",
      "highPrice": "500",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.88",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": "Verified Customer"
      },
      "reviewBody": "Professional window repair services that saved us money compared to replacement."
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does window repair cost compared to replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Window repair typically costs 50-80% less than window replacement. For example, a basic window repair might cost $150-300, while replacement could cost $500-1000 per window."
          }
        },
        {
          "@type": "Question",
          "name": "What types of windows can be repaired?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We can repair most types of windows including double-hung, single-hung, casement, sliding, and picture windows. We specialize in repairing foggy windows, broken seals, and hardware issues."
          }
        },
        {
          "@type": "Question",
          "name": "How long does window repair take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most window repairs can be completed in 1-2 hours per window. We typically schedule appointments within 1-2 business days of contact."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer emergency window repair services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer emergency window repair services for broken glass and other urgent issues. Contact us immediately for emergency service."
          }
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thewindowhospital.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reviews",
        "item": "https://thewindowhospital.com/reviews"
      }
    ]
  };

  const handleStarFilter = (stars: number) => {
    setSelectedStarFilter(stars); // Store the selected star filter
    if (stars < 4) {
      setIsPopupOpen(true);
    } else {
      setStarFilter(stars);
    }
  };

  const handleShowLowerReviews = () => {
    setStarFilter(selectedStarFilter); // Use the selected star filter instead of defaulting to 4
    setIsPopupOpen(false);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 py-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-gray-900 font-medium">Reviews</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-12 pt-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight mb-4">
            Our Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our satisfied customers have to say about our window repair services
          </p>
        </header>

        {/* Overall Rating Section */}
        <section className="bg-gray-50 py-12 mb-16" aria-labelledby="overall-rating">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-400 h-12 w-12" aria-hidden="true" />
                ))}
              </div>
              <div className="stat-number mb-2" id="overall-rating">4.88</div>
              <p className="text-xl text-gray-600">Overall Rating</p>
              <p className="mt-2 text-gray-500">Based on 300+ Reviews</p>
            </div>
          </div>
        </section>

        {/* Reviews Dashboard */}
        <section className="mb-16" aria-labelledby="reviews-dashboard">
          <ReviewsDashboard />
        </section>

        {/* Filter Section */}
        <section className="mb-8" aria-labelledby="filter-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Review source filters">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-md ${
                    activeFilter === 'all'
                      ? 'bg-[#CD2028] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={activeFilter === 'all'}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => setActiveFilter('google')}
                  className={`inline-flex items-center px-4 py-2 rounded-md ${
                    activeFilter === 'google'
                      ? 'bg-[#4285F4] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaGoogle className="h-5 w-5 mr-2" />
                  Google
                </button>
                <button
                  onClick={() => setActiveFilter('homeadvisor')}
                  className={`inline-flex items-center px-4 py-2 rounded-md ${
                    activeFilter === 'homeadvisor'
                      ? 'bg-[#F68D2E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <SiHomeadvisor className="h-5 w-5 mr-2" />
                  HomeAdvisor
                </button>
                <button
                  onClick={() => setActiveFilter('thumbtack')}
                  className={`inline-flex items-center px-4 py-2 rounded-md ${
                    activeFilter === 'thumbtack'
                      ? 'bg-[#009FD9] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.722-15.556l-7.444 7.444-3.556-3.556 1.111-1.111 2.444 2.444 6.333-6.333 1.112 1.112z" />
                  </svg>
                  Thumbtack
                </button>
              </div>
              <div className="flex items-center space-x-2" role="group" aria-label="Star rating filters">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => handleStarFilter(stars)}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      selectedStarFilter === stars
                        ? 'bg-[#CD2028] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={selectedStarFilter === stars}
                  >
                    <FaStar className={`${selectedStarFilter === stars ? 'text-white' : 'text-yellow-400'}`} aria-hidden="true" />
                    <span className="ml-1">{stars} stars</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setStarFilter(0);
                    setSelectedStarFilter(0);
                  }}
                  className={`px-3 py-1 rounded-md ${
                    selectedStarFilter === 0
                      ? 'bg-[#CD2028] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" aria-labelledby="reviews-list">
          <ReviewsList filter={activeFilter} starFilter={starFilter} />
        </section>

        {/* Competitor Comparison */}
        <CompetitorComparison />

        {/* Assessment Form */}
        <section className="bg-gray-50 py-16" aria-labelledby="assessment-form">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentForm />
          </div>
        </section>

        {/* Review Popup */}
        <ReviewPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onShowLowerReviews={handleShowLowerReviews}
        />
      </div>
    </>
  );
} 