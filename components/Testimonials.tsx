import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop">
      <Reveal className="mb-12 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
          Testimonials
        </span>
        <h2 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
          What clients say
        </h2>
        <p className="mt-4 font-sans text-body-lg text-muted">
          <span className="text-muted/70">
            [Placeholder testimonials — replace with real client feedback.]
          </span>
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 0.1}
            className="glass-card flex flex-col rounded-2xl p-6"
          >
            <Quote className="h-7 w-7 text-primary/60" />
            <p className="mt-4 flex-1 font-sans text-body-md text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <div className="font-display text-body-md font-semibold text-foreground">
                {t.name}
              </div>
              <div className="font-sans text-body-md text-muted">{t.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
