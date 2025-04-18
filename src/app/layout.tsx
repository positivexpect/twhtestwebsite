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
  themeColor: '#CD2028',
};

export const metadata: Metadata = {
  title: {
    template: '%s | The Window Hospital',
    default: 'The Window Hospital | Expert Window Repair Services',
  },
  description: 'Expert window repair services helping homeowners save 50-80% on repairs vs replacement.',
  metadataBase: new URL('https://thewindowhospital.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: ['/favicon.ico'],
  },
  keywords: 'window repair, glass repair, window replacement, foggy windows, window parts, window maintenance, Fredericksburg VA, window repair cost, window repair vs replacement',
  openGraph: {
    title: 'The Window Hospital | Professional Window Repair Services',
    description: 'Expert window repair services in Fredericksburg, VA. Save 50-80% compared to window replacement.',
    url: 'https://thewindowhospital.com',
    siteName: 'The Window Hospital',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#CD2028',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon-96x96.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#CD2028" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatBot />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
