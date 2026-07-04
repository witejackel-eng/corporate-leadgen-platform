import type { Metadata } from "next";

import { getCaseStudies } from "@/server/queries/case-studies";
import { SectionHeading } from "@/components/shared/section-heading";
import { CaseStudyCard } from "@/features/case-studies/case-study-card";
import { AuroraBackground } from "@/components/shared/aurora-background";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real enterprise engagements: how Ashford Logistics, Nordwind Health Systems, Vantage Capital Partners, and Circuitry Robotics moved onto Meridian.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="relative pt-40 pb-28">
      <AuroraBackground className="opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Case studies"
          title="Real engagements, real numbers"
          description="Every metric below is drawn from the actual engagement — no rounding up, no cherry-picked quarters."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard
              key={cs.id}
              slug={cs.slug}
              title={cs.title}
              client={cs.client}
              category={cs.category}
              summary={cs.summary}
              coverImage={cs.coverImage}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
