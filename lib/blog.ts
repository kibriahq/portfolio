// =============================================================================
// BLOG DATA LAYER
// Replace getAllPosts / getPostBySlug internals with real fetch() calls to
// backend API once available. Keep function signatures the same.
// Example: const res = await fetch(`${API}/blogs`, { cache: "no-store" });
//          const posts: BlogPost[] = await res.json();
// Everything else (typing, parsing, sorting, related-posts) can stay intact.
// =============================================================================

import mockBlogs from "@/content/mock-blogs.json";
import type { BlogPost, NormalizedBlogPost } from "@/types/blog";

const POSTS = mockBlogs as BlogPost[];

/** Split the comma-separated tags string into a trimmed array. */
export function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Normalize a raw post: parse tags + ensure fields used by the UI exist. */
export function normalizePost(post: BlogPost): NormalizedBlogPost {
  return {
    ...post,
    tags: parseTags(post.tags),
    readingTime: post.readingTime || estimateReadingTime(post.content),
  };
}

/** Rough reading-time estimate (words / 200 wpm) used only as a fallback. */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Newest first by createdAt. */
export function sortPostsByDate(posts: NormalizedBlogPost[]): NormalizedBlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** "Aug 12, 2026" — fixed locale so SSR and client output match. */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** "5 min read" */
export function getReadingTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Fetch all published posts, sorted newest-first.
 * Currently reads from a local mock JSON; swap the body for a real API call.
 */
export async function getAllPosts(): Promise<NormalizedBlogPost[]> {
  const posts = POSTS.filter((p) => p.status === "PUBLISHED").map(normalizePost);
  return sortPostsByDate(posts);
}

/**
 * Fetch a single post by slug.
 * Currently reads from a local mock JSON; swap the body for a real API call.
 */
export async function getPostBySlug(slug: string): Promise<NormalizedBlogPost | null> {
  const post = POSTS.find((p) => p.slug === slug && p.status === "PUBLISHED");
  return post ? normalizePost(post) : null;
}

/** Distinct, sorted list of all tags across the given posts. */
export function getAllTags(posts: NormalizedBlogPost[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Up to `limit` posts sharing at least one tag with the given post. */
export function getRelatedPosts(
  post: NormalizedBlogPost,
  allPosts: NormalizedBlogPost[],
  limit = 3,
): NormalizedBlogPost[] {
  return allPosts
    .filter((p) => p.id !== post.id)
    .map((p) => {
      const shared = p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.post);
}
