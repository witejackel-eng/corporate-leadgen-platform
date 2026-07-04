import { getFeatures } from "@/server/queries/marketing";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeaturesGrid } from "@/features/home/features-grid";

export async function FeaturesSection() {
  const features = await getFeatures();

  return (
    <section id="product" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Product"
          title="Everything your revenue team needs, connected"
          description="Meridian replaces the six-tool stack most enterprise marketing teams have stitched together — with one platform your whole team actually trusts."
        />
        <div className="mt-16">
          <FeaturesGrid features={features} />
        </div>
      </div>
    </section>
  );
}
