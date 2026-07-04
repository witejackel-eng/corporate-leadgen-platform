"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { benefitSchema, featureSchema, statSchema } from "@/lib/validations/homepage";
import type { ActionResult } from "@/actions/leads";

async function requireStaff() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    throw new Error("Unauthorized");
  }
}

export async function upsertStat(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = statSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const { id, ...data } = parsed.data;
  if (id) await prisma.stat.update({ where: { id }, data });
  else await prisma.stat.create({ data });
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { success: true };
}

export async function deleteStat(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.stat.delete({ where: { id } });
  revalidatePath("/admin/homepage");
  return { success: true };
}

export async function upsertFeature(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = featureSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const { id, ...data } = parsed.data;
  if (id) await prisma.feature.update({ where: { id }, data });
  else await prisma.feature.create({ data });
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFeature(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.feature.delete({ where: { id } });
  revalidatePath("/admin/homepage");
  return { success: true };
}

export async function upsertBenefit(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = benefitSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  const { id, ...data } = parsed.data;
  if (id) await prisma.benefit.update({ where: { id }, data });
  else await prisma.benefit.create({ data });
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBenefit(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.benefit.delete({ where: { id } });
  revalidatePath("/admin/homepage");
  return { success: true };
}
