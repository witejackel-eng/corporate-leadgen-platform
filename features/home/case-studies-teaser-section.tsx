import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCaseStudies } from "@/server/queries/case-studies";
import { SectionHeading } from "@/components/shared/section-heading";
import { CaseStudyCard } from "@/features/case-studies/case-study-card";
import { Button } from "@/components/ui/button";

export async function CaseStudiesTeaserSection() {
  const caseStudies = (await getCaseStudies()).slice(0, 3);

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Case studies"
          title="Real engagements, real numbers"
          description="A closer look at how three enterprise teams moved from fragmented reporting to a single, trusted pipeline view."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">
              View all case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
