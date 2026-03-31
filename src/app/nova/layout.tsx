import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Northern Virginia Window Repair | Nova | The Window Hospital',
  description: 'Professional window repair services in Northern Virginia. Serving Manassas, Gainesville, Warrenton, Leesburg, and surrounding areas. 85% of windows can be repaired, not replaced.',
  keywords: 'window repair Northern Virginia, Manassas window repair, Gainesville window repair, Warrenton window repair, Leesburg window repair, foggy windows Northern Virginia, window glass repair',
  openGraph: {
    title: 'Northern Virginia Window Repair | The Window Hospital',
    description: 'Expert window repair in Manassas, Gainesville, Warrenton, Leesburg and Northern Virginia. Save thousands with professional window repair.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northern Virginia Window Repair | The Window Hospital',
    description: 'Professional window repair services serving Manassas, Gainesville, Warrenton, Leesburg and all of Northern Virginia.',
  },
};

export default function NovaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
