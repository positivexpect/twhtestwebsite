declare global {
  interface Window {
    google: any;
    initGoogleMaps?: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;

export const loadGoogleMapsScript = () => {
  return new Promise<void>((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&v=beta`;
    script.async = true;

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
    };

    script.onerror = (e) => {
      scriptLoading = false;
      console.error('Failed to load Google Maps script:', e);
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });
}; 