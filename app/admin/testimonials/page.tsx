import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { TestimonialManager } from "@/features/admin/testimonials/testimonial-manager";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Testimonials</h1>
        <p className="text-sm text-ink-faint">Manage customer quotes shown on the homepage.</p>
      </div>
      <TestimonialManager testimonials={testimonials} />
    </div>
  );
}
