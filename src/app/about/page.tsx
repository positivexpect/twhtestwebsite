import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MissionSection from '@/components/about/MissionSection';
import FounderStorySection from '@/components/about/FounderStorySection';
import RepairVsReplaceSection from '@/components/about/RepairVsReplaceSection';
import ExpansionSection from '@/components/about/ExpansionSection';
import BlogSection from '@/components/about/BlogSection';
import PrivacySummary from '@/components/about/PrivacySummary';

export const metadata: Metadata = {
  title: 'About Us | The Window Hospital',
  description: 'Learn about The Window Hospital\'s mission to provide expert window repair services. Discover our commitment to honesty, sustainability, and saving customers money by repairing instead of replacing windows.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MissionSection />
        <FounderStorySection />
        <RepairVsReplaceSection />
        <ExpansionSection />
        <BlogSection />
        <PrivacySummary />
      </div>
    </main>
  );
} 