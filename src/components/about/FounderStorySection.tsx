import Image from 'next/image';

export default function FounderStorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="md:flex items-center max-w-6xl mx-auto">
        <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src="/images/placeholder-founder.jpg"
              alt="Joshua Zabec, Founder of The Window Hospital"
              fill
              className="rounded-lg shadow-xl object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Meet Joshua Zabec, Founder</h3>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              Joshua began his journey in the window industry at just 15 years old. 
              He quickly learned that many replacement window companies prioritize sales over honest service, 
              often misleading customers into unnecessary replacements.
            </p>
            <p className="text-lg leading-relaxed">
              Determined to offer a better alternative, Joshua founded The Window Hospital in 2018 
              to provide expert window repair services, saving customers time, money, and the hassle 
              of dealing with pushy salespeople.
            </p>
            <p className="text-lg leading-relaxed">
              Joshua is passionate about educating homeowners about the benefits of window repair 
              and is committed to providing transparent, reliable service throughout the 
              Richmond-Fredericksburg area and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 