"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-burgundy-dark/95 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <span className="font-serif text-2xl tracking-wider text-gold">
            UNCORKED
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-cream/70">
          <a href="#about" className="hover:text-gold transition-colors">
            About
          </a>
          <a href="#wines" className="hover:text-gold transition-colors">
            The Wines
          </a>
          <a href="#experience" className="hover:text-gold transition-colors">
            Experience
          </a>
          <a
            href="#pricing"
            className="bg-gold/10 border border-gold/30 text-gold px-5 py-2 hover:bg-gold/20 transition-all"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}
