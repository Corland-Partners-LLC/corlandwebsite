import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/content/company";
import {
  contactConfirmationHtml,
  contactConfirmationText,
  contactEmailHtml,
  contactEmailText,
} from "@/lib/contact-email";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  smsConsent?: boolean;
  pageUrl?: string;
  // Spam defenses — see components/ContactForm.tsx for what sets these.
  website?: string; // honeypot; a real visitor never fills this
  ts?: number; // Date.now() when the form rendered client-side
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimum plausible time (ms) between the form rendering and a human
// submitting it. Bots that fill and submit forms programmatically are
// almost always faster than this.
const MIN_SUBMIT_DELAY_MS = 2500;

// Per-IP submission rate limit. In-memory, so it resets on every deploy
// or restart and doesn't share state across multiple instances — a
// pragmatic first line of defense for a single-instance deployment, not
// a durable/distributed limiter.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_WINDOW = 5;
const submissionsByIp = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "unknown";
}

/** Records this submission against the IP's window and reports whether
 * that IP has now exceeded the allowed rate. */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_PER_WINDOW;
}

function validate(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name || !payload.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!payload.email || !payload.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!payload.message || !payload.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (payload.message.trim().length < 10) {
    errors.message = "Please tell us a bit more (at least 10 characters).";
  }

  if (payload.smsConsent && (!payload.phone || !payload.phone.trim())) {
    errors.phone = "Please enter your phone number to opt in to SMS messages.";
  }

  return errors;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, errors: { message: "Invalid request body." } },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions from this network. Please try again later or contact us by phone.",
      },
      { status: 429 },
    );
  }

  const honeypotFilled = Boolean(payload.website && payload.website.trim());
  const submittedTooFast =
    typeof payload.ts === "number" && Date.now() - payload.ts < MIN_SUBMIT_DELAY_MS;

  if (honeypotFilled || submittedTooFast) {
    // Quietly accept without validating or sending anything — looking
    // identical to a real success response means a bot has no signal to
    // adapt on.
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_EMAIL_FROM;
  const to = process.env.CONTACT_FORM_TO_EMAIL
    ? process.env.CONTACT_FORM_TO_EMAIL.split(",").map((address) => address.trim())
    : company.email;

  if (!apiKey || !from) {
    console.error(
      "Contact form: RESEND_API_KEY or RESEND_EMAIL_FROM is not configured — cannot send email.",
    );
    return NextResponse.json(
      { success: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const name = payload.name!.trim();
  const email = payload.email!.trim();
  const phone = payload.phone?.trim();
  const companyName = payload.company?.trim();
  const message = payload.message!.trim();
  const smsConsent = Boolean(payload.smsConsent);
  // pageUrl is purely informational (which page the form was on) — trust
  // but don't let a missing/odd value break the request.
  const pageUrl = payload.pageUrl?.trim() || undefined;

  const emailFields = { name, email, phone, companyName, message, smsConsent, pageUrl };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: contactEmailText(emailFields),
      html: contactEmailHtml(emailFields),
    });

    if (error) {
      console.error("Contact form: Resend returned an error.", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact form: failed to send email via Resend.", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 502 },
    );
  }

  // Best-effort visitor confirmation — the submission already succeeded
  // above, so a failure here shouldn't fail the whole request or leave
  // the visitor thinking their message wasn't received.
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject: `We've received your message — ${company.name}`,
      text: contactConfirmationText({ name, message }),
      html: contactConfirmationHtml({ name, message, pageUrl }),
    });

    if (error) {
      console.error(
        "Contact form: failed to send visitor confirmation email.",
        error,
      );
    }
  } catch (error) {
    console.error(
      "Contact form: failed to send visitor confirmation email.",
      error,
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
