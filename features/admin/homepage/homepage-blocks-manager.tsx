"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  deleteBenefit,
  deleteFeature,
  deleteStat,
  upsertBenefit,
  upsertFeature,
  upsertStat,
} from "@/actions/homepage";

type Stat = { id?: string; label: string; value: string; suffix: string; icon: string };
type Feature = { id?: string; title: string; description: string; icon: string };
type Benefit = { id?: string; title: string; description: string; icon: string };

type StatRow = Stat & { id: string };
type FeatureRow = Feature & { id: string };
type BenefitRow = Benefit & { id: string };

function useEntityDialog<T extends { id?: string }>(defaults: T) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<T>(defaults);

  const openCreate = () => {
    setValues(defaults);
    setOpen(true);
  };
  const openEdit = (item: T) => {
    setValues(item);
    setOpen(true);
  };

  return { open, setOpen, values, setValues, openCreate, openEdit };
}

export function HomepageBlocksManager({
  stats,
  features,
  benefits,
}: {
  stats: StatRow[];
  features: FeatureRow[];
  benefits: BenefitRow[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const statDialog = useEntityDialog<Stat>({ label: "", value: "", suffix: "", icon: "TrendingUp" });
  const featureDialog = useEntityDialog<Feature>({ title: "", description: "", icon: "Sparkles" });
  const benefitDialog = useEntityDialog<Benefit>({ title: "", description: "", icon: "CheckCircle2" });

  const saveStat = () => {
    startTransition(async () => {
      const result = await upsertStat(statDialog.values);
      if (result.success) {
        toast.success("Stat saved");
        statDialog.setOpen(false);
        router.refresh();
      } else toast.error(result.error);
    });
  };

  const saveFeature = () => {
    startTransition(async () => {
      const result = await upsertFeature(featureDialog.values);
      if (result.success) {
        toast.success("Feature saved");
        featureDialog.setOpen(false);
        router.refresh();
      } else toast.error(result.error);
    });
  };

  const saveBenefit = () => {
    startTransition(async () => {
      const result = await upsertBenefit(benefitDialog.values);
      if (result.success) {
        toast.success("Benefit saved");
        benefitDialog.setOpen(false);
        router.refresh();
      } else toast.error(result.error);
    });
  };

  return (
    <Tabs defaultValue="stats">
      <TabsList>
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
      </TabsList>

      <TabsContent value="stats">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Dialog open={statDialog.open} onOpenChange={statDialog.setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="accent" onClick={statDialog.openCreate}>
                  <Plus className="h-4 w-4" /> Add stat
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{statDialog.values.id ? "Edit stat" : "Add stat"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Label</Label>
                    <Input className="mt-1.5" value={statDialog.values.label} onChange={(e) => statDialog.setValues({ ...statDialog.values, label: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Value</Label>
                      <Input className="mt-1.5" value={statDialog.values.value} onChange={(e) => statDialog.setValues({ ...statDialog.values, value: e.target.value })} />
                    </div>
                    <div>
                      <Label>Suffix</Label>
                      <Input className="mt-1.5" value={statDialog.values.suffix} onChange={(e) => statDialog.setValues({ ...statDialog.values, suffix: e.target.value })} />
                    </div>
                  </div>
                  <Button variant="accent" disabled={isPending} onClick={saveStat} className="self-end">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.label}</TableCell>
                  <TableCell>
                    {s.value}
                    {s.suffix}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" aria-label="Edit stat" onClick={() => statDialog.openEdit(s)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete stat"
                      onClick={() => startTransition(async () => { await deleteStat(s.id); router.refresh(); })}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="features">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Dialog open={featureDialog.open} onOpenChange={featureDialog.setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="accent" onClick={featureDialog.openCreate}>
                  <Plus className="h-4 w-4" /> Add feature
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{featureDialog.values.id ? "Edit feature" : "Add feature"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input className="mt-1.5" value={featureDialog.values.title} onChange={(e) => featureDialog.setValues({ ...featureDialog.values, title: e.target.value })} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea className="mt-1.5" rows={3} value={featureDialog.values.description} onChange={(e) => featureDialog.setValues({ ...featureDialog.values, description: e.target.value })} />
                  </div>
                  <Button variant="accent" disabled={isPending} onClick={saveFeature} className="self-end">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium text-ink">{f.title}</TableCell>
                  <TableCell className="max-w-md truncate text-ink-faint">{f.description}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" aria-label="Edit testimonial" onClick={() => featureDialog.openEdit(f)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete testimonial"
                      onClick={() => startTransition(async () => { await deleteFeature(f.id); router.refresh(); })}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="benefits">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Dialog open={benefitDialog.open} onOpenChange={benefitDialog.setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="accent" onClick={benefitDialog.openCreate}>
                  <Plus className="h-4 w-4" /> Add benefit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{benefitDialog.values.id ? "Edit benefit" : "Add benefit"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input className="mt-1.5" value={benefitDialog.values.title} onChange={(e) => benefitDialog.setValues({ ...benefitDialog.values, title: e.target.value })} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea className="mt-1.5" rows={3} value={benefitDialog.values.description} onChange={(e) => benefitDialog.setValues({ ...benefitDialog.values, description: e.target.value })} />
                  </div>
                  <Button variant="accent" disabled={isPending} onClick={saveBenefit} className="self-end">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benefits.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium text-ink">{b.title}</TableCell>
                  <TableCell className="max-w-md truncate text-ink-faint">{b.description}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" aria-label="Edit FAQ" onClick={() => benefitDialog.openEdit(b)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete FAQ"
                      onClick={() => startTransition(async () => { await deleteBenefit(b.id); router.refresh(); })}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
