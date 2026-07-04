"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoRequestSchema, type DemoRequestInput } from "@/lib/validations/lead";
import { submitDemoRequest } from "@/actions/leads";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<DemoRequestInput>({ resolver: zodResolver(demoRequestSchema) });

  const teamSize = watch("teamSize");

  const onSubmit = (data: DemoRequestInput) => {
    startTransition(async () => {
      const result = await submitDemoRequest(data);
      if (result.success) {
        toast.success("Thanks — we'll be in touch within one business day.");
        reset();
      } else {
        toast.error(result.error);
      }
    });
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card border border-border bg-surface p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-emerald/10 text-accent-emerald">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">Message received</h3>
        <p className="max-w-sm text-sm text-ink-faint">
          A member of our revenue team will reach out within one business day to schedule your pilot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 rounded-card border border-border bg-surface p-8 shadow-soft">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" className="mt-1.5" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" className="mt-1.5" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" className="mt-1.5" aria-invalid={!!errors.company} {...register("company")} />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
        </div>
        <div>
          <Label htmlFor="jobTitle">Job title</Label>
          <Input id="jobTitle" className="mt-1.5" {...register("jobTitle")} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" className="mt-1.5" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="teamSize">Marketing team size</Label>
          <Select value={teamSize} onValueChange={(v) => setValue("teamSize", v, { shouldValidate: true })}>
            <SelectTrigger className="mt-1.5" id="teamSize">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.teamSize && <p className="mt-1 text-xs text-red-500">{errors.teamSize.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="message">What are you hoping to solve?</Label>
        <Textarea id="message" className="mt-1.5" rows={4} {...register("message")} />
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={isPending} className="mt-2">
        {isPending ? "Sending…" : "Request a demo"} <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
