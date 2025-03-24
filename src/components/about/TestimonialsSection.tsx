import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function TestimonialsSection() {
  // Combined stats
  const stats = {
    rating: 4.88,
    totalReviews: 300
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Choose The Window Hospital?</h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Don't just take our word for it. See what our satisfied customers have to say about our window repair services.
        </p>

        {/* Overall Rating Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Overall Rating</h3>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="flex items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-8 h-8 text-yellow-400" />
                ))}
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">{stats.rating.toFixed(2)}</p>
              <p className="text-lg text-gray-600">Based on {stats.totalReviews}+ reviews</p>
            </div>
            <Link 
              href="/reviews" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CD2028] hover:bg-[#B01B22] transition-colors duration-200"
            >
              See All Reviews
            </Link>
          </div>
        </div>

        {/* Video Testimonials */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">Video Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/X4FeC7WC1AY"
                title="Customer Video Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/w26I62EEBds"
                title="Customer Video Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 