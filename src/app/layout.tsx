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
  title: "The Window Hospital | Save Thousands with Expert Window Repair",
  description: "Stop overpaying for window replacements. 85% of windows can be repaired! Expert glass, parts, and screen repair services at a fraction of replacement cost.",
  keywords: "window repair, window replacement alternative, save on windows, window glass repair, window parts repair, window screen repair, foggy window repair",
  openGraph: {
    title: "Save Thousands - Repair Your Windows, Don't Replace",
    description: "85% of windows can be repaired instead of replaced. Expert window repair services at 50-80% less than replacement cost.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
