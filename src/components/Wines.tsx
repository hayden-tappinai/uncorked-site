"use client";

const wines = [
  {
    name: "Cabernet Sauvignon",
    appellation: "Napa Valley",
    description:
      "Bold and structured with layers of dark cherry, cassis, and a hint of Rutherford dust. The flagship of every Uncorked box.",
    notes: "Dark Cherry · Cassis · Oak · Cocoa",
    vintage: "Current Release",
  },
  {
    name: "Reserve Cabernet Sauvignon",
    appellation: "Napa Valley",
    description:
      "Small production, winery-exclusive. Rich blackberry and plum with elegant tannins and a finish that lingers like a great conversation.",
    notes: "Blackberry · Plum · Vanilla · Spice",
    vintage: "Reserve Selection",
  },
  {
    name: "Chardonnay",
    appellation: "Napa Valley",
    description:
      "Bright and balanced with notes of golden apple and honeysuckle. A perfect pour to start the evening or pair with the moment.",
    notes: "Golden Apple · Honeysuckle · Citrus · Cream",
    vintage: "Current Release",
  },
];

export default function Wines() {
  return (
    <section id="wines" className="relative py-32 px-6 bg-burgundy/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-4">
            The Collection
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-8">
            Purely Napa
          </h2>
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed">
            Each Uncorked box features three hand-selected wines from Rutherford
            Ranch — 100% sustainably grown on the Silverado Trail.
          </p>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-8" />
        </div>

        {/* Wine cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {wines.map((wine, i) => (
            <div
              key={i}
              className="group border border-gold/10 bg-burgundy-dark/50 p-8 hover:border-gold/30 transition-all duration-500"
            >
              {/* Wine number */}
              <span className="text-gold/20 font-serif text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="font-serif text-2xl text-cream mt-4 mb-1">
                {wine.name}
              </h3>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
                {wine.appellation} · {wine.vintage}
              </p>

              <p className="text-cream/60 text-sm leading-relaxed mb-6">
                {wine.description}
              </p>

              <div className="pt-4 border-t border-gold/10">
                <p className="text-gold/40 text-xs tracking-wider uppercase mb-1">
                  Tasting Notes
                </p>
                <p className="text-cream/50 text-sm">{wine.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
