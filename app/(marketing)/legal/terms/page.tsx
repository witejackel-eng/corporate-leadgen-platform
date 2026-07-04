import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-28">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated January 1, 2026</p>
      <div className="prose prose-neutral mt-10 max-w-none">
        <p>
          These Terms of Service govern access to and use of the Meridian platform. By creating an account or using
          our services, you agree to these terms on behalf of yourself and, if applicable, your organization.
        </p>
        <h2>Use of the service</h2>
        <p>
          You may use Meridian only in compliance with these terms and all applicable laws. You are responsible for
          the accuracy of data you connect to Meridian and for maintaining the confidentiality of your account
          credentials.
        </p>
        <h2>Subscription and billing</h2>
        <p>
          Enterprise subscriptions are billed annually per the order form executed with your organization. Fees are
          non-refundable except as required by law or expressly stated in your order form.
        </p>
        <h2>Data ownership</h2>
        <p>
          You retain ownership of all data you connect to or upload into Meridian. We process that data solely to
          provide the service, per our Privacy Policy and your Data Processing Agreement.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Meridian&apos;s aggregate liability arising from these terms will not
          exceed the fees paid by you in the twelve months preceding the claim.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to legal@meridian.io.</p>
      </div>
    </div>
  );
}
