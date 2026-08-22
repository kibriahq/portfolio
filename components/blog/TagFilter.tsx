"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { NormalizedBlogPost } from "@/types/blog";
import { getAllTags } from "@/lib/blog";
import BlogCard from "./BlogCard";
import { formatTag } from "@/utils/formateTag";

type TagFilterProps = {
  posts: NormalizedBlogPost[];
};

const ALL = "All";
const PAGE_SIZE = 9;

export default function TagFilter({ posts }: TagFilterProps) {
  const [active, setActive] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef<boolean>(false);

  const tags = useMemo(() => [ALL, ...getAllTags(posts)], [posts]);

  const visible = useMemo(() => {
    const filtered =
      active === ALL
        ? posts
        : posts.filter((p) => p.tags.includes(active));
    return filtered;
  }, [posts, active]);

  // Reset the loaded count whenever the active filter changes.
  const handleSelect = (tag: string) => {
    setActive(tag);
    setVisibleCount(PAGE_SIZE);
  };

  const hasMore = visibleCount < visible.length;

  // Load the next page when the sentinel scrolls into view.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          // Brief delay so the loading state is perceptible.
          setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE);
            isLoadingRef.current = false;
          }, 300);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visible.length]);

  const hasPosts = posts.length > 0;
  const shownPosts = visible.slice(0, visibleCount);

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
                onClick={() => handleSelect(tag)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 font-mono text-label-sm transition-colors ${
                  isActive
                    ? "border-primary-strong bg-primary-strong text-on-primary"
                    : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {formatTag(tag)}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid / empty state */}
      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shownPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Infinite scroll sentinel + status */}
          {hasMore ? (
            <div
              ref={sentinelRef}
              className="flex items-center justify-center py-12"
              aria-hidden
            >
              <span className="font-mono text-label-sm text-muted">
                Loading more…
              </span>
            </div>
          ) : (
            <p className="py-12 text-center font-mono text-label-sm text-muted">
              You&apos;ve reached the end.
            </p>
          )}
        </>
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
