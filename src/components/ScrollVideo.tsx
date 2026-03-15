"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const INITIAL_FRAMES = 10;
const BATCH_SIZE = 20;

const getFramePath = (index: number): string => {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/frames-unboxing/frame_${frameNumber}.jpg`;
};

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const frameIndexRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const loadedCountRef = useRef(0);
  const [initialReady, setInitialReady] = useState(false);

  // Resize canvas for retina displays
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
  };

  // Render frame to canvas (with fallback to nearest loaded frame)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    let img = imagesRef.current[index];
    if (!img) {
      for (let i = index; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (!canvas || !ctx || !img) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Load single image and decode it
  const loadImage = (index: number): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFramePath(index);
      img.onload = async () => {
        try {
          await img.decode();
          imagesRef.current[index] = img;
          loadedCountRef.current++;
          resolve(img);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
    });
  };

  // Progressive loading — first batch immediately, rest in background
  useEffect(() => {
    const loadImagesProgressively = async () => {
      const initialPromises = [];
      for (let i = 0; i < INITIAL_FRAMES; i++) {
        initialPromises.push(loadImage(i));
      }
      await Promise.all(initialPromises);

      resizeCanvas();
      renderFrame(0);
      setInitialReady(true);

      for (
        let batchStart = INITIAL_FRAMES;
        batchStart < FRAME_COUNT;
        batchStart += BATCH_SIZE
      ) {
        const batchEnd = Math.min(batchStart + BATCH_SIZE, FRAME_COUNT);
        const batchPromises = [];
        for (let i = batchStart; i < batchEnd; i++) {
          batchPromises.push(loadImage(i));
        }
        await Promise.all(batchPromises);
      }
    };

    loadImagesProgressively();
  }, []);

  // Initialize Lenis + GSAP ScrollTrigger (synced via GSAP ticker — same as TappinAI)
  useEffect(() => {
    if (!initialReady) return;

    // Initialize Lenis with GSAP ticker sync
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker (not standalone RAF — this is key)
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger — pin section, scrub through frames
    const scrollTrigger = ScrollTrigger.create({
      id: "scroll-unboxing",
      trigger: sectionRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Update frame based on scroll progress (use full 0-100% for frames)
        const frameIndex = Math.min(
          Math.floor(progress * (FRAME_COUNT - 1)),
          FRAME_COUNT - 1
        );
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        // Header text — push back in Z-space and fade out (0-25%)
        if (headerRef.current) {
          if (progress <= 0.25) {
            const headerProgress = progress / 0.25;
            const translateZ = -600 * headerProgress;
            const opacity =
              progress >= 0.18 ? 1 - (progress - 0.18) / 0.07 : 1;
            headerRef.current.style.transform = `translateZ(${translateZ}px)`;
            headerRef.current.style.opacity = String(Math.max(0, opacity));
          } else {
            headerRef.current.style.opacity = "0";
            headerRef.current.style.transform = "translateZ(-600px)";
          }
        }

        // Burgundy vignette overlay fades in at end (85-100%)
        if (overlayRef.current) {
          if (progress < 0.85) {
            overlayRef.current.style.opacity = "0";
          } else {
            const fadeProgress = (progress - 0.85) / 0.15;
            overlayRef.current.style.opacity = String(fadeProgress);
          }
        }
      },
    });

    const handleResize = () => {
      resizeCanvas();
      renderFrame(frameIndexRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      const st = ScrollTrigger.getById("scroll-unboxing");
      if (st) st.kill();
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [initialReady]);

  return (
    <section
      id="scroll-video"
      ref={sectionRef}
      className="scroll-hero relative h-screen w-full overflow-hidden z-0"
    >
      {/* Canvas background — full viewport, pinned */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Hero content overlaid on canvas (fades out as you scroll) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={headerRef}
          className="text-center px-6 max-w-3xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{
              color: "rgba(214, 191, 137, 0.8)",
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            A Rutherford Ranch Experience
          </p>
          <h1
            className="font-serif text-6xl md:text-8xl font-normal leading-tight mb-6"
            style={{
              color: "#fff6e5",
              textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.3)",
            }}
          >
            Uncorked
          </h1>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-10"
            style={{
              color: "rgba(255, 246, 229, 0.6)",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Three bottles. Three stories. One unforgettable gift from the heart of
            Napa Valley.
          </p>
          <div className="pointer-events-auto">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-gold border border-gold/30 px-8 py-3 hover:bg-gold/10 transition-all tracking-widest text-sm uppercase"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              Discover the Collection
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
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(38,0,8,0.5)_100%)] z-10" />

      {/* End-of-scroll fade to burgundy (smooth transition to next section) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to bottom, transparent 20%, rgba(38, 0, 8, 0.8) 70%, #260008 100%)",
        }}
      />

      {/* Loading overlay */}
      {!initialReady && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "#260008" }}
        >
          <div className="text-center">
            <div
              className="w-10 h-10 border-2 rounded-full animate-spin mb-4 mx-auto"
              style={{
                borderColor: "rgba(214, 191, 137, 0.2)",
                borderTopColor: "#d6bf89",
              }}
            />
            <p
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(214, 191, 137, 0.4)" }}
            >
              Preparing
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
