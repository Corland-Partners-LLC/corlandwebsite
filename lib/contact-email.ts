import { company } from "@/content/company";

export type ContactEmailFields = {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  message: string;
  pageUrl?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Plain-text fallback for email clients that don't render HTML. */
export function contactEmailText({
  name,
  email,
  phone,
  companyName,
  message,
  pageUrl,
}: ContactEmailFields): string {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    companyName ? `Company: ${companyName}` : null,
    pageUrl ? `Submitted from: ${pageUrl}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/** Branded HTML version, matching the site's navy/teal design system. */
export function contactEmailHtml({
  name,
  email,
  phone,
  companyName,
  message,
  pageUrl,
}: ContactEmailFields): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";
  const logoUrl = `${siteUrl}/images/logo/corland-partners-logo-horizontal.png`;

  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email, href: `mailto:${email}` },
    phone ? { label: "Phone", value: phone, href: `tel:${phone}` } : null,
    companyName ? { label: "Company", value: companyName } : null,
    pageUrl ? { label: "Submitted from", value: pageUrl, href: pageUrl } : null,
  ].filter((row): row is { label: string; value: string; href?: string } => row !== null);

  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding: 6px 16px 6px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #0b3c68; white-space: nowrap; vertical-align: top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding: 6px 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #092f51;">
            ${row.href ? `<a href="${escapeHtml(row.href)}" style="color: #105594; text-decoration: none;">${escapeHtml(row.value)}</a>` : escapeHtml(row.value)}
          </td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin: 0; padding: 0; background-color: #f3f7fa;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f7fa; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e7eef4;">
            <tr>
              <td style="background-color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #105594;">
                <img src="${logoUrl}" alt="${escapeHtml(company.name)}" height="36" style="display: block; height: 36px; width: auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 32px 8px;">
                <p style="margin: 0 0 4px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #2b8992;">
                  New Website Submission
                </p>
                <h1 style="margin: 0 0 20px; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 800; color: #092f51;">
                  New contact form submission from ${escapeHtml(name)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px 28px;">
                <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #0b3c68;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5fcfd; border: 1px solid #cff0f4; border-radius: 6px;">
                  <tr>
                    <td style="padding: 16px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #092f51; white-space: pre-wrap;">${escapeHtml(message)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 32px; background-color: #f3f7fa; border-top: 1px solid #e7eef4;">
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #5888b4;">
                  Sent automatically from the ${escapeHtml(company.name)} website contact form. Reply to this email to respond directly to ${escapeHtml(name)}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
