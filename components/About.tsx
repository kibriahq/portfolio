import Image from "next/image";
import { Clock, MessagesSquare, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/data";
import Reveal from "./Reveal";

const APPROACH = [
  {
    icon: MessagesSquare,
    title: "Clear communication",
    desc: "Frequent updates and plain-language explanations — no jargon walls.",
  },
  {
    icon: Clock,
    title: "Timezone flexible",
    desc: "Comfortable working across US, EU, and APAC client hours.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable delivery",
    desc: "Realistic estimates, tested code, and deadlines I actually hit.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-container-max scroll-mt-24 px-margin-mobile py-24 md:px-margin-desktop"
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[300px_1fr]">
        {/* Headshot */}
        <Reveal className="mx-auto">
          <div className="relative group">
            <div
              className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at center, var(--glow), transparent 70%)",
              }}
            />
            {/* desktop mode glow effect over image */}
            <div
              className="absolute -inset-3 rounded-full opacity-70 blur-2xl z-10 hidden md:block"
              style={{
                background:
                  "radial-gradient(circle at center, var(--glow), transparent 70%)",
              }}
            />
            <Image
              src="/kibria.jpg"
              alt={`Portrait of ${SITE.name}`}
              width={240}
              height={240}
              className="relative h-52 w-52 rounded-full border border-border-strong object-cover md:hidden"
            />
            <Image
              src="/kibria-portrait.png"
              alt={`Portrait of ${SITE.name}`}
              width={300}
              height={550}
              className="hidden glass-card group-hover:border-border-strong group-hover:shadow-[0_0_0_1px_var(--glass-border),0_20px_50px_-20px_var(--glow)] rounded-2xl border border-border-strong object-cover md:block md:h-[550px] md:w-[300px]"
            />
          </div>
        </Reveal>

        {/* Bio + approach */}
        <Reveal delay={0.1}>
          <span className="font-mono text-label-sm uppercase tracking-widest text-primary block text-center md:text-left">
            About
          </span>
          <h2 className="mt-3 font-display text-headline font-bold text-foreground md:text-headline-lg text-center md:text-left">
            A developer — <br/> who ships, and sticks around
          </h2>
          <p className="mt-4 font-sans text-body-lg text-muted text-center md:text-left">
            I&apos;m {SITE.name}, a full-stack developer with 3+ years building
            web applications for startups and agencies worldwide. I care about
            fast load times, clean architecture, and code the next developer can
            actually read. I have a strong foundation in both frontend and backend technologies, with experience in building scalable and maintainable web applications. I am a quick learner and can pick up new technologies as needed. I am passionate about building high-quality software and delivering value to my clients.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((item) => (
              <div
                key={item.title}
                className="first:col-span-1 md:first:col-span-2 lg:first:col-span-1 glass-card rounded-xl border border-border p-4 flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <item.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-display text-body-md font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 font-sans text-body-md text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
