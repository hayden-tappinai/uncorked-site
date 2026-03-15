"use client";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-gold mb-3">Uncorked</h3>
            <p className="text-cream/40 text-sm max-w-xs leading-relaxed">
              A curated wine gift experience featuring wines from Rutherford Ranch
              Winery, Napa Valley.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4">
                Explore
              </p>
              <div className="space-y-2">
                <a href="#about" className="block text-cream/50 text-sm hover:text-gold transition-colors">
                  About
                </a>
                <a href="#wines" className="block text-cream/50 text-sm hover:text-gold transition-colors">
                  The Wines
                </a>
                <a href="#experience" className="block text-cream/50 text-sm hover:text-gold transition-colors">
                  Experience
                </a>
                <a href="#pricing" className="block text-cream/50 text-sm hover:text-gold transition-colors">
                  Subscribe
                </a>
              </div>
            </div>
            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4">
                Rutherford Ranch
              </p>
              <div className="space-y-2">
                <a
                  href="https://rutherfordranch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-cream/50 text-sm hover:text-gold transition-colors"
                >
                  Visit the Winery
                </a>
                <p className="text-cream/40 text-sm">
                  Silverado Trail, Rutherford
                </p>
                <p className="text-cream/40 text-sm">Napa Valley, California</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} Uncorked. A Rutherford Ranch
            experience. Purely Napa.
          </p>
          <p className="text-cream/20 text-xs">
            Must be 21+ to purchase. Please drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
