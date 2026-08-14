import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";
import Reveal from "@/components/Reveal";
import {
  getAllPosts,
  getPostBySlug,
  formatPostDate,
  getReadingTimeLabel,
} from "@/lib/blog";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `/blogs/${post.slug}`;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = post.related;

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-28 md:px-margin-desktop md:pt-36">
      {/* Back link */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 font-mono text-label-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blogs
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        {/* Header */}
        <Reveal>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-headline font-bold text-foreground md:text-headline-lg">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 font-mono text-label-sm text-muted">
            <time dateTime={post.createdAt}>
              {formatPostDate(post.createdAt)}
            </time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {getReadingTimeLabel(post.readingTime)}
            </span>
          </div>
        </Reveal>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.coverImage}
              alt={`${post.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Sanitized Tiptap HTML content */}
        <div className="mt-10">
          <BlogContent content={post.content} />
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-container-max border-t border-border pt-12">
          <h2 className="mb-8 font-display text-headline font-bold text-foreground">
            Related posts
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
