"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  title: string;
}

export function CaseStudyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.key);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-28 hidden max-h-[70vh] w-56 shrink-0 flex-col gap-1 overflow-y-auto pr-4 lg:flex">
      {items.map((item) => (
        <a
          key={item.key}
          href={`#${item.key}`}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm transition-colors",
            active === item.key ? "bg-accent-blue/10 font-medium text-accent-blue" : "text-ink-faint hover:text-ink"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
