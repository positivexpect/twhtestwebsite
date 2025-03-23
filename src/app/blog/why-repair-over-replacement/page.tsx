import Link from 'next/link';

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Why You Should Consider Window Repair Over Replacement
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>March 23, 2024</span>
          <span className="mx-2">•</span>
          <span>6 min read</span>
        </div>
      </header>

      <div className="prose prose-lg">
        <p>
          Picture this: you're sipping coffee in your living room, and you notice a faint crack snaking across your windowpane. Your first thought? "Time to replace the whole thing." It's a reflex many homeowners have, thanks to the window industry's relentless push for replacements. But what if I told you that repair could save you hundreds—sometimes thousands—of dollars while keeping your home just as functional and beautiful?
        </p>

        <h2>The Window Industry's Replacement Obsession</h2>
        <p>
          The window industry thrives on convincing homeowners that replacement is the only viable solution. Walk into any big-box store, and you'll see flashy displays for new windows promising energy efficiency, modern aesthetics, and easy installation. Meanwhile, repair options are rarely mentioned. Why? Profit margins.
        </p>
        <p>
          A full window replacement can cost anywhere from $500 to $1,000 per window, while a repair—like fixing a cracked pane or replacing a glass unit—might run you $100 to $300. Companies make more money pushing new units, so they downplay repairs, leaving homeowners in the dark about cost-effective alternatives.
        </p>

        <h2>Why People Don't Repair Windows</h2>
        <p>
          Most folks don't realize that issues like cracked glass, stuck sashes, or foggy windows from condensation can be fixed without replacing the entire frame. For example, condensation between panes—a common complaint—doesn't mean you need a new window. It's a sign of a broken seal, and the solution is replacing the glass unit, not removing moisture.
        </p>

        <h2>The Cost Savings of Repair</h2>
        <p>
          Let's talk numbers—because who doesn't love saving money? Imagine you've got a cracked windowpane. A new window might set you back $600, including labor and materials. A repair? Maybe $150, depending on the size and damage. That's a $450 difference on one window. Multiply that by a few windows, and you're looking at thousands in savings.
        </p>

        <h2>Environmental Benefits of Repair</h2>
        <p>
          Beyond your wallet, repair is a win for the planet. Replacing windows means manufacturing new ones—using energy, raw materials, and shipping resources—then tossing the old ones into landfills. The U.S. generates over 12 million tons of construction waste annually, and windows are a big chunk of that.
        </p>

        <h2>When Repair Makes Sense</h2>
        <p>
          Not every window issue calls for replacement. Cracked glass? Repairable. Foggy panes from condensation? Replace the glass unit—no moisture removal needed. Stuck sashes or broken balances? A skilled technician can fix those in a day. Even older windows with worn frames can often be restored, especially in historic homes where new windows ruin the aesthetic.
        </p>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Schedule a Repair Consultation
          </Link>
        </div>
      </div>
    </article>
  );
} 