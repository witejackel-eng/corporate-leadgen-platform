import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-28">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Cookie Policy</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated January 1, 2026</p>
      <div className="prose prose-neutral mt-10 max-w-none">
        <p>
          Meridian uses a small number of cookies to operate meridian.io and our authenticated product experience.
        </p>
        <h2>Essential cookies</h2>
        <p>
          Session cookies (via NextAuth) are required to keep you signed in to the admin console and CRM. These
          cannot be disabled without losing access to authenticated features.
        </p>
        <h2>Analytics cookies</h2>
        <p>
          With your consent, we use privacy-conscious analytics to understand aggregate site usage. No analytics
          cookie is set until consent is given where required by local law.
        </p>
        <h2>Managing cookies</h2>
        <p>
          Most browsers let you block or delete cookies through their settings. Blocking essential cookies will
          prevent sign-in to the Meridian product.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to privacy@meridian.io.</p>
      </div>
    </div>
  );
}
