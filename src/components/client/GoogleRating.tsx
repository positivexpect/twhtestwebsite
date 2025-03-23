'use client';

import { useEffect, useState } from 'react';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';

interface GoogleRatingProps {
  placeId: string;
}

interface PlaceDetails {
  rating: number;
  user_ratings_total: number;
}

interface PlaceResult {
  rating?: number;
  user_ratings_total?: number;
}

// Extend the Window interface without conflicting with the global one
declare global {
  interface Window {
    google: any; // Using any to avoid conflicts with the global google type
    initGooglePlaces?: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;

export default function GoogleRating({ placeId }: GoogleRatingProps) {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPlacesService = async () => {
      try {
        await loadGoogleMapsScript();

        // Create a temporary map div with a unique id
        const mapDiv = document.createElement('div');
        const mapId = `map-${Math.random().toString(36).substr(2, 9)}`;
        mapDiv.id = mapId;
        mapDiv.style.display = 'none';
        document.body.appendChild(mapDiv);

        // Initialize the map and places service
        const map = new window.google.maps.Map(mapDiv, {
          center: { lat: 0, lng: 0 },
          zoom: 1,
          disableDefaultUI: true
        });

        const service = new window.google.maps.places.PlacesService(map);

        service.getDetails(
          {
            placeId: placeId,
            fields: ['rating', 'user_ratings_total']
          },
          (place: PlaceResult | null, status: any) => {
            // Clean up the temporary map div
            if (document.body.contains(mapDiv)) {
              document.body.removeChild(mapDiv);
            }

            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              setPlaceDetails({
                rating: place.rating || 0,
                user_ratings_total: place.user_ratings_total || 0
              });
            } else {
              const errorMessage = status === window.google.maps.places.PlacesServiceStatus.REQUEST_DENIED
                ? 'API key is not authorized for Places API'
                : 'Failed to load rating';
              console.error('Places API error:', status);
              setError(errorMessage);
            }
            setLoading(false);
          }
        );
      } catch (err) {
        console.error('Error initializing Places service:', err);
        setError(err instanceof Error ? err.message : 'Failed to load rating');
        setLoading(false);
      }
    };

    initPlacesService();
  }, [placeId]);

  if (error) {
    return (
      <div className="text-red-600 text-sm flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span>Unable to load rating at this time</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        <span className="text-gray-400">Loading rating...</span>
      </div>
    );
  }

  if (!placeDetails) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(placeDetails.rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-lg font-semibold text-gray-900">
        {placeDetails.rating.toFixed(1)}
      </span>
      <span className="text-gray-600">
        ({placeDetails.user_ratings_total} reviews)
      </span>
    </div>
  );
} 