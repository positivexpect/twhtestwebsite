'use client';

import { useEffect, useRef } from 'react';
import { loadGoogleMapsScript } from '@/utils/googleMapsLoader';

interface GoogleMapProps {
  apiKey?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMap?: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;

export default function GoogleMap({ apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = { lat: 38.2914932, lng: -77.5458544 }; // The Window Hospital coordinates

  useEffect(() => {
    const loadMap = () => {
      return new Promise<void>((resolve, reject) => {
        if (!apiKey) {
          reject(new Error('Google Maps API key is not configured'));
          return;
        }

        // Check if script is already loaded
        if (window.google?.maps) {
          resolve();
          return;
        }

        // If script is loading, wait for it
        if (scriptLoading) {
          const checkLoaded = setInterval(() => {
            if (window.google?.maps) {
              clearInterval(checkLoaded);
              resolve();
            }
          }, 100);
          return;
        }

        // If script is already loaded
        if (scriptLoaded) {
          resolve();
          return;
        }

        // Load the script
        scriptLoading = true;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMap`;
        script.async = true;
        script.defer = true;

        // Define the callback function
        window.initGoogleMap = () => {
          scriptLoaded = true;
          scriptLoading = false;
          resolve();
          // Clean up
          delete window.initGoogleMap;
        };

        script.onerror = (e) => {
          scriptLoading = false;
          console.error('Failed to load Google Maps script:', e);
          reject(new Error('Failed to load Google Maps script'));
        };

        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        await loadGoogleMapsScript();

        const map = new window.google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
          mapTypeControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }]
            }
          ]
        });

        // Create an AdvancedMarkerElement
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: location,
          title: "The Window Hospital"
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px; color: #CD2028; font-weight: bold;">The Window Hospital</h3>
              <p style="margin: 0; color: #666;">
                10944 Patriot Highway, Suite 4745<br>
                Fredericksburg, VA 22408
              </p>
              <p style="margin: 5px 0 0; font-size: 0.9em;">
                <a href="https://maps.google.com/maps?daddr=38.2914932,-77.5458544" 
                   style="color: #CD2028; text-decoration: none;"
                   target="_blank">
                  Get Directions
                </a>
              </p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });

        // Open info window by default
        infowindow.open(map, marker);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [apiKey]);

  return (
    <div className="space-y-4">
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-full" />
      </div>
      <div className="text-center">
        <a
          href="https://maps.google.com/maps?daddr=38.2914932,-77.5458544"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#CD2028] hover:text-[#B01B22] font-medium"
        >
          Get Directions to Our Location
        </a>
      </div>
    </div>
  );
} 