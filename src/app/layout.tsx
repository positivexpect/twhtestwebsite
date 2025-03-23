import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navigation from '@/components/client/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
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
  }
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
      </body>
    </html>
  );
}
