'use client';

export default function StoreLocator() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={`https://storage.googleapis.com/maps-solutions-ilt4xnjybh/locator-plus/7vwk/locator-plus.html?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&solution_channel=GMP_QB_locatorplus_v7_cABCDE`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allow="geolocation"
        referrerPolicy="no-referrer-when-downgrade"
        title="Store Locator"
      />
    </div>
  );
} 