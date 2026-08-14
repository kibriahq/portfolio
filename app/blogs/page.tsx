import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TagFilter from "@/components/blog/TagFilter";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Articles on web development, frameworks, and the craft of building modern applications — by Md Kibria.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blogs | Md Kibria",
    description:
      "Articles on web development, frameworks, and the craft of building modern applications.",
    url: "/blogs",
    type: "website",
  },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-32 md:px-margin-desktop md:pt-40">
      {/* Hero */}
      <Reveal className="mb-12 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary block">
          Writing
        </span>
        <h1 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
          Blogs
        </h1>
        <p className="mt-4 font-sans text-body-lg text-muted">
          Notes, guides, and lessons from building web apps with Next.js,
          Laravel, and everything in between.
        </p>
      </Reveal>

      <TagFilter posts={posts} />
    </main>
  );
}
