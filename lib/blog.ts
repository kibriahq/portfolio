// =============================================================================
// BLOG DATA LAYER
// Fetches published blog content from the CMS API. The API domain is
// configurable via the CMS_API_URL environment variable (server-only),
// falling back to https://cms.kibria.dev. Function signatures are unchanged
// so the rest of the app keeps working.
// =============================================================================

import type { BlogPost, NormalizedBlogPost } from "@/types/blog";

/**
 * Base URL of the CMS API. Override with the CMS_API_URL env var so the
 * domain can be swapped per environment (local, staging, production).
 * Example: CMS_API_URL=https://cms.example.com
 */
export const CMS_API_URL = (
  process.env.CMS_API_URL ?? "https://cms.kibria.dev"
).replace(/\/+$/, "");

/** Default revalidation window (seconds) for list endpoints. */
const LIST_REVALIDATE = 60;

/** Split the comma-separated tags string into a trimmed array. */
export function parseTags(tags: string | string[]): string[] {
  if (Array.isArray(tags)) {
    return tags.map((t) => t.trim()).filter(Boolean);
  }
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
    readingTime: post.readingTime ?? 'null',
    related: (post.related ?? []).map(normalizePost),
  };
}

/** Rough reading-time estimate (words / 200 wpm) used only as a fallback. */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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

/** Low-level GET against the CMS API that tolerates non-2xx responses. */
async function cmsGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${CMS_API_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): ${path}`);
  }
  return (await res.json()) as T;
}

/**
 * Fetch all published posts, sorted newest-first.
 * GET /api/blogs
 */
export async function getAllPosts(
  options: { hideFeatured?: boolean; tags?: string[] } = {},
): Promise<NormalizedBlogPost[]> {
  const params = new URLSearchParams();
  if (options.hideFeatured) params.set("hideFeatured", "true");
  if (options.tags && options.tags.length > 0) {
    params.set("tags", options.tags.join(","));
  }
  const query = params.toString();
  const path = `/api/blogs${query ? `?${query}` : ""}`;
  const posts = await cmsGet<BlogPost[]>(path, {
    next: { revalidate: LIST_REVALIDATE },
  });
  return posts.map(normalizePost);
}

/**
 * Fetch all featured published posts.
 * GET /api/blogs/featured
 */
export async function getFeaturedPosts(): Promise<NormalizedBlogPost[]> {
  const posts = await cmsGet<BlogPost[]>("/api/blogs/featured", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return posts.map(normalizePost);
}

/**
 * Fetch all published posts with a non-zero displayOrder, ranked.
 * GET /api/blogs/ordered-list
 */
export async function getOrderedPosts(): Promise<NormalizedBlogPost[]> {
  const posts = await cmsGet<BlogPost[]>("/api/blogs/ordered-list", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return posts.map(normalizePost);
}

/**
 * Fetch a single published post by slug.
 * GET /api/blogs/[slug]
 * Returns null on 404 so callers can trigger notFound().
 */
export async function getPostBySlug(slug: string): Promise<NormalizedBlogPost | null> {
  const res = await fetch(`${CMS_API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): /api/blogs/${slug}`);
  }
  const post = (await res.json()) as BlogPost;
  return normalizePost(post);
}

/** Distinct, sorted list of all tags across the given posts. */
export function getAllTags(posts: NormalizedBlogPost[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

