import Link from "next/link";
import Image from "next/image";
import type { NormalizedCaseStudy } from "@/types/caseStudy";
import { formatCaseStudyDate } from "@/lib/caseStudy";

// Gradient placeholders used when a case study has no cover image.
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

type CaseStudyCardProps = {
  study: NormalizedCaseStudy;
};

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group glass-card flex flex-col overflow-hidden rounded-2xl hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      {/* Cover image (with gradient fallback) */}
      <div
        className={`relative aspect-16/10 w-full overflow-hidden bg-linear-to-br ${
          study.coverImage ? "" : gradientFor(study.id)
        }`}
      >
        {study.coverImage ? (
          <Image
            src={study.coverImage}
            alt={`${study.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid-overlay absolute inset-0 opacity-60" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Tag badges */}
        {study.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
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
          {study.title}
        </h3>

        {study.excerpt && (
          <p className="mt-2 line-clamp-4 font-sans text-body-md text-muted">
            {study.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-auto flex items-center gap-3 pt-5 font-mono text-label-sm text-muted">
          <time dateTime={study.createdAt}>
            {formatCaseStudyDate(study.createdAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
