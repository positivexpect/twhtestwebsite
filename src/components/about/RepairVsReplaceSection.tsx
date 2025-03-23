import Link from 'next/link';

export default function RepairVsReplaceSection() {
  const benefits = [
    {
      title: 'Save Money',
      description: 'Repairs are typically 50-70% less expensive than replacements.'
    },
    {
      title: 'Reduce Waste',
      description: 'Avoid sending perfectly good frames to landfills.'
    },
    {
      title: 'Faster Service',
      description: 'Many repairs can be completed in a single day.'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Repair vs. Replace: The Window Hospital Difference
        </h3>
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Unlike many window companies that push full replacements, we thoroughly assess every window 
          to determine if a repair is possible. In most cases, it is! This approach saves you money, 
          reduces waste, and allows us to provide faster, more efficient service.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2 text-[#CD2028]">{benefit.title}</h4>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>

        <Link 
          href="/services" 
          className="inline-block bg-[#CD2028] hover:bg-[#B01B22] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Explore Our Services →
        </Link>
      </div>
    </section>
  );
} 