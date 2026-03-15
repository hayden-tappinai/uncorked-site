"use client";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-4">
            About
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-8">
            More Than a Gift.
            <br />
            <span className="text-gold">An Experience.</span>
          </h2>
          <div className="w-16 h-px bg-gold/30 mx-auto" />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-cream/70 text-lg leading-relaxed mb-6">
              Uncorked is a curated wine gift experience from{" "}
              <span className="text-gold">Rutherford Ranch Winery</span> — three
              generations of family winemaking on the legendary Silverado Trail in
              Napa Valley.
            </p>
            <p className="text-cream/60 leading-relaxed mb-6">
              Each Uncorked box is a journey through the terroir that André
              Tchelistcheff once said &ldquo;it takes Rutherford dust to grow great
              Cabernet.&rdquo; Hand-selected bottles, personal tasting notes sealed
              in wax, and a story that unfolds with every pour.
            </p>
            <p className="text-cream/60 leading-relaxed">
              This isn&apos;t a subscription you forget about. It&apos;s a moment
              you remember — crafted for the people who matter most.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-burgundy border border-gold/10 overflow-hidden">
              <img
                src="/hero.png"
                alt="Uncorked wine gift box"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
