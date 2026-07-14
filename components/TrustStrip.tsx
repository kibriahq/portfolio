import { STATS, TRUST_TECH } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * Thin credibility strip below the hero: a stat line + a row of tech names
 * that sit in a muted state and light up (accent) on hover.
 */
export default function TrustStrip() {
  return (
    <Reveal
      as="section"
      className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop"
    >
      <div className="rounded-2xl border border-border bg-surface/40 px-6 py-8">
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-headline font-bold text-foreground">
                {stat.value}
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
              className="cursor-default font-mono text-body-md font-medium text-muted opacity-70 transition-all hover:text-primary hover:opacity-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
