import { z } from "zod";

export const caseStudySectionKeys = [
  "OVERVIEW",
  "PROBLEM",
  "RESEARCH",
  "DISCOVERY",
  "COMPETITIVE_ANALYSIS",
  "GOALS",
  "WIREFRAMES",
  "USER_FLOW",
  "VISUAL_DESIGN",
  "DESIGN_SYSTEM",
  "DEVELOPMENT",
  "ARCHITECTURE",
  "PERFORMANCE",
  "ACCESSIBILITY",
  "SEO",
  "TESTING",
  "DEPLOYMENT",
  "RESULTS",
  "LESSONS_LEARNED",
] as const;

export const caseStudySectionSchema = z.object({
  key: z.enum(caseStudySectionKeys),
  title: z.string().min(2).max(120),
  body: z.string().min(2).max(4000),
});

export const caseStudySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  client: z.string().min(2).max(120),
  industry: z.string().min(2).max(120),
  category: z.string().min(2).max(80),
  summary: z.string().min(10).max(400),
  coverImage: z.string().min(1),
  heroImage: z.string().min(1),
  duration: z.string().min(1).max(60),
  team: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  technologies: z.string().min(1),
  metrics: z.string().min(1),
  featured: z.boolean(),
  sections: z.array(caseStudySectionSchema).min(1),
});
