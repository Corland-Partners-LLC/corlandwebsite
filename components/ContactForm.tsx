"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  smsConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  smsConsent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please tell us a bit more (at least 10 characters).";
  }

  if (values.smsConsent && !values.phone.trim()) {
    errors.phone = "Please enter your phone number to opt in to SMS messages.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  // Spam defenses, invisible to real visitors: `website` is a honeypot field
  // (hidden from sighted and AT users alike — bots that auto-fill every
  // field they find in the markup fill it, real visitors never do) and
  // `formRenderedAt` lets the server reject submissions sent implausibly
  // fast after the page loaded (bots skip the time a human takes to read
  // and type). Both are checked server-side in app/api/contact/route.ts.
  const [website, setWebsite] = useState("");
  const [formRenderedAt] = useState(() => Date.now());

  function handleChange(field: keyof FormState) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleSmsConsentChange(event: ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, smsConsent: event.target.checked }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website,
          ts: formRenderedAt,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data?.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-teal-200 bg-teal-50 p-6 font-body text-navy-900"
      >
        <p className="font-heading text-lg font-bold">Message received</p>
        <p className="mt-2 text-sm">
          Thanks — we&apos;ve received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from sighted and assistive-tech users via
          aria-hidden and off-screen positioning (not display:none/
          visibility:hidden, which some bots detect and skip). Real
          visitors never see or fill this; a non-empty value server-side
          means the request wasn't a human using this form. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block font-heading text-sm font-semibold text-navy-900">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-1 w-full rounded-md border border-navy-200 px-4 py-2 font-body text-navy-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-200"
        />
        {errors.name ? (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="block font-heading text-sm font-semibold text-navy-900">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-1 w-full rounded-md border border-navy-200 px-4 py-2 font-body text-navy-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-200"
        />
        {errors.email ? (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block font-heading text-sm font-semibold text-navy-900">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-1 w-full rounded-md border border-navy-200 px-4 py-2 font-body text-navy-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-200"
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company" className="block font-heading text-sm font-semibold text-navy-900">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange("company")}
            className="mt-1 w-full rounded-md border border-navy-200 px-4 py-2 font-body text-navy-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-200"
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="smsConsent"
          name="smsConsent"
          type="checkbox"
          checked={values.smsConsent}
          onChange={handleSmsConsentChange}
          className="mt-1 h-5 w-5 shrink-0 rounded border-navy-300 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        />
        <label htmlFor="smsConsent" className="font-body text-sm leading-relaxed text-navy-700">
          I agree to receive text messages from Corland Partners in response to my
          inquiry, including customer service communications, appointment
          coordination, and updates related to my request. Message frequency
          varies. Message and data rates may apply. Reply STOP to unsubscribe or
          HELP for assistance. Consent is not a condition of purchase. See our{" "}
          <Link href="/privacy#text-messaging-sms-communications" className="underline hover:text-teal-700">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms#sms-terms-and-conditions" className="underline hover:text-teal-700">
            SMS Terms
          </Link>
          .
        </label>
      </div>

      <div>
        <label htmlFor="message" className="block font-heading text-sm font-semibold text-navy-900">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-1 w-full rounded-md border border-navy-200 px-4 py-2 font-body text-navy-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-200"
        />
        {errors.message ? (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong sending your message. Please try again, or
          reach us directly using the contact details below.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
