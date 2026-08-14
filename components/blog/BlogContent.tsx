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
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
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