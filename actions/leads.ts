"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-guard";
import { sendLeadConfirmation, sendLeadNotification, sendNewsletterWelcome } from "@/services/email";
import {
  contactFormSchema,
  demoRequestSchema,
  leadAssignSchema,
  leadNoteSchema,
  leadStatusSchema,
  newsletterSchema,
} from "@/lib/validations/lead";

export type ActionResult = { success: true } | { success: false; error: string };

export async function submitContactForm(input: unknown): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { name, email, company, jobTitle, phone, message, teamSize } = parsed.data;

  await prisma.lead.create({
    data: {
      name,
      email,
      company,
      jobTitle: jobTitle || null,
      phone: phone || null,
      message,
      source: "CONTACT_FORM",
      activities: {
        create: { type: "CREATED", description: `Lead submitted contact form${teamSize ? ` (team size: ${teamSize})` : ""}` },
      },
    },
  });

  await Promise.allSettled([
    sendLeadNotification({ name, email, company, message, source: "Contact form" }),
    sendLeadConfirmation(email, name),
  ]);

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function submitDemoRequest(input: unknown): Promise<ActionResult> {
  const parsed = demoRequestSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { name, email, company, jobTitle, phone, teamSize, message } = parsed.data;

  await prisma.lead.create({
    data: {
      name,
      email,
      company,
      jobTitle: jobTitle || null,
      phone: phone || null,
      message: message || `Demo requested — team size: ${teamSize}`,
      source: "DEMO_REQUEST",
      activities: { create: { type: "CREATED", description: "Lead requested a product demo" } },
    },
  });

  await Promise.allSettled([
    sendLeadNotification({ name, email, company, message: `Demo request — team size: ${teamSize}`, source: "Demo request" }),
    sendLeadConfirmation(email, name),
  ]);

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function subscribeToNewsletter(input: unknown): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid email" };

  await prisma.message.create({
    data: { type: "NEWSLETTER", email: parsed.data.email, body: "Newsletter subscription" },
  });

  await sendNewsletterWelcome(parsed.data.email);

  return { success: true };
}

export async function updateLeadStatus(input: unknown): Promise<ActionResult> {
  const session = await requireStaff();
  const parsed = leadStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  await prisma.$transaction([
    prisma.lead.update({ where: { id: parsed.data.leadId }, data: { status: parsed.data.status } }),
    prisma.leadActivity.create({
      data: {
        leadId: parsed.data.leadId,
        userId: session.user.id,
        type: "STATUS_CHANGE",
        description: `Status changed to ${parsed.data.status.replace("_", " ")}`,
      },
    }),
  ]);

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function addLeadNote(input: unknown): Promise<ActionResult> {
  const session = await requireStaff();
  const parsed = leadNoteSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  await prisma.$transaction([
    prisma.leadNote.create({
      data: { leadId: parsed.data.leadId, authorId: session.user.id, body: parsed.data.body },
    }),
    prisma.leadActivity.create({
      data: { leadId: parsed.data.leadId, userId: session.user.id, type: "NOTE_ADDED", description: "Added a note" },
    }),
  ]);

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function assignLead(input: unknown): Promise<ActionResult> {
  const session = await requireStaff();
  const parsed = leadAssignSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  const assignee = parsed.data.userId
    ? await prisma.user.findUnique({ where: { id: parsed.data.userId } })
    : null;

  await prisma.$transaction([
    prisma.lead.update({ where: { id: parsed.data.leadId }, data: { assignedToId: parsed.data.userId } }),
    prisma.leadActivity.create({
      data: {
        leadId: parsed.data.leadId,
        userId: session.user.id,
        type: "ASSIGNED",
        description: assignee ? `Assigned to ${assignee.name ?? assignee.email}` : "Unassigned",
      },
    }),
  ]);

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function deleteLead(leadId: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.lead.delete({ where: { id: leadId } });
  revalidatePath("/admin/leads");
  return { success: true };
}
