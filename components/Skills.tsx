import { Code2, Server, Database } from "lucide-react";
import { SKILLS } from "@/lib/data";
import Reveal from "./Reveal";

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  "Database & Infra": Database,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-container-max scroll-mt-24 px-margin-mobile py-24 md:px-margin-desktop"
    >
      <Reveal className="mb-12 max-w-2xl">
        <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
          Toolkit
        </span>
        <h2 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg">
          Skills &amp; technologies
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SKILLS.map((group, i) => {
          const Icon = CATEGORY_ICONS[group.category] ?? Code2;
          return (
            <Reveal
              key={group.category}
              delay={i * 0.1}
              className="glass-card rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-body-lg font-semibold text-foreground">
                  {group.category}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1.5 font-mono text-body-md text-muted transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
