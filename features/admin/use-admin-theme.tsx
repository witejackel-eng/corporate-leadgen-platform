"use client";

import { createContext, useContext } from "react";

interface AdminThemeState {
  dark: boolean;
  toggle: () => void;
}

export const AdminThemeContext = createContext<AdminThemeState>({ dark: false, toggle: () => {} });

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
