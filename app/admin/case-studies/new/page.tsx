import type { Metadata } from "next";

import { CaseStudyForm } from "@/features/admin/case-studies/case-study-form";

export const metadata: Metadata = { title: "New Case Study" };

export default function NewCaseStudyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">New case study</h1>
      </div>
      <CaseStudyForm />
    </div>
  );
}
