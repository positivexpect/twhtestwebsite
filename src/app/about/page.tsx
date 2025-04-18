import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MissionSection from '@/components/about/MissionSection';
import FounderStorySection from '@/components/about/FounderStorySection';
import RepairVsReplaceSection from '@/components/about/RepairVsReplaceSection';
import ExpansionSection from '@/components/about/ExpansionSection';
import TestimonialsSection from '@/components/about/TestimonialsSection';
import PrivacySummary from '@/components/about/PrivacySummary';
import AssessmentForm from '@/components/client/AssessmentForm';

export const metadata: Metadata = {
  title: 'About Us | The Window Hospital',
  description: 'Expert window repair services focused on honesty and sustainability. Save money with repairs over replacements at The Window Hospital.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MissionSection />
        <FounderStorySection />
        <RepairVsReplaceSection />
        <TestimonialsSection />
        <ExpansionSection />
        <PrivacySummary />
        
        {/* Assessment Form Section */}
        <section className="py-12">
          <AssessmentForm />
        </section>
      </div>
    </main>
  );
} 