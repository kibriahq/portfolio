import sanitizeHtml from "sanitize-html";

type BlogContentProps = {
  content: string;
  className?: string;
};

export default function BlogContent({
  content,
  className,
}: BlogContentProps) {
  const clean = sanitizeHtml(content, {
    allowedTags: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "s",
      "blockquote",
      "code",
      "pre",
      "a",
      "br",
      "hr",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      "colgroup",
      "col",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      td: ["colspan", "rowspan", "align"],
      th: ["colspan", "rowspan", "align", "scope"],
      col: ["span"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return (
    <div
      className={`blog-prose ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}