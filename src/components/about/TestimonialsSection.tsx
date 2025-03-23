import ThumbtackRating from '@/components/client/ThumbtackRating';
import GoogleRating from '@/components/client/GoogleRating';

export default function TestimonialsSection() {
  // Sample reviews - replace with actual reviews from your Google Business Profile
  const reviews = [
    {
      author: "Sarah Johnson",
      rating: 5,
      text: "Excellent service! They fixed our foggy windows for a fraction of the replacement cost.",
      image: "/images/reviews/review1.jpg"
    },
    {
      author: "Mike Thompson",
      rating: 5,
      text: "Professional, honest, and efficient. Saved us thousands on window repairs.",
      image: "/images/reviews/review2.jpg"
    },
    {
      author: "Lisa Martinez",
      rating: 5,
      text: "The Window Hospital is the best! Quick response and quality work.",
      image: "/images/reviews/review3.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Choose The Window Hospital?</h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Don't just take our word for it. See what our satisfied customers have to say about our window repair services.
        </p>

        {/* Ratings Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Google Reviews</h3>
            <GoogleRating placeId="ChIJOdzghZ3xtokRrt9-myMgPOM" />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Thumbtack Rating</h3>
            <ThumbtackRating />
          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-[#CD2028] flex items-center justify-center text-white text-xl font-bold">
                          {review.author[0]}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">{review.author}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">Video Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/w26I62EEBds"
                title="Customer Video Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500 text-center p-4">Second testimonial video coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 