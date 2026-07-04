import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { CaseStudyForm } from "@/features/admin/case-studies/case-study-form";

export const metadata: Metadata = { title: "Edit Case Study" };

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const caseStudy = await prisma.caseStudy
    .findUnique({ where: { id }, include: { sections: { orderBy: { order: "asc" } } } })
    .catch(() => null);

  if (!caseStudy) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Edit case study</h1>
        <p className="text-sm text-ink-faint">{caseStudy.title}</p>
      </div>
      <CaseStudyForm
        initialValues={{
          id: caseStudy.id,
          title: caseStudy.title,
          slug: caseStudy.slug,
          client: caseStudy.client,
          industry: caseStudy.industry,
          category: caseStudy.category,
          summary: caseStudy.summary,
          coverImage: caseStudy.coverImage,
          heroImage: caseStudy.heroImage,
          duration: caseStudy.duration,
          team: caseStudy.team,
          role: caseStudy.role,
          technologies: caseStudy.technologies.join(", "),
          metrics: (caseStudy.metrics as { label: string; value: string }[]).map((m) => `${m.label}: ${m.value}`).join("\n"),
          featured: caseStudy.featured,
          sections: caseStudy.sections.map((s) => ({ key: s.key, title: s.title, body: s.body })),
        }}
      />
    </div>
  );
}
