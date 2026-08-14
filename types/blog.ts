// Shared blog domain types. These mirror the shape returned by the future
// backend CMS API so the data layer can be swapped without touching UI code.

export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Raw HTML produced by a Tiptap editor. Render via dangerouslySetInnerHTML. */
  content: string;
  coverImage: string;
  coverImagePublicId: string;
  metaTitle: string;
  metaDescription: string;
  status: BlogStatus;
  readingTime: number;
  /** Comma-separated tags, e.g. "Laravel, Web Development". */
  tags: string;
  featured: boolean;
  displayOrder: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: BlogCategory;
  /** Related posts provided by the API (GET /api/blogs/[slug]). */
  related?: BlogPost[];
}

/** Normalized view of a post with parsed tags + formatted helpers. */
export interface NormalizedBlogPost extends Omit<BlogPost, "tags" | "related"> {
  tags: string[];
  related: NormalizedBlogPost[];
}
