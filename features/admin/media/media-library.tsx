"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { toast } from "sonner";
import { Trash2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { persistMediaRecord, deleteMedia } from "@/actions/media";

interface MediaRow {
  id: string;
  url: string;
  type: string;
  width: number | null;
  height: number | null;
}

export function MediaLibrary({ media }: { media: MediaRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpload = (results: CloudinaryUploadWidgetResults) => {
    const info = results.info;
    if (!info || typeof info === "string") return;

    startTransition(async () => {
      const result = await persistMediaRecord({
        url: info.secure_url,
        cloudinaryId: info.public_id,
        width: info.width,
        height: info.height,
        size: info.bytes,
        type: info.resource_type,
      });
      if (result.success) {
        toast.success("Uploaded");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteMedia(id);
      if (result.success) {
        toast.success("Deleted");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <Button variant="accent" size="sm" onClick={() => open()} disabled={isPending}>
              <UploadCloud className="h-4 w-4" /> Upload media
            </Button>
          )}
        </CldUploadWidget>
      </div>

      {media.length === 0 ? (
        <div className="rounded-card border border-dashed border-border-strong bg-surface p-16 text-center text-ink-faint">
          No media uploaded yet. Configure your Cloudinary credentials and upload preset in .env, then upload your first
          asset.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-card border border-border bg-surface">
              <div className="relative aspect-square w-full bg-surface-muted">
                <Image src={item.url} alt="" fill className="object-cover" />
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete media"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
