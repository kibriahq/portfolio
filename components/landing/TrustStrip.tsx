"use client";

import { STATS, TRUST_TECH } from "@/lib/data";
import Reveal from "../Reveal";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useCounterAnimation(triggerRef: RefObject<HTMLDivElement | null>) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const counterEl = el.current;

    if (!triggerEl || !counterEl) return;

    counterEl.textContent = "0";

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: parseInt(counterEl.dataset.value || "0"),
      duration: 2,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        counterEl.textContent = Math.round(obj.val).toLocaleString();
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top 85%",
      once: true,
      onEnter: () => {
        tween.play();
      },
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [triggerRef]);

  return el;
}

/**
 * Thin credibility strip below the hero: a stat line + a row of tech names
 * that sit in a muted state and light up (accent) on hover.
 */
export default function TrustStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const projectsCounterRef = useCounterAnimation(stripRef);
  const experienceCounterRef = useCounterAnimation(stripRef);
  const satisfactionCounterRef = useCounterAnimation(stripRef);

  const stats = STATS.map((stat, index) => {
    const ref =
      index === 0
        ? projectsCounterRef
        : index === 1
          ? experienceCounterRef
          : satisfactionCounterRef;

    return { ...stat, ref };
  });

  return (
    <Reveal
      as="section"
      className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop"
    >
      <div ref={stripRef} className="rounded-2xl border border-border bg-surface/40 px-6 py-8">
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center min-w-44">
              <div className="font-display text-headline font-bold text-foreground">
                <span ref={stat.ref} data-value={stat.value}>
                  {stat.value}
                </span>
                {stat.unit}
              </div>
              <div className="mt-1 font-mono text-label-sm uppercase tracking-widest text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="my-7 h-px bg-border" />

        {/* Tech row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_TECH.map((tech) => (
            <span
              key={tech}
              className="cursor-default font-mono text-body-md font-medium text-muted opacity-70 transition-all hover:text-primary hover:opacity-100 hover:[text-shadow:0_0_10px_#8b8bff]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
