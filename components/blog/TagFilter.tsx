"use client";

import { useMemo, useState } from "react";
import type { NormalizedBlogPost } from "@/types/blog";
import { getAllTags, sortPostsByDate } from "@/lib/blog";
import BlogCard from "./BlogCard";

type TagFilterProps = {
  posts: NormalizedBlogPost[];
};

const ALL = "All";

export default function TagFilter({ posts }: TagFilterProps) {
  const [active, setActive] = useState<string>(ALL);

  const tags = useMemo(() => [ALL, ...getAllTags(posts)], [posts]);

  const visible = useMemo(() => {
    const filtered =
      active === ALL
        ? posts
        : posts.filter((p) => p.tags.includes(active));
    return sortPostsByDate(filtered);
  }, [posts, active]);

  const hasPosts = posts.length > 0;

  return (
    <div>
      {/* Filter bar */}
      {hasPosts && (
        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = tag === active;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 font-mono text-label-sm transition-colors ${
                  isActive
                    ? "border-primary-strong bg-primary-strong text-on-primary"
                    : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid / empty state */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : hasPosts ? (
        <p className="py-20 text-center font-sans text-body-lg text-muted">
          No posts match this tag yet.
        </p>
      ) : (
        <p className="py-20 text-center font-sans text-body-lg text-muted">
          No posts yet, check back soon.
        </p>
      )}
    </div>
  );
}
