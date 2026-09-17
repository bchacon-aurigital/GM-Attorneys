"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { mainServices, complementaryServices } from "@/data/services";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const tServices = useTranslations("services");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const allServices = [...mainServices, ...complementaryServices];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("from_name") as HTMLInputElement)?.value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("from_email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    if (!name || !phone || !email || !message) {
      setError(t("form.errorRequired"));
      return;
    }

    if (!captchaChecked) {
      setError(t("form.errorCaptcha"));
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none";

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded border border-[#240824]/15 p-8 sm:p-10">
        <p className="text-lg font-semibold text-[#0aa39f]">{t("form.successTitle")}</p>
        <p className="text-sm text-[#240824]/70">{t("form.successBody")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 w-fit rounded bg-[#240824] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-semibold text-[#240824]">
            {t("form.name")} *
          </label>
          <input
            id="contact-name"
            name="from_name"
            type="text"
            placeholder={t("form.namePlaceholder")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-sm font-semibold text-[#240824]">
            {t("form.phone")} *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder={t("form.phonePlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-semibold text-[#240824]">
            {t("form.email")} *
          </label>
          <input
            id="contact-email"
            name="from_email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-service" className="text-sm font-semibold text-[#240824]">
            {t("form.service")} *
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>—</option>
            {allServices.map((service) => (
              <option key={service.key} value={service.key}>
                {tServices(`list.${service.titleKey}.title`).replace(/\n/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-semibold text-[#240824]">
          {t("form.subject")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t("form.subjectPlaceholder")}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-details" className="text-sm font-semibold text-[#240824]">
          {t("form.details")} *
        </label>
        <textarea
          id="contact-details"
          name="message"
          rows={6}
          className={`resize-none ${inputClass}`}
        />
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-3 rounded border border-[#240824]/15 px-4 py-3 text-sm text-[#240824]">
        <input
          type="checkbox"
          className="size-4 accent-[#240824]"
          checked={captchaChecked}
          onChange={(e) => setCaptchaChecked(e.target.checked)}
        />
        {t("form.captcha")}
      </label>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          {t("form.errorTitle")} {t("form.errorBody")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-[#240824] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("form.sending") : t("form.submit")}
      </button>
    </form>
  );
}
