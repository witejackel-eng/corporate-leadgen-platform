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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clientSchema } from "@/lib/validations/cms";
import { deleteClient, upsertClient } from "@/actions/cms";

type ClientRow = { id: string; name: string; logo: string; url: string | null };

export function ClientManager({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ClientRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({ resolver: zodResolver(clientSchema), defaultValues: { name: "", logo: "/logo.svg", url: "" } });

  const openCreate = () => {
    setEditing(null);
    form.reset({ name: "", logo: "/logo.svg", url: "" });
    setOpen(true);
  };

  const openEdit = (c: ClientRow) => {
    setEditing(c);
    form.reset({ name: c.name, logo: c.logo, url: c.url ?? "" });
    setOpen(true);
  };

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertClient({ ...data, id: editing?.id });
      if (result.success) {
        toast.success(editing ? "Client updated" : "Client added");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteClient(id);
      if (result.success) {
        toast.success("Client removed");
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
              <Plus className="h-4 w-4" /> Add client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit client" : "Add client"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <Label>Company name</Label>
                <Input className="mt-1.5" {...form.register("name")} />
              </div>
              <div>
                <Label>Website (optional)</Label>
                <Input className="mt-1.5" placeholder="https://" {...form.register("url")} />
              </div>
              <Button type="submit" variant="accent" disabled={isPending} className="self-end">
                {editing ? "Save changes" : "Add client"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center text-ink-faint">
                No clients yet.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium text-ink">{c.name}</TableCell>
                <TableCell className="text-ink-faint">{c.url || "—"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" aria-label="Edit client" onClick={() => openEdit(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete client" onClick={() => onDelete(c.id)}>
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
