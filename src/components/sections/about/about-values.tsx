import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const values = [
  { key: "commitment" },
  { key: "integrity" },
  { key: "excellence" },
];

export function AboutValues() {
  const t = useTranslations("about");

  return (
    <Section>
      <div className="flex flex-col gap-16 sm:gap-24 lg:gap-[240px]">
        <p
          className="text-2xl sm:text-3xl lg:text-5xl font-medium uppercase tracking-tight leading-tight indent-[30%] sm:indent-[35%] lg:indent-[42%]"
        >
          <span className="text-black/40">{t("valuesIntro")} </span>
          <span className="text-black">{t("valuesHighlight")}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-black/20">
          {values.map((value, index) => (
            <div
              key={value.key}
              className={`flex flex-col justify-between gap-10 lg:gap-0 min-h-[260px] lg:min-h-[466px] py-6 px-0 lg:px-6 ${
                index > 0 ? "lg:border-l" : ""
              } border-black/20`}
            >
              <p className="text-base sm:text-lg font-bold uppercase tracking-wide">
                {t(`values.${value.key}.title`)}
              </p>
              <p className="text-sm sm:text-base font-medium max-w-md">
                {t(`values.${value.key}.quote`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
