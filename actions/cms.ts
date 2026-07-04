"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-guard";
import { clientSchema, faqSchema, projectSchema, testimonialSchema } from "@/lib/validations/cms";
import type { ActionResult } from "@/actions/leads";

// ---------- Testimonials ----------

export async function upsertTestimonial(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  return { success: true };
}

// ---------- Clients ----------

export async function upsertClient(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = clientSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.client.update({ where: { id }, data });
  } else {
    await prisma.client.create({ data });
  }

  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.client.delete({ where: { id } });
  revalidatePath("/admin/clients");
  return { success: true };
}

// ---------- FAQ ----------

export async function upsertFaq(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = faqSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.faq.update({ where: { id }, data });
  } else {
    await prisma.faq.create({ data });
  }

  revalidatePath("/admin/faq");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faq");
  return { success: true };
}

// ---------- Projects ----------

export async function upsertProject(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, technologies, ...data } = parsed.data;
  const techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);

  if (id) {
    await prisma.project.update({ where: { id }, data: { ...data, technologies: techArray } });
  } else {
    await prisma.project.create({ data: { ...data, technologies: techArray } });
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  return { success: true };
}

// ---------- Messages ----------

export async function markMessageRead(id: string, read: boolean): Promise<ActionResult> {
  await requireStaff();
  await prisma.message.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
  return { success: true };
}
