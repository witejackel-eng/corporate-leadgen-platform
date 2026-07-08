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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSchema } from "@/lib/validations/cms";
import { deleteFaq, upsertFaq } from "@/actions/cms";

type FaqRow = { id: string; question: string; answer: string; category: string };

export function FaqManager({ faqs }: { faqs: FaqRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({ resolver: zodResolver(faqSchema), defaultValues: { question: "", answer: "", category: "General" } });

  const openCreate = () => {
    setEditing(null);
    form.reset({ question: "", answer: "", category: "General" });
    setOpen(true);
  };

  const openEdit = (f: FaqRow) => {
    setEditing(f);
    form.reset(f);
    setOpen(true);
  };

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertFaq({ ...data, id: editing?.id });
      if (result.success) {
        toast.success(editing ? "FAQ updated" : "FAQ added");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteFaq(id);
      if (result.success) {
        toast.success("FAQ removed");
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
              <Plus className="h-4 w-4" /> Add question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <Label>Category</Label>
                <Input className="mt-1.5" {...form.register("category")} />
              </div>
              <div>
                <Label>Question</Label>
                <Input className="mt-1.5" {...form.register("question")} />
              </div>
              <div>
                <Label>Answer</Label>
                <Textarea className="mt-1.5" rows={4} {...form.register("answer")} />
              </div>
              <Button type="submit" variant="accent" disabled={isPending} className="self-end">
                {editing ? "Save changes" : "Add question"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-card border border-border bg-surface p-2">
        <Accordion type="single" collapsible>
          {faqs.length === 0 ? (
            <p className="py-10 text-center text-ink-faint">No FAQs yet.</p>
          ) : (
            faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="px-4">
                <div className="flex items-center gap-2">
                  <AccordionTrigger className="flex-1">{f.question}</AccordionTrigger>
                  <Button size="icon" variant="ghost" aria-label="Edit FAQ" onClick={() => openEdit(f)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete FAQ" onClick={() => onDelete(f.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
}
