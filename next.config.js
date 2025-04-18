/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/ffmpeg/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Enable module/nomodule pattern
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@heroicons/react', 'framer-motion'], // Optimize large package imports
  },
  // Optimize fonts
  optimizeFonts: true,
  // Optimize images
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Improve production performance
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  swcMinify: true, // Use SWC minifier
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withBundleAnalyzer(nextConfig);
