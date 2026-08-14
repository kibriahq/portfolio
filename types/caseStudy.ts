// Shared case-study domain types. These mirror the shape returned by the CMS
// Case Studies API so the data layer can be swapped without touching UI code.

export type CaseStudyStatus = "DRAFT" | "PUBLISHED";

export interface CaseStudy {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  excerpt: string;
  /** Raw HTML produced by a Tiptap editor. Render via dangerouslySetInnerHTML. */
  content: string;
  coverImage: string;
  coverImagePublicId: string;
  tags: string[];
  status: CaseStudyStatus;
  featured: boolean;
  displayOrder: number;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  /** Related case studies provided by the API (GET /api/case-studies/[slug]). */
  related?: CaseStudy[];
}

/** Normalized view of a case study with parsed related entries. */
export interface NormalizedCaseStudy extends Omit<CaseStudy, "related"> {
  related: NormalizedCaseStudy[];
}
