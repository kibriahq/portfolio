"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

type BlogContentProps = {
  /** Raw HTML string from a Tiptap editor. Sanitized before rendering. */
  content: string;
  className?: string;
};

/**
 * Renders Tiptap-authored HTML safely. The content is sanitized with
 * DOMPurify (isomorphic build → works during SSR and in the browser) to
 * prevent XSS, since this HTML will eventually come from a live backend.
 */
export default function BlogContent({ content, className }: BlogContentProps) {
  const clean = useMemo(() => DOMPurify.sanitize(content), [content]);

  return (
    <div
      className={`blog-prose ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
