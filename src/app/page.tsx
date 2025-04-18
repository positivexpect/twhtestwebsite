import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import RepairVsReplace from '@/components/RepairVsReplace';
import Services from '@/components/Services';
import EducationalContent from '@/components/EducationalContent';
import Link from 'next/link';

// Import client components dynamically with loading states
const SavingsCalculator = dynamic(
  () => import('@/components/client/SavingsCalculator'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-8 rounded-lg">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ),
    ssr: false
  }
);

const AssessmentForm = dynamic(
  () => import('@/components/client/AssessmentForm'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-8 rounded-lg">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ),
    ssr: false
  }
);

const Navigation = dynamic(
  () => import('@/components/client/Navigation'),
  {
    ssr: true
  }
);

const Parts = dynamic(
  () => import('@/components/client/Parts'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-8 rounded-lg">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
);

const SocialProof = dynamic(
  () => import('@/components/client/SocialProof'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-4 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <EducationalContent />
      <RepairVsReplace />
      <Services />
      <Parts />
      <SavingsCalculator />
      <AssessmentForm />
      <SocialProof />
    </div>
  );
}
