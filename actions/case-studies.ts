"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-guard";
import { caseStudySchema } from "@/lib/validations/case-study";
import type { ActionResult } from "@/actions/leads";

function parseMetrics(raw: string): { label: string; value: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    });
}

export async function upsertCaseStudy(input: unknown): Promise<ActionResult> {
  await requireStaff();
  const parsed = caseStudySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, technologies, metrics, sections, ...data } = parsed.data;
  const techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);
  const metricsJson = parseMetrics(metrics);

  if (id) {
    await prisma.caseStudy.update({
      where: { id },
      data: { ...data, technologies: techArray, metrics: metricsJson },
    });
    await prisma.caseStudySection.deleteMany({ where: { caseStudyId: id } });
    await prisma.caseStudySection.createMany({
      data: sections.map((s, i) => ({ caseStudyId: id, key: s.key, title: s.title, body: s.body, order: i })),
    });
  } else {
    await prisma.caseStudy.create({
      data: {
        ...data,
        technologies: techArray,
        metrics: metricsJson,
        sections: {
          create: sections.map((s, i) => ({ key: s.key, title: s.title, body: s.body, order: i })),
        },
      },
    });
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}

export async function deleteCaseStudy(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  return { success: true };
}
