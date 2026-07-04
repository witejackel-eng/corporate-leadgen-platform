import { getFaqs } from "@/server/queries/marketing";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/features/home/faq-accordion";

export async function FaqSection() {
  const faqs = await getFaqs();

  return (
    <section className="relative bg-canvas-soft py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-16">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
