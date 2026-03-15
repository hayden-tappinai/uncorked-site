"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const INITIAL_FRAMES = 10;
const BATCH_SIZE = 20;

const getFramePath = (index: number): string => {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/frames-unboxing/frame_${frameNumber}.jpg`;
};

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frames: HTMLImageElement[] = [];
    framesRef.current = frames;
    let loadedCount = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const renderFrame = (index: number) => {
      const img = frames[index];
      if (!img || !img.complete) {
        // Find nearest loaded frame
        for (let offset = 1; offset < FRAME_COUNT; offset++) {
          const before = frames[index - offset];
          if (before?.complete) {
            drawImage(context, before, canvas);
            return;
          }
          const after = frames[index + offset];
          if (after?.complete) {
            drawImage(context, after, canvas);
            return;
          }
        }
        return;
      }
      drawImage(context, img, canvas);
    };

    const drawImage = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cvs: HTMLCanvasElement
    ) => {
      const dpr = window.devicePixelRatio || 1;
      const cw = cvs.width / dpr;
      const ch = cvs.height / dpr;

      // Cover mode
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;
      let drawW, drawH, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawH = ch;
        drawW = ch * imgRatio;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      } else {
        drawW = cw;
        drawH = cw / imgRatio;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          frames[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadFrames = async () => {
      // Load initial frames immediately
      const initialPromises = [];
      for (let i = 0; i < INITIAL_FRAMES; i++) {
        initialPromises.push(loadImage(i));
      }
      await Promise.all(initialPromises);

      // Render first frame
      renderFrame(0);

      // Load remaining in batches
      for (let start = INITIAL_FRAMES; start < FRAME_COUNT; start += BATCH_SIZE) {
        const batch = [];
        for (let i = start; i < Math.min(start + BATCH_SIZE, FRAME_COUNT); i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
      }
    };

    loadFrames();

    // GSAP ScrollTrigger animation
    const frameObj = { frame: 0 };

    gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: () => {
          renderFrame(Math.round(frameObj.frame));
        },
      },
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="scroll-video" ref={containerRef} className="relative h-[500vh]">
      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-end justify-center pb-20 pointer-events-none">
          <div className="text-center">
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase mb-2">
              Scroll to reveal
            </p>
            <p className="text-cream/40 text-sm">The Unboxing Experience</p>
          </div>
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(38,0,8,0.6)_100%)]" />

        {/* Loading indicator */}
        {loadProgress < 100 && (
          <div className="absolute bottom-4 right-4 text-gold/40 text-xs tracking-wider">
            Loading {loadProgress}%
          </div>
        )}
      </div>
    </div>
  );
}
