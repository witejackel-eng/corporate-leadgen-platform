"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { projectSchema } from "@/lib/validations/cms";
import { deleteProject, upsertProject } from "@/actions/cms";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  coverImage: string;
  technologies: string[];
  liveUrl: string;
  featured: boolean;
};

const DEFAULTS = {
  title: "",
  slug: "",
  category: "",
  summary: "",
  description: "",
  coverImage: "/images/projects/attribution-engine.svg",
  technologies: "",
  liveUrl: "",
  featured: true,
};

export function ProjectManager({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({ resolver: zodResolver(projectSchema), defaultValues: DEFAULTS });

  const openCreate = () => {
    setEditing(null);
    form.reset(DEFAULTS);
    setOpen(true);
  };

  const openEdit = (p: ProjectRow) => {
    setEditing(p);
    form.reset({ ...p, technologies: p.technologies.join(", ") });
    setOpen(true);
  };

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertProject({ ...data, id: editing?.id });
      if (result.success) {
        toast.success(editing ? "Project updated" : "Project added");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteProject(id);
      if (result.success) {
        toast.success("Project removed");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="accent" size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4" /> Add project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit project" : "Add project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input className="mt-1.5" {...form.register("title")} />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input className="mt-1.5" {...form.register("slug")} />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Input className="mt-1.5" {...form.register("category")} />
              </div>
              <div>
                <Label>Summary</Label>
                <Textarea className="mt-1.5" rows={2} {...form.register("summary")} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea className="mt-1.5" rows={3} {...form.register("description")} />
              </div>
              <div>
                <Label>Technologies (comma-separated)</Label>
                <Input className="mt-1.5" placeholder="Next.js, Prisma, PostgreSQL" {...form.register("technologies")} />
              </div>
              <div>
                <Label>Live / source URL</Label>
                <Input className="mt-1.5" {...form.register("liveUrl")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Featured</Label>
                  <Switch checked={form.watch("featured")} onCheckedChange={(v) => form.setValue("featured", v)} />
                </div>
                <Button type="submit" variant="accent" disabled={isPending}>
                  {editing ? "Save changes" : "Add project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-ink-faint">
                No projects yet.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium text-ink">{p.title}</TableCell>
                <TableCell>
                  <Badge variant="indigo">{p.category}</Badge>
                </TableCell>
                <TableCell className="text-xs text-ink-faint">{p.technologies.join(", ")}</TableCell>
                <TableCell>{p.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => onDelete(p.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
