import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { MediaLibrary } from "@/features/admin/media/media-library";

export const metadata: Metadata = { title: "Media" };

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Media Library</h1>
        <p className="text-sm text-ink-faint">Images uploaded via Cloudinary for use across the site.</p>
      </div>
      <MediaLibrary media={media} />
    </div>
  );
}
