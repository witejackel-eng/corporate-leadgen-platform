import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Tell us your name").max(80),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(2, "Company name is required").max(120),
  jobTitle: z.string().max(120).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(10, "Give us a few details").max(2000),
  teamSize: z.string().optional(),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(2).max(120),
  jobTitle: z.string().max(120).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  teamSize: z.string().min(1, "Select a team size"),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const leadNoteSchema = z.object({
  leadId: z.string().min(1),
  body: z.string().min(1, "Note cannot be empty").max(4000),
});

export const leadStatusSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]),
});

export const leadAssignSchema = z.object({
  leadId: z.string().min(1),
  userId: z.string().nullable(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
