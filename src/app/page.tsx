import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import RepairVsReplace from '@/components/RepairVsReplace';
import Services from '@/components/Services';
import EducationalContent from '@/components/EducationalContent';
import Link from 'next/link';
import SocialProof from '@/components/client/SocialProof';

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

      {/* Social Proof Section */}
      <SocialProof />
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Expert Window Repair Services</h2>
            <p className="mt-4 text-xl text-gray-600">
              85% of windows can be fixed instead of replaced. Text 540-603-0088 with a picture for a quick quote!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Glass Repair */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Glass Repair</h3>
                <p className="text-gray-600 mb-6">
                  Fix foggy windows, seal failures, cracks, and chips without full replacement. Save 50-80% compared to new windows.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What We Fix:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Foggy Glass Repair</li>
                    <li>• Seal Failure Fix</li>
                    <li>• Glass Replacement</li>
                    <li>• Energy Efficiency Restoration</li>
                  </ul>
                </div>
                
                <p className="text-[#CD2028] font-semibold mb-6">
                  Typical Savings: $600-$1,200 per window
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Common Questions</h4>
                  <div>
                    <p className="font-medium text-gray-900">Can I replace just the glass in my window?</p>
                    <p className="text-gray-600">Yes, in 85% of cases, you can replace just the glass for $200-$600, saving thousands over full replacement.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Why do my windows become foggy?</p>
                    <p className="text-gray-600">Foggy windows result from seal failure, letting moisture condense between panes. This is fixable for $200-$600.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/glass-services#get-quote"
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CD2028] hover:bg-[#B01B22]"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Parts Repair */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Parts Repair</h3>
                <p className="text-gray-600 mb-6">
                  Restore window functionality with expert parts repair and replacement. No need to replace the entire window.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What We Fix:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Hardware Replacement</li>
                    <li>• Balance Repair</li>
                    <li>• Lock Mechanism Fix</li>
                    <li>• Smooth Operation Restoration</li>
                  </ul>
                </div>
                
                <p className="text-[#CD2028] font-semibold mb-6">
                  Typical Savings: $400-$800 per window
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Common Questions</h4>
                  <div>
                    <p className="font-medium text-gray-900">What are muntins/grids?</p>
                    <p className="text-gray-600">Muntins or grids are bars dividing a window into smaller panes. We can repair or replace these while keeping your existing window.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Is it more efficient to replace my window or parts?</p>
                    <p className="text-gray-600">If your frame is good, parts repair at $200-$300 beats $1,000+ replacements in cost and efficiency.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/parts-services#get-quote"
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CD2028] hover:bg-[#B01B22]"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Screen Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Screen Services</h3>
                <p className="text-gray-600 mb-6">
                  Professional screen repair and replacement services. Custom-fit screens for any window type.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">What We Fix:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Screen Repair</li>
                    <li>• New Screen Installation</li>
                    <li>• Pet-Resistant Screens</li>
                    <li>• Solar Screen Options</li>
                  </ul>
                </div>
                
                <p className="text-[#CD2028] font-semibold mb-6">
                  Typical Savings: $50-$200 per screen
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Common Questions</h4>
                  <div>
                    <p className="font-medium text-gray-900">Can screens be repaired instead of replaced?</p>
                    <p className="text-gray-600">Yes, most screen damage can be repaired for $50-$150, compared to $1,000+ for new windows with screens.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Do you offer pet-resistant screen options?</p>
                    <p className="text-gray-600">Yes, we offer heavy-duty pet-resistant screens that are 7x stronger than standard screens.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/screen-services#get-quote"
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CD2028] hover:bg-[#B01B22]"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Educational footer with service categories */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                <Link href="/glass-services" className="hover:text-[#CD2028]">
                  Glass Services
                </Link>
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/glass-services#foggy-glass" className="text-gray-600 hover:text-[#CD2028]">
                    Foggy Glass Repair
                  </Link>
                </li>
                <li>
                  <Link href="/glass-services#seal-failure" className="text-gray-600 hover:text-[#CD2028]">
                    Seal Failure Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/glass-services#glass-replacement" className="text-gray-600 hover:text-[#CD2028]">
                    Glass Replacement
                  </Link>
                </li>
                <li>
                  <Link href="/glass-services#energy-efficiency" className="text-gray-600 hover:text-[#CD2028]">
                    Energy Efficiency
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                <Link href="/parts-services" className="hover:text-[#CD2028]">
                  Parts Services
                </Link>
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/parts-services#hardware" className="text-gray-600 hover:text-[#CD2028]">
                    Hardware Repair
                  </Link>
                </li>
                <li>
                  <Link href="/parts-services#balance" className="text-gray-600 hover:text-[#CD2028]">
                    Balance Systems
                  </Link>
                </li>
                <li>
                  <Link href="/parts-services#locks" className="text-gray-600 hover:text-[#CD2028]">
                    Lock Mechanisms
                  </Link>
                </li>
                <li>
                  <Link href="/parts-services#weather-stripping" className="text-gray-600 hover:text-[#CD2028]">
                    Weather Stripping
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                <Link href="/screen-services" className="hover:text-[#CD2028]">
                  Screen Services
                </Link>
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/screen-services#repair" className="text-gray-600 hover:text-[#CD2028]">
                    Screen Repair
                  </Link>
                </li>
                <li>
                  <Link href="/screen-services#frame" className="text-gray-600 hover:text-[#CD2028]">
                    Frame Replacement
                  </Link>
                </li>
                <li>
                  <Link href="/screen-services#pet-resistant" className="text-gray-600 hover:text-[#CD2028]">
                    Pet-Resistant Options
                  </Link>
                </li>
                <li>
                  <Link href="/screen-services#solar" className="text-gray-600 hover:text-[#CD2028]">
                    Solar Screens
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                <Link href="/education" className="hover:text-[#CD2028]">
                  Education Center
                </Link>
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/education#repair-vs-replace" className="text-gray-600 hover:text-[#CD2028]">
                    Repair vs Replace Guide
                  </Link>
                </li>
                <li>
                  <Link href="/education#cost-comparison" className="text-gray-600 hover:text-[#CD2028]">
                    Cost Comparison
                  </Link>
                </li>
                <li>
                  <Link href="/education#common-issues" className="text-gray-600 hover:text-[#CD2028]">
                    Common Window Issues
                  </Link>
                </li>
                <li>
                  <Link href="/education#maintenance" className="text-gray-600 hover:text-[#CD2028]">
                    Maintenance Tips
                  </Link>
                </li>
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
