"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section", "li"). Defaults to div. */
  as?: ElementType;
  /** Animation delay in seconds (useful for staggering siblings). */
  delay?: number;
  /** Distance in px to slide up from. */
  y?: number;
};

/**
 * Scroll-triggered fade + slide-up wrapper powered by GSAP ScrollTrigger.
 * Kept subtle intentionally. The starting hidden state is defined in
 * globals.css ([data-reveal]) so content is graceful if JS is disabled
 * (prefers-reduced-motion also forces it visible).
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
