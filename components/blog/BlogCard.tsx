import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { NormalizedBlogPost } from "@/types/blog";
import { formatPostDate, getReadingTimeLabel } from "@/lib/blog";
import { formatTag } from "@/utils/formateTag";

// Gradient placeholders used when a post has no cover image.
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

type BlogCardProps = {
  post: NormalizedBlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group glass-card flex flex-col overflow-hidden rounded-2xl hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      {/* Cover image (with gradient fallback) */}
      <div
        className={`relative aspect-16/10 w-full overflow-hidden bg-linear-to-br ${
          post.coverImage ? "" : gradientFor(post.id)
        }`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`${post.title} cover`}
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
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
              >
                {formatTag(tag)}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-display text-body-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-2 font-sans text-body-md text-muted">
            {post.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-auto flex items-center gap-3 pt-5 font-mono text-label-sm text-muted">
          <time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {getReadingTimeLabel(post.readingTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}
