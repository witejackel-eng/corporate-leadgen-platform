"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/lead";
import { subscribeToNewsletter } from "@/actions/leads";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = (data: NewsletterInput) => {
    startTransition(async () => {
      const result = await subscribeToNewsletter(data);
      if (result.success) {
        setDone(true);
        reset();
        toast.success("Subscribed! Check your inbox for a welcome note.");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="you@company.com"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <Button type="submit" variant="default" size="default" disabled={isPending} className="shrink-0">
        {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        {isPending ? "Sending…" : "Subscribe"}
      </Button>
    </form>
  );
}
