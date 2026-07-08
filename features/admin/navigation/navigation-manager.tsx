"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteNavigationItem, swapNavigationOrder, upsertNavigationItem } from "@/actions/navigation";

interface NavItemRow {
  id: string;
  label: string;
  href: string;
  order: number;
}

const EMPTY = { label: "", href: "", location: "HEADER" as const, order: 0 };

export function NavigationManager({ items }: { items: NavItemRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NavItemRow | null>(null);
  const [values, setValues] = useState(EMPTY);
  const [isPending, startTransition] = useTransition();

  const sorted = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);

  const openCreate = () => {
    setEditing(null);
    setValues({ ...EMPTY, order: sorted.length });
    setOpen(true);
  };

  const openEdit = (item: NavItemRow) => {
    setEditing(item);
    setValues({ label: item.label, href: item.href, location: "HEADER", order: item.order });
    setOpen(true);
  };

  const onSave = () => {
    startTransition(async () => {
      const result = await upsertNavigationItem({ ...values, id: editing?.id });
      if (result.success) {
        toast.success(editing ? "Link updated" : "Link added");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteNavigationItem(id);
      if (result.success) {
        toast.success("Link removed");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    startTransition(async () => {
      const result = await swapNavigationOrder({ firstId: sorted[index].id, secondId: sorted[target].id });
      if (result.success) {
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-faint">Links shown in the site header, in order.</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="accent" size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4" /> Add link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit link" : "Add link"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <Label>Label</Label>
                <Input className="mt-1.5" value={values.label} onChange={(e) => setValues({ ...values, label: e.target.value })} />
              </div>
              <div>
                <Label>URL / path</Label>
                <Input className="mt-1.5" placeholder="/blog or /#pricing" value={values.href} onChange={(e) => setValues({ ...values, href: e.target.value })} />
              </div>
              <Button variant="accent" disabled={isPending} onClick={onSave} className="self-end">
                {editing ? "Save changes" : "Add link"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Path</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center text-ink-faint">
                No header links yet.
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-ink">{item.label}</TableCell>
                <TableCell className="text-ink-faint">{item.href}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" aria-label="Move up" disabled={i === 0 || isPending} onClick={() => move(i, -1)}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Move down" disabled={i === sorted.length - 1 || isPending} onClick={() => move(i, 1)}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Edit nav item" onClick={() => openEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete nav item" onClick={() => onDelete(item.id)}>
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
