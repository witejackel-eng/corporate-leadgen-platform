import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { CaseStudyTable } from "@/features/admin/case-studies/case-study-table";

export const metadata: Metadata = { title: "Case Studies" };

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Case Studies</h1>
        <p className="text-sm text-ink-faint">Manage the in-depth client engagement write-ups.</p>
      </div>
      <CaseStudyTable caseStudies={caseStudies} />
    </div>
  );
}
