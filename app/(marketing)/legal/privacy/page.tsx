import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-28">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated January 1, 2026</p>
      <div className="prose prose-neutral mt-10 max-w-none">
        <p>
          Meridian, Inc. (&quot;Meridian&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. This policy describes what
          information we collect through meridian.io and our product, how we use it, and the choices you have.
        </p>
        <h2>Information we collect</h2>
        <p>
          We collect information you provide directly (name, work email, company, and message content submitted through
          forms), usage data from your interactions with our marketing site and product, and information from your
          connected CRM and ad platforms when you use Meridian as a customer, strictly to provide the attribution and
          reporting services you&apos;ve configured.
        </p>
        <h2>How we use information</h2>
        <p>
          We use collected information to respond to inquiries, operate and improve the platform, send product and
          billing communications, and — with consent — send occasional newsletter content. We do not sell personal
          information to third parties.
        </p>
        <h2>Data retention and security</h2>
        <p>
          Customer data is encrypted in transit and at rest. Retention periods are configurable per enterprise
          agreement; by default, lead and account data is retained for the duration of your subscription plus 90 days.
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or delete personal information we
          hold about you. Contact privacy@meridian.io to exercise these rights.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to privacy@meridian.io.</p>
      </div>
    </div>
  );
}
