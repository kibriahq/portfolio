import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";
import ProjectCard from "@/components/project/ProjectCard";
import Reveal from "@/components/Reveal";
import {
  getAllProjects,
  getProjectBySlug,
  formatProjectDate,
} from "@/lib/project";
import { GithubIcon } from "@/components/BrandIcons";
import { formatTag } from "@/utils/formateTag";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `/projects/${project.slug}`;
  return {
    title: project.metaTitle || project.title,
    description: project.metaDescription || project.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.excerpt,
      url,
      type: "article",
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      tags: project.tags,
      images: project.coverImage
        ? [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.excerpt,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = project.related;

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-28 md:px-margin-desktop md:pt-36">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-label-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <article className="mx-auto mt-8 max-w-3xl">
        {/* Header */}
        <Reveal>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-label-sm text-muted"
              >
                {formatTag(tag)}
              </span>
            ))}
          </div>

          <h1 className="font-display text-headline font-bold text-foreground md:text-headline-lg">
            {project.title}
          </h1>

          {project.subTitle && (
            <p className="mt-3 font-sans text-body-lg text-muted">
              {project.subTitle}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-label-sm text-muted">
            <time dateTime={project.createdAt}>
              {formatProjectDate(project.createdAt)}
            </time>

            {(project.liveUrl || project.githubUrl) && (
              <span className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
              </span>
            )}
          </div>
        </Reveal>

        {/* Cover image */}
        {project.coverImage && (
          <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Sanitized Tiptap HTML content */}
        <div className="mt-10">
          <BlogContent content={project.description} />
        </div>
      </article>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-container-max border-t border-border pt-12">
          <h2 className="mb-8 font-display text-headline font-bold text-foreground">
            Related projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
