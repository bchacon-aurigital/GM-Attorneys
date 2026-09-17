"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: Props) {
  const t = useTranslations("newsletter");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  function handleSubmit() {
    const a = document.createElement("a");
    a.href = "/docs/Are-you-legally-protected.pdf";
    a.download = "Are-you-legally-protected.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-0 z-[61] flex items-center justify-center p-4 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full max-w-md bg-white shadow-2xl rounded-lg transition-transform duration-300",
            isOpen ? "scale-100" : "scale-95"
          )}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded transition-opacity duration-200 hover:opacity-60"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#240824" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8 pt-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#240824]/50">
              {t("eyebrow")}
            </p>
            <h2 className="mb-2 text-2xl font-bold text-[#240824]">{t("title")}</h2>
            <p className="mb-6 text-sm text-[#240824]/70">{t("subtitle")}</p>

            <form
              action="https://gmattorneyscr.us8.list-manage.com/subscribe/post?u=d4da0a234bf2ecbaa28c8a7bb&amp;id=95fa3de6ad&amp;f_id=003733e3f0"
              method="post"
              target="_blank"
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  name="FNAME"
                  placeholder={t("firstName")}
                  required
                  className="min-w-0 flex-1 rounded border border-[#240824]/20 px-3 py-2.5 text-sm text-[#240824] placeholder-[#240824]/40 focus:border-[#240824]/60 focus:outline-none"
                />
                <input
                  type="text"
                  name="LNAME"
                  placeholder={t("lastName")}
                  className="min-w-0 flex-1 rounded border border-[#240824]/20 px-3 py-2.5 text-sm text-[#240824] placeholder-[#240824]/40 focus:border-[#240824]/60 focus:outline-none"
                />
              </div>
              <input
                type="email"
                name="EMAIL"
                placeholder={t("email")}
                required
                className="rounded border border-[#240824]/20 px-3 py-2.5 text-sm text-[#240824] placeholder-[#240824]/40 focus:border-[#240824]/60 focus:outline-none"
              />
              {/* Mailchimp honeypot anti-spam */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input type="text" name="b_d4da0a234bf2ecbaa28c8a7bb_95fa3de6ad" tabIndex={-1} defaultValue="" />
              </div>
              <button
                type="submit"
                className="mt-1 w-full rounded bg-[#240824] px-4 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#240824]/80"
              >
                {t("submit")}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-[#240824]/40">{t("disclaimer")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
