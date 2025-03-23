export default function ExpansionSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Growing to Serve You Better</h3>
          <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto mb-8">
            Due to increasing demand for our expert window repair services, 
            The Window Hospital is expanding through franchising opportunities. 
            Our commitment to honest service and quality repairs has created 
            a strong foundation for growth, allowing us to help more homeowners 
            save money and avoid unnecessary replacements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h4 className="text-xl font-semibold mb-4 text-[#CD2028]">Why Franchise With Us?</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#CD2028] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Proven business model with high demand</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#CD2028] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Comprehensive training and ongoing support</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#CD2028] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Protected territories with room for growth</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#CD2028] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Industry-leading repair techniques and technology</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h4 className="text-xl font-semibold mb-4 text-[#CD2028]">Franchise Opportunity</h4>
            <p className="text-gray-700 mb-6">
              Join The Window Hospital family and become part of a growing network of 
              window repair specialists. We're seeking motivated entrepreneurs who share 
              our commitment to quality, honesty, and exceptional customer service.
            </p>
            <div className="space-y-4">
              <a 
                href="/franchise" 
                className="block w-full text-center bg-[#CD2028] hover:bg-[#B01B22] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Learn More About Franchising
              </a>
              <a 
                href="mailto:josh@thewindowhospital.com" 
                className="block w-full text-center border-2 border-[#CD2028] text-[#CD2028] hover:bg-[#CD2028] hover:text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Contact for Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 