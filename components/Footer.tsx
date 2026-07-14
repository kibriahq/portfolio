import { SITE, SOCIALS } from "@/lib/data";

export default function Footer() {
  return (
    <>
      <footer className="w-full py-12 border-t border-glass-border bg-glass-fill/20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-gutter">
          <div className="order-1 md:order-1 justify-self-center md:justify-self-start font-display text-body-lg font-bold text-text-primary">
            {SITE.brand}
          </div>
          <div className="order-3 md:order-2 justify-self-center font-mono text-sm text-center md:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="order-2 md:order-3 justify-self-center md:justify-self-end flex gap-6">
            <a
              className="font-mono text-sm hover:text-primary transition-colors"
              href={`mailto:${SITE.email}`}
            >
              Mail
            </a>
            <a
              className="font-mono text-sm hover:text-primary transition-colors"
              href={SOCIALS.github}
            >
              GitHub
            </a>
            <a
              className="font-mono text-sm hover:text-primary transition-colors"
              href={SOCIALS.linkedin}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
