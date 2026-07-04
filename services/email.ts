import { resend } from "@/services/resend";
import {
  leadConfirmationEmail,
  leadNotificationEmail,
  newsletterWelcomeEmail,
  passwordResetEmail,
} from "@/emails/templates";

const FROM = process.env.EMAIL_FROM ?? "Meridian <notifications@meridian.io>";
const SALES_INBOX = process.env.SALES_NOTIFICATION_EMAIL ?? "sales@meridian.io";
const canSendEmail = Boolean(process.env.RESEND_API_KEY);

async function send(params: { to: string; subject: string; html: string }) {
  if (!canSendEmail) {
    console.info(`[email:dev-mode] Would send "${params.subject}" to ${params.to}`);
    return { skipped: true };
  }
  return resend.emails.send({ from: FROM, to: params.to, subject: params.subject, html: params.html });
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  source: string;
}) {
  return send({
    to: SALES_INBOX,
    subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: leadNotificationEmail(lead),
  });
}

export async function sendLeadConfirmation(to: string, name: string) {
  return send({ to, subject: "We received your message", html: leadConfirmationEmail(name) });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return send({ to, subject: "Reset your Meridian password", html: passwordResetEmail(resetUrl) });
}

export async function sendNewsletterWelcome(to: string) {
  return send({ to, subject: "Welcome to the Meridian newsletter", html: newsletterWelcomeEmail() });
}
