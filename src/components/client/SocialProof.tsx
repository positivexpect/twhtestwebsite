'use client';

import { FaCheckCircle, FaHandshake, FaStar } from 'react-icons/fa';

export default function SocialProof() {
  const stats = [
    { label: 'Windows Repaired', value: '10,000+' },
    { label: 'Customer Satisfaction', value: '98%' },
    { label: 'Years Experience', value: '20+' },
    { label: 'Cities Served', value: '25+' },
  ];

  const certifications = [
    {
      name: 'Licensed & Insured',
      icon: FaCheckCircle,
      description: 'Fully licensed and insured for your peace of mind'
    },
    {
      name: 'Trusted Partner',
      icon: FaHandshake,
      description: 'Preferred vendor for Realtors, House Flippers, and Property Managers'
    },
    {
      name: 'Top Rated',
      icon: FaStar,
      description: '4.9/5 average rating across all platforms'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Trusted by Homeowners Across Virginia
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied customers who have chosen The Window Hospital
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-[#CD2028] mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div key={cert.name} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <cert.icon className="w-12 h-12 text-[#CD2028] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 