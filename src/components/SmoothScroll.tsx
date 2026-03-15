"use client";

// SmoothScroll is intentionally a passthrough.
// Lenis is initialized inside ScrollVideo and synced with GSAP ticker
// (matching TappinAI.com's architecture). No duplicate Lenis instance needed.

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
