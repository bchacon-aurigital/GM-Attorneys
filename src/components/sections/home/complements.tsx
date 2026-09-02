import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

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
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 border-t border-[#240824]/20 py-4 sm:py-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-10 lg:gap-[100px]">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#240824] whitespace-nowrap">
                  {tServices(`list.${key}.title`)}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#240824]/70">
                  {tServices(`list.${key}.heading`)}
                </p>
              </div>
              <Link
                href="/contact-us"
                className="text-xs sm:text-sm font-medium text-[#240824]/70 transition-colors duration-300 hover:text-[#240824]"
              >
                {tServices("getInTouch")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
