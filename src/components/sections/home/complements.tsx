"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";

const complementKeys = [
  "taxLaw",
  "notaryPublic",
  "disputeResolution",
  "intellectualProperty",
  "foreignInvestments",
] as const;

export function Complements() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");
  const { open } = useContactDrawer();

  return (
    <Section>
      <div className="flex flex-col gap-8 sm:gap-10">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[140px] font-medium uppercase tracking-tight text-[#240824] leading-none">
          {t("complementsTitle")}
        </h2>

        <div className="flex flex-col">
          {complementKeys.map((key) => (
            <div
              key={key}
              className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 border-t border-[#240824]/20 py-4 sm:py-6 cursor-default -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
            >
              {/* Left-to-right teal sweep */}
              <div className="absolute inset-0 bg-[#0aa39f] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-1">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#240824] group-hover:text-white whitespace-nowrap transition-colors duration-700 sm:w-52 lg:w-64 shrink-0">
                  {tServices(`list.${key}.title`)}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#240824]/70 group-hover:text-white transition-colors duration-700 group-hover:translate-x-1 translate-x-0 transition-transform">
                  {tServices(`list.${key}.heading`)}
                </p>
              </div>

              <button
                type="button"
                onClick={open}
                className="relative z-10 text-xs sm:text-sm font-medium text-[#240824]/70 group-hover:text-white whitespace-nowrap transition-colors duration-700"
              >
                {tServices("getInTouch")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
