"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { AdminThemeContext } from "@/features/admin/use-admin-theme";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("meridian-admin-theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("meridian-admin-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <AdminThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={cn("min-h-screen bg-canvas text-ink transition-colors", dark && "dark")}>{children}</div>
    </AdminThemeContext.Provider>
  );
}
