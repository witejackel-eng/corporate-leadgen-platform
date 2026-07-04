"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteCloudinaryAsset } from "@/services/cloudinary";
import type { ActionResult } from "@/actions/leads";

interface UploadResultInput {
  url: string;
  cloudinaryId: string;
  width: number;
  height: number;
  size: number;
  type: string;
  alt?: string;
}

function isTrustedCloudinaryUrl(url: string): boolean {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return false;

  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "res.cloudinary.com" &&
      parsed.pathname.startsWith(`/${cloudName}/`)
    );
  } catch {
    return false;
  }
}

export async function persistMediaRecord(input: UploadResultInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    return { success: false, error: "Unauthorized" };
  }

  // The upload widget runs entirely client-side; this call only reports what
  // it claims happened. Reject anything that isn't actually hosted on our
  // own Cloudinary account before trusting it as a "Media" record.
  if (!isTrustedCloudinaryUrl(input.url)) {
    return { success: false, error: "That upload could not be verified." };
  }

  await prisma.media.create({
    data: {
      url: input.url,
      cloudinaryId: input.cloudinaryId,
      width: input.width,
      height: input.height,
      size: input.size,
      type: input.type,
      alt: input.alt ?? "",
      uploadedById: session.user.id,
    },
  });

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    return { success: false, error: "Unauthorized" };
  }

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return { success: false, error: "Not found" };

  if (media.cloudinaryId) {
    await deleteCloudinaryAsset(media.cloudinaryId).catch(() => null);
  }

  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/media");
  return { success: true };
}
