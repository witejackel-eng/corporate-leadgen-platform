import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { FaqManager } from "@/features/admin/faq/faq-manager";

export const metadata: Metadata = { title: "FAQ" };

export default async function AdminFaqPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">FAQ</h1>
        <p className="text-sm text-ink-faint">Manage the questions shown on the homepage FAQ section.</p>
      </div>
      <FaqManager faqs={faqs} />
    </div>
  );
}
