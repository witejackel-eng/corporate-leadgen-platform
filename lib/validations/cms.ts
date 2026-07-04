import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(80),
  role: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  avatar: z.string().min(1),
  quote: z.string().min(10).max(600),
  rating: z.coerce.number().min(1).max(5),
  featured: z.boolean(),
});

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  logo: z.string().min(1),
  url: z.union([z.string().url(), z.literal("")]),
});

export const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5).max(300),
  answer: z.string().min(5).max(2000),
  category: z.string().min(2).max(60),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(120),
  slug: z.string().min(3).max(120),
  category: z.string().min(2).max(80),
  summary: z.string().min(10).max(300),
  description: z.string().min(10).max(2000),
  coverImage: z.string().min(1),
  technologies: z.string().min(1),
  liveUrl: z.string().url(),
  featured: z.boolean(),
});

export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(400),
  content: z.string().min(20),
  coverImage: z.string().min(1),
  category: z.string().min(2).max(80),
  tags: z.string(),
  published: z.boolean(),
  featured: z.boolean(),
});

export const settingsSchema = z.object({
  siteName: z.string().min(2).max(80),
  siteTagline: z.string().min(2).max(200),
  siteDescription: z.string().max(500),
  contactEmail: z.string().email(),
  contactPhone: z.string().max(40),
  address: z.string().max(200),
});

export const userRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
});
