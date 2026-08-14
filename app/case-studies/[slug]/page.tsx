import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";
import CaseStudyCard from "@/components/case-study/CaseStudyCard";
import Reveal from "@/components/Reveal";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  formatCaseStudyDate,
} from "@/lib/caseStudy";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const studies = await getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  const url = `/case-studies/${study.slug}`;
  return {
    title: study.metaTitle || study.title,
    description: study.metaDescription || study.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: study.metaTitle || study.title,
      description: study.metaDescription || study.excerpt,
      url,
      type: "article",
      publishedTime: study.createdAt,
      modifiedTime: study.updatedAt,
      tags: study.tags,
      images: study.coverImage
        ? [{ url: study.coverImage, width: 1200, height: 630, alt: study.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle || study.title,
      description: study.metaDescription || study.excerpt,
      images: study.coverImage ? [study.coverImage] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const related = study.related;

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-28 md:px-margin-desktop md:pt-36">
      {/* Back link */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 font-mono text-label-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to case studies
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        {/* Header */}
        <Reveal>
          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-headline font-bold text-foreground md:text-headline-lg">
            {study.title}
          </h1>

          {study.subTitle && (
            <p className="mt-3 font-sans text-body-lg text-muted">
              {study.subTitle}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3 font-mono text-label-sm text-muted">
            <time dateTime={study.createdAt}>
              {formatCaseStudyDate(study.createdAt)}
            </time>
          </div>
        </Reveal>

        {/* Cover image */}
        {study.coverImage && (
          <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={study.coverImage}
              alt={`${study.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Sanitized Tiptap HTML content */}
        <div className="mt-10">
          <BlogContent content={study.content} />
        </div>
      </article>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-container-max border-t border-border pt-12">
          <h2 className="mb-8 font-display text-headline font-bold text-foreground">
            Related case studies
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <CaseStudyCard key={s.id} study={s} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
