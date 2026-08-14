import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { NormalizedProject } from "@/types/project";
import { formatProjectDate } from "@/lib/project";
import { GithubIcon } from "../BrandIcons";

// Gradient placeholders used when a project has no cover image.
const GRADIENTS = [
  "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20",
  "from-sky-500/30 via-blue-500/20 to-cyan-500/20",
  "from-emerald-500/30 via-teal-500/20 to-green-500/20",
  "from-amber-500/30 via-orange-500/20 to-rose-500/20",
];

function gradientFor(id: string): string {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
}

type ProjectCardProps = {
  project: NormalizedProject;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group glass-card flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1 focus-within:-translate-y-1">
      {/* Cover image (with gradient fallback) */}
      <div
        className={`relative aspect-16/10 w-full overflow-hidden bg-linear-to-br ${
          project.coverImage ? "" : gradientFor(project.id)
        }`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid-overlay absolute inset-0 opacity-60" />
        )}

        {/* Whole-cover link to the detail page */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title}`}
          className="absolute inset-0"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Tag badges */}
        {project.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-display text-body-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {project.subTitle && (
          <p className="mt-1 font-sans text-body-md text-muted">
            {project.subTitle}
          </p>
        )}

        {project.excerpt && (
          <p className="mt-2 line-clamp-3 font-sans text-body-md text-muted">
            {project.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between pt-5 font-mono text-label-sm text-muted">
          <time dateTime={project.createdAt}>
            {formatProjectDate(project.createdAt)}
          </time>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  aria-label={`${project.title} source on GitHub`}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
