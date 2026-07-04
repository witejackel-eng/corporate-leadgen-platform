"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { GithubIcon } from "@/components/shared/social-icons";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginInput) => {
    setFormError(null);
    startTransition(async () => {
      const result = await signIn("credentials", { ...data, redirect: false });
      if (result?.error) {
        setFormError("Invalid email or password.");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    });
  };

  return (
    <Card className="shadow-lift">
      <CardHeader>
        <CardTitle>Sign in to Meridian</CardTitle>
        <CardDescription>Access your admin console and CRM.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" onClick={() => signIn("google", { callbackUrl })}>
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.92h6.5c-.13 1.03-.84 2.6-2.42 3.65l-.02.14 3.52 2.66.24.02c2.24-2.02 3.5-5 3.5-8.34" />
              <path fill="#34A853" d="M12 23.5c3.2 0 5.88-1.03 7.84-2.8l-3.74-2.82c-1 .68-2.36 1.15-4.1 1.15-3.15 0-5.82-2.02-6.78-4.82l-.14.01-3.66 2.76-.05.13C3.4 20.9 7.36 23.5 12 23.5" />
              <path fill="#FBBC05" d="M5.22 14.21A7.4 7.4 0 0 1 4.8 12c0-.77.14-1.5.4-2.21l-.01-.15L1.5 6.8l-.12.06A11.5 11.5 0 0 0 .25 12c0 1.86.45 3.62 1.24 5.14l3.73-2.93" />
              <path fill="#EA4335" d="M12 4.98c2.22 0 3.72.94 4.58 1.74l3.34-3.24C17.87 1.66 15.2.5 12 .5 7.36.5 3.4 3.1 1.38 6.86l3.83 2.94c.97-2.8 3.64-4.82 6.79-4.82" />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" onClick={() => signIn("github", { callbackUrl })}>
            <GithubIcon className="h-4 w-4" />
            GitHub
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-ink-faint">or</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5" aria-invalid={!!errors.email} {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs font-medium text-accent-blue hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" className="mt-1.5" aria-invalid={!!errors.password} {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          {formError && <p className="text-sm text-red-500">{formError}</p>}
          <Button type="submit" variant="accent" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-faint">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-accent-blue hover:underline">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
