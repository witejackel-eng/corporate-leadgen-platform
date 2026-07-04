import { getTestimonials } from "@/server/queries/marketing";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialsCarousel } from "@/features/home/testimonials-carousel";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="relative bg-canvas-soft py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Customer stories"
          title="Revenue teams don't switch platforms for features. They switch for trust."
          description="Here's what marketing and finance leaders say after moving their pipeline reporting onto Meridian."
        />
        <div className="mt-16">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
