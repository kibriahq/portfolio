import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TagFilter from "@/components/project/TagFilter";
import { getAllProjects } from "@/lib/project";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of products, apps, and experiments I've designed and built — from client work to open-source side projects.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Md Kibria",
    description:
      "A selection of products, apps, and experiments I've designed and built.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-28 md:px-margin-desktop md:pt-34">
      {/* Hero */}
      <Reveal className="mb-10 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary block">
          Selected Work
        </span>
        <h1 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
          Projects
        </h1>
        <p className="mt-4 font-sans text-body-lg text-muted">
          Things I&apos;ve shipped — apps, sites, and tools built with a focus on
          clean UX and pragmatic engineering.
        </p>
      </Reveal>

      <TagFilter projects={projects} />
    </main>
  );
}
