import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import RepairVsReplace from '@/components/RepairVsReplace';
import Services from '@/components/Services';
import EducationalContent from '@/components/EducationalContent';

// Import client components dynamically
const SavingsCalculator = dynamic(() => import('@/components/client/SavingsCalculator'));
const AssessmentForm = dynamic(() => import('@/components/client/AssessmentForm'));
const Navigation = dynamic(() => import('@/components/client/Navigation'), { ssr: true });
const Parts = dynamic(() => import('@/components/client/Parts'));

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero section with immediate value proposition */}
      <Hero />
      
      {/* Comprehensive educational content about repair vs replace */}
      <EducationalContent />
      
      {/* Detailed comparison showing cost benefits */}
      <RepairVsReplace />
      
      {/* Our three specialized service categories */}
      <Services />
      
      {/* Parts catalog */}
      <Parts />
      
      {/* Interactive tool to show potential savings */}
      <SavingsCalculator />
      
      {/* Lead generation form */}
      <AssessmentForm />
      
      {/* Trust indicators */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">85%</div>
              <div className="mt-2 text-gray-600">of windows can be fixed instead of replaced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50-80%</div>
              <div className="mt-2 text-gray-600">average savings vs replacement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">24hr</div>
              <div className="mt-2 text-gray-600">service for most repairs</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Educational footer with service categories */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Glass Services</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>Foggy Glass Repair</li>
                <li>Seal Failure Solutions</li>
                <li>Glass Replacement</li>
                <li>Energy Efficiency</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Parts Services</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>Hardware Repair</li>
                <li>Balance Systems</li>
                <li>Lock Mechanisms</li>
                <li>Weather Stripping</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Screen Services</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>Screen Repair</li>
                <li>Frame Replacement</li>
                <li>Pet-Resistant Options</li>
                <li>Solar Screens</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Education Center</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>Repair vs Replace Guide</li>
                <li>Cost Comparison</li>
                <li>Common Window Issues</li>
                <li>Maintenance Tips</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p className="text-lg">Stop overpaying for window replacements. Most windows can be repaired at a fraction of the cost.</p>
            <p className="mt-2">Schedule your free assessment today and learn about your cost-saving options.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
