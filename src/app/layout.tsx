import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Navigation from '@/components/client/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/client/ChatBot';
import ExitIntentPopup from '@/components/client/ExitIntentPopup';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#CD2028',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thewindowhospital.com'),
  title: 'The Window Hospital',
  description: 'Expert window repair services in Fredericksburg, VA. Save 50-80% compared to replacement.',
  icons: {
    icon: [
      {
        url: '/images/icononly_transparent_nobuffer.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/images/icononly_transparent_nobuffer.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/images/icononly_transparent_nobuffer.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/icononly_transparent_nobuffer.png',
        color: '#CD2028'
      }
    ]
  },
  keywords: 'window repair, glass repair, window replacement, foggy windows, window parts, window maintenance, Fredericksburg VA, window repair cost, window repair vs replacement',
  openGraph: {
    title: 'The Window Hospital | Professional Window Repair Services',
    description: 'Expert window repair services in Fredericksburg, VA. Save 50-80% compared to window replacement.',
    url: 'https://thewindowhospital.com',
    siteName: 'The Window Hospital',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Window Hospital - Professional Window Repair Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Window Hospital | Professional Window Repair Services',
    description: 'Expert window repair services in Fredericksburg, VA. Save 50-80% compared to window replacement.',
    images: ['/images/og-image.jpg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icononly_transparent_nobuffer.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icononly_transparent_nobuffer.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icononly_transparent_nobuffer.png" />
        <link rel="mask-icon" href="/images/icononly_transparent_nobuffer.png" color="#CD2028" />
        <meta name="theme-color" content="#CD2028" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatBot />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
