import { Metadata } from 'next';
import ReviewsPage from './page';

export const metadata: Metadata = {
  title: 'Window Repair vs Replacement: Save 50-80%',
  description: 'Read customer reviews and see why homeowners choose window repair over replacement. Save up to 80% on repairs.',
  keywords: [
    // Primary Keywords
    'window repair vs replacement',
    'window replacement alternative',
    'fix foggy windows',
    'Fredericksburg window repair',
    'window glass replacement',
    
    // Cost-Related Keywords
    'window repair cost',
    'window replacement cost',
    'window repair cost vs replacement',
    'window repair savings',
    'window replacement alternative cost',
    
    // Service Area Keywords
    'window repair near me',
    'window repair Fredericksburg VA',
    'window repair Virginia',
    'window parts nationwide',
    'window glass supplier',
    
    // Business Type Keywords
    'window repair company',
    'window glass repair',
    'window repair service',
    'window parts store',
    'window repair franchise',
    
    // Specific Service Keywords
    'window parts wholesale',
    'window glass supplier',
    'window repair business',
    'window parts distributor',
    'window repair franchise opportunity'
  ].join(', '),
  openGraph: {
    title: 'Window Repair vs Replacement | Save 50-80% | The Window Hospital Inc.',
    description: '85% of windows can be repaired, not replaced! Save thousands with expert window repair services. 4.88/5 star rating from 300+ customers. Free assessment!',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Window Hospital Inc.',
    images: [
      {
        url: 'https://thewindowhospital.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Window Repair vs Replacement - Save Money with The Window Hospital'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Window Repair vs Replacement | Save 50-80% | The Window Hospital Inc.',
    description: '85% of windows can be repaired, not replaced! Save thousands with expert window repair services. Free assessment!',
    images: ['https://thewindowhospital.com/images/twitter-image.jpg']
  },
  alternates: {
    canonical: 'https://thewindowhospital.com/reviews'
  }
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 