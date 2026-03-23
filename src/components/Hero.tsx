"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      setTimeout(() => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
      }, 300 + i * 200);
    });
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/box-closed-branded.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-dark/60 via-burgundy-dark/40 to-burgundy-dark" />
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 text-center max-w-3xl px-6">
        <p
          data-animate
          className="text-gold/80 text-xs tracking-[0.35em] uppercase mb-6 opacity-0 translate-y-4 transition-all duration-700"
        >
          A Rutherford Ranch Experience
        </p>
        <h1
          data-animate
          className="font-serif text-6xl md:text-8xl text-cream mb-6 opacity-0 translate-y-4 transition-all duration-700"
        >
          Uncorked
        </h1>
        <p
          data-animate
          className="text-cream/60 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 opacity-0 translate-y-4 transition-all duration-700"
        >
          Three bottles. Three stories. One unforgettable gift from the heart of
          Napa Valley.
        </p>
        <div
          data-animate
          className="opacity-0 translate-y-4 transition-all duration-700"
        >
          <a
            href="#scroll-video"
            className="inline-flex items-center gap-2 text-gold border border-gold/30 px-8 py-3 hover:bg-gold/10 transition-all tracking-widest text-sm uppercase"
          >
            Discover the Unboxing
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}
