import { z } from "zod";

export const navigationItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(60),
  href: z.string().min(1).max(200),
  location: z.enum(["HEADER", "FOOTER"]),
  order: z.coerce.number().int().min(0),
});

export type NavigationItemInput = z.infer<typeof navigationItemSchema>;

export const navigationSwapSchema = z.object({
  firstId: z.string().min(1),
  secondId: z.string().min(1),
});
