const wrapper = (title: string, body: string) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:32px 16px;background:#fbfaf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e7e3dd;overflow:hidden;">
      <tr>
        <td style="padding:32px 36px 0 36px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:28px;height:28px;border-radius:8px;background:#16150f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;">M</div>
            <span style="font-size:16px;font-weight:700;color:#16150f;">Meridian</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 36px 8px 36px;">
          <h1 style="font-size:20px;color:#16150f;margin:0 0 12px 0;">${title}</h1>
          ${body}
        </td>
      </tr>
      <tr>
        <td style="padding:24px 36px 32px 36px;border-top:1px solid #e7e3dd;margin-top:24px;">
          <p style="font-size:12px;color:#86816f;margin:16px 0 0 0;">Meridian, Inc. · Enterprise Marketing &amp; Revenue Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export function leadNotificationEmail(params: {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  source: string;
}) {
  return wrapper(
    "New lead captured",
    `
    <p style="font-size:14px;color:#4a473e;line-height:1.6;">A new lead just came in through <strong>${params.source}</strong>.</p>
    <table role="presentation" style="width:100%;margin-top:16px;font-size:14px;color:#16150f;">
      <tr><td style="padding:6px 0;color:#86816f;width:120px;">Name</td><td style="padding:6px 0;">${params.name}</td></tr>
      <tr><td style="padding:6px 0;color:#86816f;">Email</td><td style="padding:6px 0;">${params.email}</td></tr>
      <tr><td style="padding:6px 0;color:#86816f;">Company</td><td style="padding:6px 0;">${params.company ?? "—"}</td></tr>
      ${params.message ? `<tr><td style="padding:6px 0;color:#86816f;vertical-align:top;">Message</td><td style="padding:6px 0;">${params.message}</td></tr>` : ""}
    </table>
    `
  );
}

export function leadConfirmationEmail(name: string) {
  return wrapper(
    `Thanks for reaching out, ${name.split(" ")[0]}`,
    `<p style="font-size:14px;color:#4a473e;line-height:1.6;">We received your message and a member of our revenue team will follow up within one business day. In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/case-studies" style="color:#2563eb;">latest case studies</a>.</p>`
  );
}

export function passwordResetEmail(resetUrl: string) {
  return wrapper(
    "Reset your password",
    `
    <p style="font-size:14px;color:#4a473e;line-height:1.6;">Click the button below to choose a new password. This link expires in 1 hour.</p>
    <a href="${resetUrl}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">Reset password</a>
    <p style="font-size:12px;color:#86816f;margin-top:16px;">If you didn't request this, you can safely ignore this email.</p>
    `
  );
}

export function newsletterWelcomeEmail() {
  return wrapper(
    "You're subscribed",
    `<p style="font-size:14px;color:#4a473e;line-height:1.6;">Thanks for subscribing to the Meridian newsletter. Expect one thoughtful email a month on pipeline attribution, ABM, and revenue operations — never more.</p>`
  );
}
