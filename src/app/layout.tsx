import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('@/components/client/Navigation'), { ssr: true });
const Footer = dynamic(() => import('@/components/client/Footer'), { ssr: true });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Window Hospital | Expert Window Repair in Fredericksburg, VA",
  description: "85% of windows can be repaired! Save 50-80% with expert window repair in Fredericksburg, VA. Text 540-603-0088 for a quick quote. Most repairs $200-$600.",
  keywords: "window repair Fredericksburg VA, window replacement alternative, foggy window repair, window glass repair, window parts repair, window screen repair, save on windows",
  openGraph: {
    title: "Save Thousands with Expert Window Repair in Fredericksburg, VA",
    description: "85% of windows can be repaired instead of replaced. Text 540-603-0088 for a quick quote. Most repairs $200-$600.",
    type: "website",
    locale: "en_US",
    siteName: "The Window Hospital Inc.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.thewindowhospital.com",
  },
  other: {
    "google-site-verification": "", // Add your Google verification code
    "msvalidate.01": "", // Add your Bing verification code
  },
  authors: [{ name: "The Window Hospital Inc." }],
  generator: "Next.js",
  applicationName: "The Window Hospital Inc.",
  referrer: "origin-when-cross-origin",
  creator: "The Window Hospital Inc.",
  publisher: "The Window Hospital Inc.",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "The Window Hospital Inc.",
              "image": "https://www.thewindowhospital.com/images/logo.png",
              "@id": "https://www.thewindowhospital.com",
              "url": "https://www.thewindowhospital.com",
              "telephone": "+15406030088",
              "priceRange": "$200-$600",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4745 Patriot Hwy",
                "addressLocality": "Fredericksburg",
                "addressRegion": "VA",
                "postalCode": "22408",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 38.2527,
                "longitude": -77.4755
              },
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
              "sameAs": [
                "https://www.facebook.com/thewindowhospital",
                // Add other social media URLs
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
