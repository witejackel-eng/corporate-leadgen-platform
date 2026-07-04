"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { userRoleSchema } from "@/lib/validations/cms";
import type { ActionResult } from "@/actions/leads";

export async function updateUserRole(input: unknown): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Only admins can change roles." };
  }

  const parsed = userRoleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  if (parsed.data.userId === session.user.id) {
    return { success: false, error: "You cannot change your own role." };
  }

  await prisma.user.update({ where: { id: parsed.data.userId }, data: { role: parsed.data.role } });
  revalidatePath("/admin/users");
  return { success: true };
}
