"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { SITE, SOCIALS } from "@/lib/data";
import Reveal from "./Reveal";

const SOCIAL_LINKS = [
  { label: "GitHub", href: SOCIALS.github, icon: GithubIcon, text: null },
  { label: "LinkedIn", href: SOCIALS.linkedin, icon: LinkedinIcon, text: null },
  { label: "Upwork", href: SOCIALS.upwork, icon: null, text: "Up" },
  { label: "Fiverr", href: SOCIALS.fiverr, icon: null, text: "fi" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  // [PLACEHOLDER] No backend wired up. Falls back to a mailto: link so the
  // message is never lost. Swap for an API route / form service later.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Project inquiry from ${name}`,
    )}&body=${body}`;
    setSent(true);
  };

  const inputClasses =
    "w-full rounded-md border border-border bg-background/60 px-4 py-3 font-sans text-body-md text-foreground placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none";

  return (
    <section
      id="contact"
      className="mx-auto max-w-container-max scroll-mt-24 px-margin-mobile py-24 md:px-margin-desktop"
    >
      <Reveal className="glass-card overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Closing pitch + socials */}
          <div>
            <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
              Contact
            </span>
            <h2 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
              Let&apos;s build something great together
            </h2>
            <p className="mt-4 font-sans text-body-lg text-muted">
              Have a project in mind or just want to talk through an idea? Send a
              message and I&apos;ll get back to you within 24 hours.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-strong px-6 py-3 font-sans text-body-md font-semibold text-on-primary transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Mail className="h-4 w-4" />
                Email Me
              </a>
              <label
              htmlFor="name"
                className="font-sans text-body-md text-muted transition-colors hover:text-primary"
              >
                or schedule a call →
              </label>
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {s.icon ? (
                    <s.icon className="h-5 w-5" />
                  ) : (
                    <span className="font-display text-body-md font-bold">
                      {s.text}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form action="https://formspree.io/f/manwkrpg" method="POST" className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block font-sans text-body-md text-muted"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-sans text-body-md text-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@company.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block font-sans text-body-md text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className={`${inputClasses} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-strong px-6 py-3.5 font-sans text-body-md font-semibold text-on-primary transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Send Message
            </button>
            {sent && (
              <p
                role="status"
                className="font-sans text-body-md text-primary"
              >
                Opening your email client… if nothing happens, email{" "}
                {SITE.email}.
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
