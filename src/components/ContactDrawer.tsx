"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { cn } from "@/lib/utils";

export function ContactDrawer() {
  const { isOpen, close } = useContactDrawer();
  const t = useTranslations("contact");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
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
  }, [isOpen, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-full w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#240824]/10 px-6 py-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#240824]">
            {t("title")}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-8 items-center justify-center rounded transition-opacity duration-200 hover:opacity-60"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#240824" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
