"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { GripVertical, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { caseStudySchema, caseStudySectionKeys } from "@/lib/validations/case-study";
import { upsertCaseStudy } from "@/actions/case-studies";

type FormValues = {
  id?: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  category: string;
  summary: string;
  coverImage: string;
  heroImage: string;
  duration: string;
  team: string;
  role: string;
  technologies: string;
  metrics: string;
  featured: boolean;
  sections: { key: (typeof caseStudySectionKeys)[number]; title: string; body: string }[];
};

const EMPTY: FormValues = {
  title: "",
  slug: "",
  client: "",
  industry: "",
  category: "",
  summary: "",
  coverImage: "/images/case-studies/ashford-cover.svg",
  heroImage: "/images/case-studies/ashford-hero.svg",
  duration: "",
  team: "",
  role: "",
  technologies: "",
  metrics: "",
  featured: false,
  sections: [{ key: "OVERVIEW", title: "Overview", body: "" }],
};

export function CaseStudyForm({ initialValues }: { initialValues?: FormValues }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({ resolver: zodResolver(caseStudySchema), defaultValues: initialValues ?? EMPTY });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "sections" });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertCaseStudy({ ...data, id: initialValues?.id });
      if (result.success) {
        toast.success(initialValues ? "Case study updated" : "Case study created");
        router.push("/admin/case-studies");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-5 rounded-card border border-border bg-surface p-6 sm:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input className="mt-1.5" {...form.register("title")} />
        </div>
        <div>
          <Label>Slug</Label>
          <Input className="mt-1.5" {...form.register("slug")} />
        </div>
        <div>
          <Label>Client</Label>
          <Input className="mt-1.5" {...form.register("client")} />
        </div>
        <div>
          <Label>Industry</Label>
          <Input className="mt-1.5" {...form.register("industry")} />
        </div>
        <div>
          <Label>Category</Label>
          <Input className="mt-1.5" {...form.register("category")} />
        </div>
        <div>
          <Label>Duration</Label>
          <Input className="mt-1.5" {...form.register("duration")} />
        </div>
        <div>
          <Label>Team</Label>
          <Input className="mt-1.5" {...form.register("team")} />
        </div>
        <div>
          <Label>Role</Label>
          <Input className="mt-1.5" {...form.register("role")} />
        </div>
        <div className="sm:col-span-2">
          <Label>Summary</Label>
          <Textarea className="mt-1.5" rows={2} {...form.register("summary")} />
        </div>
        <div>
          <Label>Technologies (comma-separated)</Label>
          <Input className="mt-1.5" {...form.register("technologies")} />
        </div>
        <div>
          <Label>Metrics (one per line, &quot;Label: Value&quot;)</Label>
          <Textarea className="mt-1.5" rows={4} placeholder={"Pipeline visibility: 100%\nReporting time saved: 31 hrs/mo"} {...form.register("metrics")} />
        </div>
        <div className="flex items-center justify-between rounded-control border border-border p-3 sm:col-span-2">
          <Label>Featured</Label>
          <Switch checked={form.watch("featured")} onCheckedChange={(v) => form.setValue("featured", v)} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Sections</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => append({ key: "RESULTS", title: "", body: "" })}
          >
            <Plus className="h-4 w-4" /> Add section
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-ink-faint" />
              <Select
                value={form.watch(`sections.${index}.key`)}
                onValueChange={(v) => form.setValue(`sections.${index}.key`, v as FormValues["sections"][number]["key"])}
              >
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {caseStudySectionKeys.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Section title" {...form.register(`sections.${index}.title`)} />
              <Button type="button" size="icon" variant="ghost" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <Textarea rows={3} placeholder="Section body" {...form.register(`sections.${index}.body`)} />
          </div>
        ))}
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={isPending} className="self-end">
        {isPending ? "Saving…" : initialValues ? "Save changes" : "Create case study"}
      </Button>
    </form>
  );
}
