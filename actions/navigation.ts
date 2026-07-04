"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-guard";
import { navigationItemSchema, navigationSwapSchema } from "@/lib/validations/navigation";
import type { ActionResult } from "@/actions/leads";

function toActionError(error: unknown, fallback: string): ActionResult {
  console.error(error);
  return { success: false, error: fallback };
}

export async function upsertNavigationItem(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = navigationItemSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, ...data } = parsed.data;
  try {
    if (id) {
      await prisma.navigationItem.update({ where: { id }, data });
    } else {
      await prisma.navigationItem.create({ data });
    }
  } catch (error) {
    return toActionError(error, id ? "That link no longer exists — refresh and try again." : "Couldn't save that link.");
  }

  revalidatePath("/admin/navigation");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteNavigationItem(id: string): Promise<ActionResult> {
  await requireStaff();
  try {
    await prisma.navigationItem.delete({ where: { id } });
  } catch (error) {
    return toActionError(error, "That link was already removed — refresh and try again.");
  }

  revalidatePath("/admin/navigation");
  revalidatePath("/", "layout");
  return { success: true };
}

/**
 * Swaps the `order` of two navigation items. Reads both rows' current order
 * inside the transaction rather than trusting client-supplied order values,
 * so a stale client can't clobber an order it never actually saw.
 */
export async function swapNavigationOrder(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = navigationSwapSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  const { firstId, secondId } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      const [first, second] = await Promise.all([
        tx.navigationItem.findUniqueOrThrow({ where: { id: firstId } }),
        tx.navigationItem.findUniqueOrThrow({ where: { id: secondId } }),
      ]);

      await tx.navigationItem.update({ where: { id: first.id }, data: { order: second.order } });
      await tx.navigationItem.update({ where: { id: second.id }, data: { order: first.order } });
    });
  } catch (error) {
    return toActionError(error, "Couldn't reorder those links — refresh and try again.");
  }

  revalidatePath("/admin/navigation");
  revalidatePath("/", "layout");
  return { success: true };
}
