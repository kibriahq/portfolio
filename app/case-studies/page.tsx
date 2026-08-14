import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TagFilter from "@/components/case-study/TagFilter";
import { getAllCaseStudies } from "@/lib/caseStudy";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth case studies of products I've designed and built — the problem, the solution, and the measurable outcome.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Md Kibria",
    description:
      "In-depth case studies of products I've designed and built — the problem, the solution, and the measurable outcome.",
    url: "/case-studies",
    type: "website",
  },
};

export default async function CaseStudiesPage() {
  const studies = await getAllCaseStudies();

  return (
    <main className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-24 pt-28 md:px-margin-desktop md:pt-34">
      {/* Hero */}
      <Reveal className="mb-10 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary block">
          Selected Work
        </span>
        <h1 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
          Case Studies
        </h1>
        <p className="mt-4 font-sans text-body-lg text-muted">
          Real products, framed by the problem they solved, the approach I took,
          and the measurable result it delivered.
        </p>
      </Reveal>

      <TagFilter studies={studies} />
    </main>
  );
}
