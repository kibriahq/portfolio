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
  email: "hello@kibria.dev",
  calendly: "#", // [PLACEHOLDER] "Schedule a Call" link
};

export const SOCIALS = {
  github: "https://github.com/kibriahq",
  linkedin: "https://www.linkedin.com/in/kibria-dev",
  upwork: "mailto:hello@kibria.dev", // [PLACEHOLDER] Upwork profile URL
  fiverr: "mailto:hello@kibria.dev", // [PLACEHOLDER] Fiverr profile URL
};

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
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
  { value: "17", unit: "+", label: "Projects Delivered" },
  { value: "03", unit: "+", label: "Years Coding" },
  { value: "100", unit: "%", label: "Client Satisfaction" },
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
  thumbnail: string;
  image: string; // gradient placeholder key (see Projects component)
  demo: string;
  github: string;
};

// [PLACEHOLDER] Featured projects — replace with real case studies + screenshots
export const PROJECTS: Project[] = [
  {
    title: "RecipeVerse AI",
    tagline: "Full-Stack Social Recipe Platform with AI Assistant",
    problem: "Users waited on slow, batch-generated reports and churned.",
    solution:
      "I built a Full-stack social recipe platform built with Next.js 15, TypeScript, and Supabase. Users create, publish, and discover recipes, follow creators, like recipes, and get AI cooking help via the Gemini API (ingredient scaling, substitutions, Q&A).",
    result: "Report load times dropped from 8s to under 400ms.",
    tags: ["Next.js", "Supabase", "AI Chatbot", "Tailwind CSS", "PostgreSQL"],
    thumbnail: "/projects/recipe verse.png",
    image: "violet",
    demo: "https://recipeverseai-dev.vercel.app/explore",
    github: "#",
  },
  {
    title: "MealMint",
    tagline: "Responsive Meal Planning App",
    problem: "Client needed vendor payouts and checkout without a huge team.",
    solution:
      "A fully client-side meal planning app built with plain HTML, CSS, and JavaScript, no frameworks, no server. Users pick a fitness goal, browse a filterable recipe library, drag meals into a 7-day calendar, and instantly see how their day stacks up against target calorie and macro ranges. A shopping list auto-generates from the weekly plan, grouped by category and print-ready.",
    result: "Processed $250k+ in GMV within the first quarter.",
    tags: ["JavaScript", "Tailwind CSS","HTML", "CSS",  "Responsive Design"],
    thumbnail: "/projects/Saas Landing Pages.png",
    image: "blue",
    demo: "https://mealmint-demo.vercel.app/mealmint-index.html",
    github: "#",
  },
  {
    title: "Link Engine",
    tagline: "Smart URL Shortener with Real-Time Analytics Dashboard",
    problem: "Distributed team lacked a fast, collaborative content tool.",
    solution:
      "Built a full-stack URL shortener platform with advanced analytics tracking. Users can generate short links and monitor real-time performance, total clicks, visitor geolocation, device type, browser, and referrer source through a clean analytics dashboard. Implemented using Next.js (Edge Runtime for fast redirects), TypeScript, and Supabase for data storage and auth.",
    result: "Adopted by 40+ internal users in week one.",
    tags: ["Next.js", "TypeScript", "Tailwind", "REST APIs", "Analytics"],
    thumbnail: "/projects/link management.png",
    image: "emerald",
    demo: "https://link.kibria.dev/",
    github: "https://github.com/kibriahq/link-management-system",
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

// Testimonials —  real client feedback
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
