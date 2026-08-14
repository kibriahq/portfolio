// =============================================================================
// CASE STUDIES DATA LAYER
// Fetches published case study content from the CMS API. The API domain is
// configurable via the CMS_API_URL environment variable (server-only),
// falling back to https://cms.kibria.dev. Function signatures mirror the blog
// data layer so the rest of the app keeps working.
// =============================================================================

import type { CaseStudy, NormalizedCaseStudy } from "@/types/caseStudy";

/**
 * Base URL of the CMS API. Override with the CMS_API_URL env var so the
 * domain can be swapped per environment (local, staging, production).
 */
export const CMS_API_URL = (
  process.env.CMS_API_URL ?? "https://cms.kibria.dev"
).replace(/\/+$/, "");

/** Default revalidation window (seconds) for list endpoints. */
const LIST_REVALIDATE = 60;

/** Normalize a raw case study: ensure fields used by the UI exist. */
export function normalizeCaseStudy(
  study: CaseStudy,
): NormalizedCaseStudy {
  return {
    ...study,
    tags: study.tags ?? [],
    related: (study.related ?? []).map(normalizeCaseStudy),
  };
}

/** Newest first by createdAt. */
export function sortCaseStudiesByDate(
  studies: NormalizedCaseStudy[],
): NormalizedCaseStudy[] {
  return [...studies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** "Aug 12, 2026" — fixed locale so SSR and client output match. */
export function formatCaseStudyDate(date: string): string {
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
 * Fetch all published case studies, sorted newest-first.
 * GET /api/case-studies
 */
export async function getAllCaseStudies(
  options: { hideFeatured?: boolean; tech?: string[] } = {},
): Promise<NormalizedCaseStudy[]> {
  const params = new URLSearchParams();
  if (options.hideFeatured) params.set("hideFeatured", "true");
  if (options.tech && options.tech.length > 0) {
    params.set("tech", options.tech.join(","));
  }
  const query = params.toString();
  const path = `/api/case-studies${query ? `?${query}` : ""}`;
  const studies = await cmsGet<CaseStudy[]>(path, {
    next: { revalidate: LIST_REVALIDATE },
  });
  return sortCaseStudiesByDate(studies.map(normalizeCaseStudy));
}

/**
 * Fetch all featured published case studies.
 * GET /api/case-studies/featured
 */
export async function getFeaturedCaseStudies(): Promise<NormalizedCaseStudy[]> {
  const studies = await cmsGet<CaseStudy[]>("/api/case-studies/featured", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return sortCaseStudiesByDate(studies.map(normalizeCaseStudy));
}

/**
 * Fetch all published case studies with a non-zero displayOrder, ranked.
 * GET /api/case-studies/ordered-list
 */
export async function getOrderedCaseStudies(): Promise<NormalizedCaseStudy[]> {
  const studies = await cmsGet<CaseStudy[]>("/api/case-studies/ordered-list", {
    next: { revalidate: LIST_REVALIDATE },
  });
  return studies.map(normalizeCaseStudy);
}

/**
 * Fetch a single published case study by slug.
 * GET /api/case-studies/[slug]
 * Returns null on 404 so callers can trigger notFound().
 */
export async function getCaseStudyBySlug(
  slug: string,
): Promise<NormalizedCaseStudy | null> {
  const res = await fetch(
    `${CMS_API_URL}/api/case-studies/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): /api/case-studies/${slug}`);
  }
  const study = (await res.json()) as CaseStudy;
  return normalizeCaseStudy(study);
}

/** Distinct, sorted list of all tags across the given case studies. */
export function getAllTags(studies: NormalizedCaseStudy[]): string[] {
  const set = new Set<string>();
  studies.forEach((s) => s.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
