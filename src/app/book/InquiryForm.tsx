"use client";

import { useActionState, useEffect, useRef } from "react";
import type { form as formCopy } from "@/content/book";
import { submitInquiry, type InquiryState } from "./actions";

type InquiryFormProps = {
  copy: typeof formCopy;
  options: readonly { value: string; label: string }[];
  spaces: readonly { key: string; name: string }[];
  /** Preselected from `?for=` — already validated against `options` by the page. */
  defaultFor?: string;
};

const INITIAL: InquiryState = { status: "idle" };

/** Hairline fields: a rule beneath, no box. The brand's form of restraint. */
const FIELD =
  "mt-3 block w-full rounded-none border-0 border-b border-rule bg-transparent px-0 py-3 font-sans text-base text-on-ground outline-none transition-colors duration-300 placeholder:text-on-ground-dim/60 focus:border-on-ground aria-[invalid=true]:border-adobe";
const LABEL = "eyebrow text-on-ground-dim";
const ERROR = "mt-2 font-sans text-sm text-adobe";

/**
 * The booking inquiry. Client-side only for the pending and result states — the action
 * itself is a Server Function and the form works without JavaScript (progressive
 * enhancement: it posts and re-renders).
 *
 * The submit control is thin-ruled, not filled. BOOK in the masthead remains the site's
 * one filled control; this is the form that control leads to, and it doesn't need to shout.
 */
export function InquiryForm({ copy, options, spaces, defaultFor }: InquiryFormProps) {
  const [state, action, pending] = useActionState(submitInquiry, INITIAL);
  const resultRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen-reader and keyboard users land on the outcome.
  useEffect(() => {
    if (state.status === "sent") resultRef.current?.focus();
  }, [state.status]);

  if (state.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="outline-none">
        <p className="font-display text-[clamp(1.75rem,5.5vw,4rem)] font-light uppercase leading-[1.05] tracking-display">
          {copy.sent.heading}
        </p>
        <p className="paragraph-header mt-6 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.375rem)] text-on-ground">
          {copy.sent.body}
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const str = (key: string) => (typeof v[key] === "string" ? (v[key] as string) : undefined);
  const chosenSpaces = Array.isArray(v.spaces) ? v.spaces : [];
  const err = state.errors ?? {};

  return (
    <form action={action} className="grid grid-cols-1 gap-x-[3vw] gap-y-10 md:grid-cols-2">
      {/* Honeypot — hidden from people and from assistive tech, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="inq-name" className={LABEL}>{copy.fields.name}</label>
        <input
          id="inq-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={str("name")}
          aria-invalid={err.name || undefined}
          aria-describedby={err.name ? "inq-name-err" : undefined}
          className={FIELD}
        />
        {err.name ? <p id="inq-name-err" className={ERROR}>{copy.errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="inq-email" className={LABEL}>{copy.fields.email}</label>
        <input
          id="inq-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={str("email")}
          aria-invalid={err.email || undefined}
          aria-describedby={err.email ? "inq-email-err" : undefined}
          className={FIELD}
        />
        {err.email ? <p id="inq-email-err" className={ERROR}>{copy.errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="inq-phone" className={LABEL}>{copy.fields.phone}</label>
        <input
          id="inq-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={str("phone")}
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="inq-for" className={LABEL}>{copy.fields.for}</label>
        <select
          id="inq-for"
          name="for"
          required
          defaultValue={str("for") ?? defaultFor ?? ""}
          aria-invalid={err.for || undefined}
          aria-describedby={err.for ? "inq-for-err" : undefined}
          className={`${FIELD} appearance-none bg-[length:10px] bg-[right_0.25rem_center] bg-no-repeat bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2010%206'%3E%3Cpath%20d='M1%201l4%204%204-4'%20fill='none'%20stroke='%23998b7c'/%3E%3C/svg%3E")] pr-8`}
        >
          <option value="" disabled>
            {copy.fields.forPlaceholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err.for ? <p id="inq-for-err" className={ERROR}>{copy.errors.for}</p> : null}
      </div>

      <fieldset className="md:col-span-2">
        <legend className={LABEL}>{copy.fields.spaces}</legend>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {spaces.map((space) => (
            <label key={space.key} className="inline-flex cursor-pointer items-center gap-3 font-sans text-sm uppercase tracking-[0.12em]">
              <input
                type="checkbox"
                name="spaces"
                value={space.key}
                defaultChecked={chosenSpaces.includes(space.key)}
                className="size-4 appearance-none border border-on-ground-dim bg-transparent checked:border-on-ground checked:bg-on-ground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              />
              {space.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="inq-date" className={LABEL}>{copy.fields.date}</label>
        <input id="inq-date" name="date" type="date" defaultValue={str("date")} className={FIELD} />
      </div>

      <fieldset>
        <legend className={LABEL}>{copy.fields.length}</legend>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {copy.lengths.map((length) => (
            <label key={length} className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm uppercase tracking-[0.12em]">
              <input
                type="radio"
                name="length"
                value={length}
                defaultChecked={str("length") === length}
                className="size-3.5 appearance-none rounded-full border border-on-ground-dim checked:border-[4px] checked:border-on-ground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              />
              {length}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="md:col-span-2">
        <label htmlFor="inq-message" className={LABEL}>{copy.fields.message}</label>
        <textarea
          id="inq-message"
          name="message"
          rows={5}
          placeholder={copy.fields.messageHint}
          defaultValue={str("message")}
          className={`${FIELD} resize-y`}
        />
      </div>

      <div className="md:col-span-2">
        {err.general ? (
          <p role="alert" className={`${ERROR} mb-6`}>
            {copy.errors.general}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 border border-on-ground px-8 py-4 eyebrow text-on-ground transition-opacity duration-300 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {pending ? copy.sending : copy.submit}
          <span
            aria-hidden="true"
            className="transition-transform duration-[240ms] ease-[var(--ease-editorial)] group-hover:translate-x-1.5"
          >
            →
          </span>
        </button>
      </div>
    </form>
  );
}
