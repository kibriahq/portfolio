// Shared project domain types. These mirror the shape returned by the CMS
// Projects API (GET /api/projects) so the data layer can be swapped without
// touching UI code.

export type ProjectStatus = "DRAFT" | "PUBLISHED";

export interface Project {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  excerpt: string;
  /** Raw HTML produced by a Tiptap editor. Render via dangerouslySetInnerHTML. */
  description: string;
  coverImage: string;
  coverImagePublicId: string;
  /** Tags may arrive as an array or a comma-separated string. */
  tags: string[] | string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  displayOrder: number;
  status: ProjectStatus;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  /** Related projects provided by the API (GET /api/projects/[slug]). */
  related?: Project[];
}

/** Normalized view of a project with parsed tags + formatted helpers. */
export interface NormalizedProject extends Omit<Project, "tags" | "related"> {
  tags: string[];
  related: NormalizedProject[];
}
