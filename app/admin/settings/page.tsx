import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/features/admin/settings/settings-form";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } }).catch(() => null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Settings</h1>
        <p className="text-sm text-ink-faint">Global site details used across metadata and the footer.</p>
      </div>
      <SettingsForm
        initialValues={{
          siteName: settings?.siteName ?? SITE_CONFIG.name,
          siteTagline: settings?.siteTagline ?? SITE_CONFIG.tagline,
          siteDescription: settings?.siteDescription ?? SITE_CONFIG.description,
          contactEmail: settings?.contactEmail ?? "hello@meridian.io",
          contactPhone: settings?.contactPhone ?? "",
          address: settings?.address ?? "",
        }}
      />
    </div>
  );
}
