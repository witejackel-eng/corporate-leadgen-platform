"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic-button";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/server/queries/navigation";

export function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500",
          scrolled ? "glass shadow-soft" : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight" data-cursor-hover>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-white">M</span>
          {SITE_CONFIG.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id ?? link.href}
              href={link.href}
              data-cursor-hover
              className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <Button asChild size="sm" variant="ghost">
              <Link href="/admin">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="ghost">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
          <Magnetic>
            <Button asChild size="sm" variant="accent" data-cursor-hover>
              <Link href="/contact">
                Book a demo <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Magnetic>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-4 top-20 z-40 flex flex-col gap-1 rounded-3xl p-4 shadow-lift md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id ?? link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild variant="accent" size="sm">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Book a demo
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
