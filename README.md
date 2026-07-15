# My Portfolio

Welcome to the source code of **my** personal portfolio — the site where I showcase my work as a **full-stack web developer**. I built it with the latest **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and **lucide-react** icons.

Live site: [kibria.dev](https://kibria.dev)

## What this site includes

- **Hero with a typewriter effect** — my role titles cycle automatically (`components/Hero.tsx`, driven by `HERO_ROLES` in `lib/data.ts`).
- **Custom cursor** — a trailing dot + ring that grow over links and buttons, with reduced-motion and touch-device fallbacks (`components/Cursor.tsx`).
- **Light / dark theme** — a toggle I persist to `localStorage`, using an inline pre-hydration script so there's no theme flash on reload. Dark is my default (`components/ThemeToggle.tsx`, `app/layout.tsx`).
- **Scroll-reveal animations** — sections fade and slide into view as you scroll, powered by GSAP (`components/Reveal.tsx`).
- **Animated gradient background** — `components/Background.tsx`.
- **Landing page sections** — a trust/stats strip, my skills, an about section, client testimonials, and a contact section (`app/page.tsx`).
- **Content-driven** — all of my copy (projects, skills, testimonials, socials, stats) lives in `lib/data.ts`, so I can update my content without touching components. Items marked `[PLACEHOLDER]` are sample content I still need to replace.
- **SEO & social sharing** — full `metadata`, OpenGraph + Twitter cards, a dynamic `sitemap.ts`, `robots.ts`, and JSON-LD structured data (`components/schemas`).
- **Responsive & accessible** — mobile-first, semantic markup, and `prefers-reduced-motion` support.

## Tech Stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router)                 |
| UI           | React 19, TypeScript                    |
| Styling      | Tailwind CSS v4                         |
| Animation    | GSAP, CSS transitions                   |
| Icons        | lucide-react                            |
| Package mgr  | pnpm                                    |

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as I edit files. I update my content in `lib/data.ts` and tweak the components in `app/` and `components/`.

### Other scripts

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run ESLint
```

## Project Structure

```
app/                 # Routes, layout, global styles, SEO files
  layout.tsx         # Root layout, metadata, theme init script
  page.tsx           # Landing page composition
  globals.css        # Tailwind + theme tokens
  sitemap.ts         # Dynamic sitemap
  robots.ts          # Robots rules
components/          # UI sections & primitives
  Hero.tsx, Skills.tsx, About.tsx, Contact.tsx, ...
  Cursor.tsx, ThemeToggle.tsx, Reveal.tsx, Background.tsx
  schemas/           # JSON-LD structured data
lib/
  data.ts            # All of my editable site content (placeholder copy)
```

## Customizing my site

1. Replace the `[PLACEHOLDER]` entries in `lib/data.ts` (my profile, email, socials, projects, testimonials, stats).
2. Add a real OpenGraph image at `public/og.png`.
3. Update the `metadata` block in `app/layout.tsx` (domain, social handles, verification tags).
4. Swap the `Projects` section back in — `app/page.tsx` currently comments it out — once I have real case studies to show.

## Deploy on Vercel

The easiest way to deploy my Next.js app is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
