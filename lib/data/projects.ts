import { SITE_CONFIG } from "@/lib/constants";

const REPO = SITE_CONFIG.repoUrl;

export const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "Real-Time Revenue Attribution Engine",
    slug: "revenue-attribution-engine",
    category: "Data & Backend",
    summary: "A model-agnostic, event-sourced attribution pipeline reconciling ad spend, CRM stages, and closed revenue in real time.",
    description:
      "Built on Prisma and PostgreSQL with a normalized relational schema spanning leads, accounts, campaigns, and revenue events. Includes server-side aggregation queries powering the boardroom reporting layer, with graceful fallbacks and zero cold-start errors.",
    coverImage: "/images/projects/attribution-engine.svg",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Zod", "Recharts"],
    liveUrl: `${REPO}/tree/main/prisma`,
    featured: true,
  },
  {
    id: "p2",
    title: "WebGL Product Experience",
    slug: "webgl-product-experience",
    category: "Creative Development",
    summary: "Custom React Three Fiber scenes with hand-written GLSL shaders — a distorted gradient blob, particle fields, and cursor-reactive lighting.",
    description:
      "A fully custom shader material (simplex-noise vertex displacement, Fresnel-based fragment coloring) driving the marketing hero, lazy-loaded and code-split to keep the rest of the site fast. GPU-conscious: capped device pixel ratio, disposed geometries, and reduced-motion fallbacks.",
    coverImage: "/images/projects/webgl-experience.svg",
    technologies: ["React Three Fiber", "Three.js", "GLSL", "Framer Motion"],
    liveUrl: `${REPO}/tree/main/components/webgl`,
    featured: true,
  },
  {
    id: "p3",
    title: "Enterprise Admin & CRM Console",
    slug: "admin-crm-console",
    category: "Full-Stack Application",
    summary: "A role-gated operations console: lead pipeline, analytics, content management, and team administration in one authenticated app.",
    description:
      "NextAuth-secured admin surface with middleware-based route protection, optimistic UI updates via Server Actions, Tremor/Recharts analytics, and a fully featured lead CRM with tagging, notes, activity timelines, and CSV export.",
    coverImage: "/images/projects/admin-console.svg",
    technologies: ["NextAuth", "Server Actions", "Tremor", "Radix UI"],
    liveUrl: `${REPO}/tree/main/features/admin`,
    featured: true,
  },
  {
    id: "p4",
    title: "Headless CMS & Content Platform",
    slug: "headless-cms-platform",
    category: "Content & SEO",
    summary: "A relational CMS covering the marketing site, case studies, and blog, with full SEO metadata, sitemaps, and an RSS feed generated at request time.",
    description:
      "Every editable surface of the marketing site — homepage blocks, navigation, testimonials, blog posts, FAQ — is backed by real Prisma models with an admin CRUD layer, structured data (Schema.org), and dynamic Open Graph metadata per page.",
    coverImage: "/images/projects/cms-platform.svg",
    technologies: ["Prisma", "Server Actions", "Tiptap", "Schema.org"],
    liveUrl: `${REPO}/tree/main/features/blog`,
    featured: true,
  },
];
