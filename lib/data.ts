// =============================================================================
// PLACEHOLDER CONTENT — swap these values with real data.
// Everything the page renders (projects, skills, testimonials, socials, etc.)
// lives here so the marketing copy can be edited without touching components.
// Items marked `[PLACEHOLDER]` are lorem/sample content.
// =============================================================================

export const SITE = {
  name: "Md Kibria",
  brand: "kibria.dev",
  role: "Full-Stack Web Developer",
  email: "hello@kibria.dev", // [PLACEHOLDER] replace with real email
  calendly: "#", // [PLACEHOLDER] "Schedule a Call" link
};

export const SOCIALS = {
  github: "https://github.com/kibriahq",
  linkedin: "https://www.linkedin.com/in/kibria-dev",
  upwork: "#", // [PLACEHOLDER] Upwork profile URL
  fiverr: "#", // [PLACEHOLDER] Fiverr profile URL
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Rotating role titles for the hero typing effect
export const HERO_ROLES = [
  "Next.js Developer",
  "React Specialist",
  "Full-Stack Engineer",
  "Node.js & API Developer",
];

// Trust strip stats
export const STATS = [
  { value: "17+", label: "Projects Delivered" },
  { value: "03+", label: "Years Coding" },
  { value: "100%", label: "Client Satisfaction" },
];

// Tech shown in the trust strip (grayscale → accent on hover)
export const TRUST_TECH = [
  "AI Integrate",
  "Next.js",
  "React",
  "Node.js",
  "Laravel",
  "Supabase",
  "PostgreSQL",
];

export type Project = {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  image: string; // gradient placeholder key (see Projects component)
  demo: string;
  github: string;
};

// [PLACEHOLDER] Featured projects — replace with real case studies + screenshots
export const PROJECTS: Project[] = [
  {
    title: "SaaS Analytics Dashboard",
    tagline: "Real-time metrics for a B2B SaaS platform",
    problem: "Users waited on slow, batch-generated reports and churned.",
    solution:
      "Built a real-time dashboard with Next.js, WebSockets and a cached Postgres read layer.",
    result: "Report load times dropped from 8s to under 400ms.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    image: "violet",
    demo: "#",
    github: "#",
  },
  {
    title: "Marketplace & Payments",
    tagline: "Two-sided marketplace with Stripe Connect",
    problem: "Client needed vendor payouts and checkout without a huge team.",
    solution:
      "Shipped a Node.js/Express API with Stripe Connect, MongoDB, and a React storefront.",
    result: "Processed $250k+ in GMV within the first quarter.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "blue",
    demo: "#",
    github: "#",
  },
  {
    title: "Realtime Team Workspace",
    tagline: "Collaborative docs with live presence",
    problem: "Distributed team lacked a fast, collaborative content tool.",
    solution:
      "Delivered a Supabase-powered app with row-level security and live presence.",
    result: "Adopted by 40+ internal users in week one.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
    image: "emerald",
    demo: "#",
    github: "#",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Laravel", "Auth", "Express.js", "REST APIs"],
  },
  {
    category: "Database & Infra",
    items: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Vercel"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// [PLACEHOLDER] Testimonials — replace with real client feedback
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dear Kibria, I don't know what else I will say but at the moment, keep up the good work.",
    name: "Chukwuebuka Emmanuel",
    role: "Founder, Magic Hit Int (Turkey)",
  },
  {
    quote:
      "He always co-operates and deliver on time, the quality of work is really good.",
    name: "Shivani Verma",
    role: "Agency Owner (India)",
  },
  {
    quote:
      "Working with Kibria has been nothing short of amazing! He built my website exactly as I wanted and went far beyond my expectations...",
    name: "Francis",
    role: "Founder, AmazingSKF (UK)",
  },
];
