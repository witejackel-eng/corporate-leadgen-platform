import { auth } from "@/auth";

/**
 * Throws if there is no authenticated ADMIN or EDITOR session.
 * Centralized so every Server Action enforces the exact same rule —
 * previously six action files each carried their own copy of this check,
 * and two of them had silently drifted (missing the `return session`).
 */
export async function requireStaff() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    throw new Error("Unauthorized");
  }
  return session;
}

/** Throws if there is no authenticated ADMIN session. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}
