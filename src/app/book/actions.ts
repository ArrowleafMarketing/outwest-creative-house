"use server";

import { inquiryOptions } from "@/content/book";
import { allSpaces } from "@/content/house";

export type InquiryField = "name" | "email" | "for";

export type InquiryState = {
  status: "idle" | "sent" | "error";
  /** Which fields failed, plus `general` for a delivery failure. Messages live in content. */
  errors?: Partial<Record<InquiryField | "general", true>>;
  /** Echoed back on error: React resets an uncontrolled form after its action runs. */
  values?: Record<string, string | string[]>;
};

const LIMITS = { short: 200, message: 4000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Receives the booking inquiry.
 *
 * ⚠ DELIVERY IS NOT WIRED TO A REAL INBOX YET. If INQUIRY_WEBHOOK_URL is set, the inquiry
 * is POSTed there as JSON — which covers Zapier, Make, Slack, a CRM or a form service
 * without touching this file. If it is NOT set, the inquiry is only written to the server
 * log, and a visitor would be told it was sent when nobody will read it. Set the variable
 * (or replace the delivery block) before launch.
 *
 * Every field is re-validated here — the browser's `required` is a convenience, not a check.
 * Values are trimmed, length-capped and, for the select and checkboxes, matched against the
 * known options so nothing arbitrary is forwarded.
 */
export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: a field real visitors never see. Bots fill it; pretend success and drop it.
  if (String(formData.get("company") ?? "").length > 0) return { status: "sent" };

  const text = (key: string, max: number = LIMITS.short) =>
    String(formData.get(key) ?? "").trim().slice(0, max);

  const knownFor = new Set<string>(inquiryOptions.map((o) => o.value));
  const knownSpaces = new Set<string>(allSpaces.map((s) => s.key));

  const values = {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    for: text("for"),
    spaces: formData.getAll("spaces").map(String).filter((s) => knownSpaces.has(s)),
    date: text("date"),
    length: text("length"),
    message: text("message", LIMITS.message),
  };

  const errors: InquiryState["errors"] = {};
  if (!values.name) errors.name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  if (!knownFor.has(values.for)) errors.for = true;

  if (Object.keys(errors).length) return { status: "error", errors, values };

  const inquiry = {
    ...values,
    forLabel: inquiryOptions.find((o) => o.value === values.for)?.label,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (!res.ok) throw new Error(`Inquiry webhook responded ${res.status}`);
    } else {
      console.warn(`[inquiry] INQUIRY_WEBHOOK_URL is not set — logged only: ${JSON.stringify(inquiry)}`);
    }
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
    return { status: "error", errors: { general: true }, values };
  }

  return { status: "sent" };
}
