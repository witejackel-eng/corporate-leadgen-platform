"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { settingsSchema } from "@/lib/validations/cms";
import { updateSiteSettings } from "@/actions/settings";

interface SettingsValues {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export function SettingsForm({ initialValues }: { initialValues: SettingsValues }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsValues>({ resolver: zodResolver(settingsSchema), defaultValues: initialValues });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await updateSiteSettings(data);
      if (result.success) {
        toast.success("Settings saved");
      } else {
        toast.error(result.error);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-5 rounded-card border border-border bg-surface p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label>Site name</Label>
          <Input className="mt-1.5" {...form.register("siteName")} />
        </div>
        <div>
          <Label>Contact email</Label>
          <Input className="mt-1.5" {...form.register("contactEmail")} />
        </div>
      </div>
      <div>
        <Label>Tagline</Label>
        <Input className="mt-1.5" {...form.register("siteTagline")} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea className="mt-1.5" rows={3} {...form.register("siteDescription")} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label>Contact phone</Label>
          <Input className="mt-1.5" {...form.register("contactPhone")} />
        </div>
        <div>
          <Label>Address</Label>
          <Input className="mt-1.5" {...form.register("address")} />
        </div>
      </div>
      <Button type="submit" variant="accent" disabled={isPending} className="self-end">
        {isPending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
