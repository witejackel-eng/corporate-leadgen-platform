import { z } from "zod";

export const statSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(2).max(120),
  value: z.string().min(1).max(20),
  suffix: z.string().max(10).default(""),
  icon: z.string().default("TrendingUp"),
});

export const featureSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(120),
  description: z.string().min(5).max(400),
  icon: z.string().default("Sparkles"),
});

export const benefitSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(120),
  description: z.string().min(5).max(400),
  icon: z.string().default("CheckCircle2"),
});
