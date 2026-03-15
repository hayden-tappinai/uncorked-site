"use client";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 bg-burgundy/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section header */}
        <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-4">
          Membership
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream mb-8">
          Gift the Extraordinary
        </h2>
        <div className="w-16 h-px bg-gold/30 mx-auto mb-16" />

        {/* Pricing card */}
        <div className="max-w-lg mx-auto border border-gold/20 bg-burgundy-dark/80 p-10 md:p-14">
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase mb-6">
            Annual Membership
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-serif text-6xl md:text-7xl text-gold">
              $300
            </span>
            <span className="text-cream/40 text-lg">/year</span>
          </div>
          <p className="text-cream/40 text-sm mb-10">
            Billed annually · Free shipping
          </p>

          <div className="space-y-4 text-left mb-12">
            {[
              "Four seasonal deliveries of curated Rutherford Ranch wines",
              "Three hand-selected bottles per delivery",
              "Wax-sealed tasting notes with each bottle",
              "Handcrafted wooden presentation box",
              "Exclusive access to limited-release selections",
              "Priority booking for Rutherford Ranch tastings",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold/60 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-cream/60 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="block w-full bg-gold text-burgundy-dark font-semibold py-4 text-center tracking-wider uppercase text-sm hover:bg-gold-secondary transition-colors"
          >
            Subscribe Now
          </a>

          <p className="text-cream/30 text-xs mt-6">
            Cancel anytime · Gift subscriptions available
          </p>
        </div>

        {/* Social proof */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div>
            <p className="font-serif text-3xl text-gold">45+</p>
            <p className="text-cream/40 text-xs tracking-wider uppercase mt-1">
              Years of craft
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl text-gold">100%</p>
            <p className="text-cream/40 text-xs tracking-wider uppercase mt-1">
              Sustainable
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl text-gold">3</p>
            <p className="text-cream/40 text-xs tracking-wider uppercase mt-1">
              Generations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
