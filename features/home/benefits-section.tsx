import { getBenefits } from "@/server/queries/marketing";
import { SectionHeading } from "@/components/shared/section-heading";
import { BenefitsGrid } from "@/features/home/benefits-grid";

export async function BenefitsSection() {
  const benefits = await getBenefits();

  return (
    <section className="relative bg-canvas-soft py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Meridian"
          title="Built for the way enterprise revenue teams actually work"
          align="left"
          className="items-start text-left"
        />
        <div className="mt-14">
          <BenefitsGrid benefits={benefits} />
        </div>
      </div>
    </section>
  );
}
