import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-container-max flex-col items-center justify-center px-margin-mobile text-center md:px-margin-desktop">
      <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
        404
      </span>
      <h1 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
        Project not found
      </h1>
      <p className="mt-4 max-w-md font-sans text-body-lg text-muted">
        The project you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/projects"
        className="mt-8 rounded-full bg-primary-strong px-5 py-2.5 font-sans text-body-md font-semibold text-on-primary transition-transform hover:scale-[1.03] active:scale-95"
      >
        Back to projects
      </Link>
    </main>
  );
}
