"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { HERO_ROLES } from "@/lib/data";

/** Lightweight typewriter that cycles through HERO_ROLES. */
function useTypingRoles(roles: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      // Pause on the full word before deleting.
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      // Advance to the next word (state updates happen inside the timeout,
      // not synchronously in the effect body).
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }, 400);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? 45 : 85,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return text;
}

export default function Hero() {
  const typed = useTypingRoles(HERO_ROLES);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-container-max flex-col items-center justify-center px-margin-mobile pb-16 pt-32 text-center md:px-margin-desktop"
    >
      {/* Availability badge */}
      <div className="fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-label-sm uppercase tracking-widest text-muted">
          Available for freelance work
        </span>
      </div>

      {/* Headline */}
      <h1 className="font-display text-headline-lg font-bold leading-tight text-foreground md:text-display text-glow">
        I build fast, production-ready
        <br className="hidden sm:block" /> web apps with{" "}
        <span className="text-primary">Next.js &amp; React</span>
      </h1>

      {/* Subheadline */}
      <p className="mx-auto mt-6 max-w-2xl font-sans text-body-lg text-muted">
        Full-stack developer specializing in scalable backends, real-time
        features, and clean, maintainable code — from database to pixel.
      </p>

      {/* Typing role line */}
      <p className="mt-4 font-mono text-body-md text-muted">
        <span className="text-primary">&gt;</span> {typed}
        <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-primary" />
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#work"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-strong px-7 py-3.5 font-sans text-body-md font-semibold text-on-primary transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
        >
          View My Work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/50 px-7 py-3.5 font-sans text-body-md font-semibold text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
        >
          <Mail className="h-4 w-4" />
          Get in Touch
        </a>
      </div>
    </section>
  );
}
