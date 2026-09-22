import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
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

  // TODO: Wire this up to a real email/CRM service (e.g. Resend, SendGrid,
  // HubSpot) once credentials are available. For now we only validate the
  // submission and acknowledge receipt — no email is actually sent.
  //
  // Example (Resend):
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Corland Partners Website <no-reply@corlandpartners.com>",
  //     to: "leland@corlandpartners.com",
  //     subject: `New contact form submission from ${payload.name}`,
  //     text: `...`,
  //   });

  return NextResponse.json({ success: true }, { status: 200 });
}
