// =============================================================================
// PROJECTS DATA LAYER
// Fetches published project content from the CMS API. The API domain is
// configurable via the CMS_API_URL environment variable (server-only),
// falling back to https://cms.kibria.dev. Function signatures mirror the blog
// and case-study data layers so the rest of the app keeps working.
// =============================================================================

import type { Project, NormalizedProject } from "@/types/project";

/**
 * Base URL of the CMS API. Override with the CMS_API_URL env var so the
 * domain can be swapped per environment (local, staging, production).
 */
export const CMS_API_URL = (
  process.env.CMS_API_URL ?? "https://cms.kibria.dev"
).replace(/\/+$/, "");

/** Default revalidation window (seconds) for list endpoints. */
const LIST_REVALIDATE = 60;

/** Split the comma-separated tags string into a trimmed array. */
export function parseTags(tags: string[] | string): string[] {
  if (Array.isArray(tags)) {
    return tags.map((t) => t.trim()).filter(Boolean);
  }
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Normalize a raw project: parse tags + ensure fields used by the UI exist. */
export function normalizeProject(project: Project): NormalizedProject {
  return {
    ...project,
    tags: parseTags(project.tags),
    related: (project.related ?? []).map(normalizeProject),
  };
}

/** Newest first by createdAt. */
export function sortProjectsByDate(
  projects: NormalizedProject[],
): NormalizedProject[] {
  return [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** "Aug 12, 2026" — fixed locale so SSR and client output match. */
export function formatProjectDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
 * Fetch all published projects, sorted newest-first.
 * GET /api/projects
 */
export async function getAllProjects(
  options: { hideFeatured?: boolean; tags?: string[] } = {},
): Promise<NormalizedProject[]> {
  const params = new URLSearchParams();
  if (options.hideFeatured) params.set("hideFeatured", "true");
  if (options.tags && options.tags.length > 0) {
    params.set("tags", options.tags.join(","));
  }
  const query = params.toString();
  const path = `/api/projects${query ? `?${query}` : ""}`;
  const projects = await cmsGet<Project[]>(path, {
    next: { revalidate: LIST_REVALIDATE },
  });
  return sortProjectsByDate(projects.map(normalizeProject));
}

/**
 * Fetch all featured published projects.
 * GET /api/projects/featured
 */
export async function getFeaturedProjects(): Promise<NormalizedProject[]> {
  const projects = await cmsGet<Project[]>("/api/projects/featured", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return sortProjectsByDate(projects.map(normalizeProject));
}

/**
 * Fetch all published projects with a non-zero displayOrder, ranked.
 * GET /api/projects/ordered-list
 */
export async function getOrderedProjects(): Promise<NormalizedProject[]> {
  const projects = await cmsGet<Project[]>("/api/projects/ordered-list", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return projects.map(normalizeProject);
}

/**
 * Fetch a single published project by slug.
 * GET /api/projects/[slug]
 * Returns null on 404 so callers can trigger notFound().
 */
export async function getProjectBySlug(
  slug: string,
): Promise<NormalizedProject | null> {
  const res = await fetch(
    `${CMS_API_URL}/api/projects/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): /api/projects/${slug}`);
  }
  const project = (await res.json()) as Project;
  return normalizeProject(project);
}

/** Distinct, sorted list of all tags across the given projects. */
export function getAllTags(projects: NormalizedProject[]): string[] {
  const set = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
