"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { testimonialSchema } from "@/lib/validations/cms";
import { deleteTestimonial, upsertTestimonial } from "@/actions/cms";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  featured: boolean;
};

export function TestimonialManager({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { name: "", role: "", company: "", avatar: "/images/blog/author-evelyn.svg", quote: "", rating: 5, featured: false },
  });

  const openCreate = () => {
    setEditing(null);
    form.reset({ name: "", role: "", company: "", avatar: "/images/blog/author-evelyn.svg", quote: "", rating: 5, featured: false });
    setOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    form.reset(t);
    setOpen(true);
  };

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertTestimonial({ ...data, id: editing?.id });
      if (result.success) {
        toast.success(editing ? "Testimonial updated" : "Testimonial added");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteTestimonial(id);
      if (result.success) {
        toast.success("Testimonial removed");
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
              <Plus className="h-4 w-4" /> Add testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit testimonial" : "Add testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input className="mt-1.5" {...form.register("name")} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input className="mt-1.5" {...form.register("role")} />
                </div>
              </div>
              <div>
                <Label>Company</Label>
                <Input className="mt-1.5" {...form.register("company")} />
              </div>
              <div>
                <Label>Quote</Label>
                <Textarea className="mt-1.5" rows={3} {...form.register("quote")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Featured</Label>
                  <Switch checked={form.watch("featured")} onCheckedChange={(v) => form.setValue("featured", v)} />
                </div>
                <Button type="submit" variant="accent" disabled={isPending}>
                  {editing ? "Save changes" : "Add testimonial"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-ink-faint">
                No testimonials yet.
              </TableCell>
            </TableRow>
          ) : (
            testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium text-ink">{t.name}</TableCell>
                <TableCell>{t.company}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-accent-blue">
                    <Star className="h-3.5 w-3.5 fill-current" /> {t.rating}
                  </span>
                </TableCell>
                <TableCell>{t.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" aria-label="Edit testimonial" onClick={() => openEdit(t)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete testimonial" onClick={() => onDelete(t.id)}>
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
