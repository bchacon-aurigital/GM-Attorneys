"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { Curve } from "@/components/ui/curve";
import { ContactButton } from "@/components/ui/contact-button";
import { faqCategories, faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

interface AboutFaqProps {
  curveCornerColor?: string;
}

export function AboutFaq({ curveCornerColor = "#1d0120" }: AboutFaqProps) {
  const t = useTranslations("faq");
  const locale = useLocale() as "es" | "en";
  const [selectedCategory, setSelectedCategory] = useState<string>(faqCategories[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = faqItems.filter((item) => item.categoryKey === selectedCategory);

  return (
    <section id="faq" className="relative w-full scroll-mt-24">
      <Curve
        curveColor="#ffffff"
        cornerColor={curveCornerColor}
        corner="right"
        className="h-[100px] sm:h-[160px] lg:h-[226px]"
        contentClassName="items-start pt-6 sm:pt-8"
      >
        <p className="text-5xl sm:text-7xl lg:text-8xl xl:text-[128px] font-medium uppercase tracking-tight text-[#240824]">
          {t("title")}
        </p>
      </Curve>

      <Section className="!pt-8 sm:!pt-10">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                aria-expanded={isSortOpen}
                className="flex w-full items-center justify-between gap-2 rounded border-[1.5px] border-black/20 px-4 sm:px-5 py-3 text-sm sm:text-base font-medium text-black"
              >
                <span>{t("sortBy")}</span>
                <span className="flex items-center gap-2">
                  {t(`categories.${selectedCategory}`)}
                  <svg
                    width="11"
                    height="6"
                    viewBox="0 0 11 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className={cn("transition-transform duration-200", isSortOpen ? "rotate-180" : "")}
                  >
                    <path d="M1 1L5.5 5L10 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              {isSortOpen && (
                <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded border-[1.5px] border-black/20 bg-white max-h-64 overflow-y-auto">
                  {faqCategories.map((categoryKey) => (
                    <button
                      key={categoryKey}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(categoryKey);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "block w-full px-4 sm:px-5 py-3 text-left text-sm sm:text-base font-medium transition-colors duration-150 hover:bg-black/5",
                        selectedCategory === categoryKey ? "text-black" : "text-black/60"
                      )}
                    >
                      {t(`categories.${categoryKey}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ContactButton
              href="/contact-us"
              text={t("getInTouch")}
              bgColor="#240824"
              textColor="#ffffff"
              className="sm:w-[156px]"
            />
          </div>

          <div className="flex flex-col">
            {filteredItems.map((item) => {
              const isOpen = openSlug === item.slug;
              return (
                <div key={item.slug} className="border-t border-black/20">
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#240824]">
                      {item.question[locale]}
                    </span>
                    <span
                      className={cn(
                        "relative mt-1 flex size-6 shrink-0 items-center justify-center transition-transform duration-300",
                        isOpen ? "rotate-45" : ""
                      )}
                    >
                      <span className="absolute h-0.5 w-4 bg-[#240824]" />
                      <span className="absolute h-4 w-0.5 bg-[#240824]" />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl text-sm sm:text-base font-medium text-[#240824]/70 whitespace-pre-line">
                        {item.answer[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </section>
  );
}
