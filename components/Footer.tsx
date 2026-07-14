import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 px-margin-mobile py-10 md:flex-row md:px-margin-desktop">
        <div className="text-center md:text-left">
          <div className="font-display text-body-lg font-bold text-foreground">
            {SITE.brand}
          </div>
          <p className="mt-1 font-sans text-body-md text-muted">
            © {new Date().getFullYear()} {SITE.name}. Full-stack web developer.
          </p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-body-md text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex gap-3">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-primary"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-primary"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
