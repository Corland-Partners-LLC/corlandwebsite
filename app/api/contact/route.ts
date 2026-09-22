import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/content/company";
import { contactEmailHtml, contactEmailText } from "@/lib/contact-email";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  pageUrl?: string;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  // pageUrl is purely informational (which page the form was on) — trust
  // but don't let a missing/odd value break the request.
  const pageUrl = payload.pageUrl?.trim() || undefined;

  const emailFields = { name, email, phone, companyName, message, pageUrl };

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

  return NextResponse.json({ success: true }, { status: 200 });
}
