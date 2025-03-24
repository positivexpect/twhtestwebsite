'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  date: string;
  serviceType?: string;
  location: string;
}

interface ReviewsListProps {
  filter: string;
  starFilter: number;
}

export default function ReviewsList({ filter, starFilter }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reviewsPerPage = 10;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Reviews data is not in the expected format');
        }
        
        // Sort reviews by date (most recent first)
        const sortedReviews = data.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setReviews(sortedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again later.');
        setReviews([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter, starFilter]);

  const filteredReviews = reviews.filter(review => {
    const platformMatch = filter === 'all' || review.platform.toLowerCase() === filter.toLowerCase();
    const starMatch = starFilter === 0 || Math.round(review.rating) === starFilter;
    return platformMatch && starMatch;
  });

  const paginatedReviews = filteredReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CD2028]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#CD2028] text-white rounded hover:bg-[#B01B22]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (filteredReviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {starFilter < 4 
            ? "Looking for lower ratings? Check out 'What's the Scoop?' to see how we handle our challenges!"
            : "No reviews found matching your filters."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6">
        {paginatedReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {/* Stars Rating */}
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {review.rating.toFixed(1)}
              </span>
            </div>

            {/* Name and Location */}
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {review.reviewerName}
              </h3>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{review.location}</span>
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>

            {/* Review Text */}
            <p className="mt-4 text-gray-600">{review.reviewText}</p>

            {/* Platform Badge */}
            <div className="mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                review.platform.toLowerCase() === 'google' 
                  ? 'bg-blue-100 text-blue-800'
                  : review.platform.toLowerCase() === 'homeadvisor'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {review.platform}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                page === i + 1
                  ? 'bg-[#CD2028] text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 