import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { PROJECTS } from "@/lib/data";
import Reveal from "./Reveal";

// Gradient placeholders standing in for real project screenshots.
const IMAGE_GRADIENTS: Record<string, string> = {
  violet: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20",
  blue: "from-sky-500/30 via-blue-500/20 to-cyan-500/20",
  emerald: "from-emerald-500/30 via-teal-500/20 to-green-500/20",
};

export default function Projects() {
  return (
    <section
      id="work"
      className="mx-auto max-w-container-max scroll-mt-24 px-margin-mobile py-24 md:px-margin-desktop"
    >
      <Reveal className="mb-12 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary block text-center md:text-left">
          Featured Work
        </span>
        <h2 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg text-center md:text-left">
          Projects that shipped &amp; scaled
        </h2>
        <p className="mt-4 font-sans text-body-lg text-muted text-center md:text-left">
          A selection of my recent builds. Each one framed by the problem, the
          solution, and the measurable final result.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.title}
            delay={i * 0.1}
            className="group glass-card flex flex-col overflow-hidden rounded-2xl hover:-translate-y-1"
          >
            {/* Image placeholder */}
            <div
              className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${
                IMAGE_GRADIENTS[project.image] ?? IMAGE_GRADIENTS.violet
              }`}
            >
              <div className="grid-overlay absolute inset-0 opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-label-sm uppercase tracking-widest text-foreground/50">
                  Screenshot
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-body-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-1 font-sans text-body-md text-muted">
                {project.tagline}
              </p>

              {/* Problem -> Solution -> Result */}
              <dl className="mt-5 space-y-2.5 text-body-md">
                <div>
                  <dt className="font-mono text-label-sm uppercase tracking-wider text-muted/70">
                    Problem
                  </dt>
                  <dd className="text-foreground/90">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label-sm uppercase tracking-wider text-muted/70">
                    Solution
                  </dt>
                  <dd className="text-foreground/90">{project.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-label-sm uppercase tracking-wider text-primary/80">
                    Result
                  </dt>
                  <dd className="font-medium text-primary">{project.result}</dd>
                </div>
              </dl>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-body-md font-medium text-foreground transition-colors hover:text-primary"
                >
                  Live Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-body-md font-medium text-muted transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
