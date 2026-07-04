import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";
import { AuroraBackground } from "@/components/shared/aurora-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <AuroraBackground className="opacity-30" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-white">M</span>
          {SITE_CONFIG.name}
        </Link>
        {children}
      </div>
    </div>
  );
}
