"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { GradientWaveText } from "@/components/ui/gradient-wave-text";

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
        <h2
          className="text-2xl sm:text-3xl lg:text-5xl font-medium uppercase tracking-tight leading-tight indent-[30%] sm:indent-[35%] lg:indent-[42%]"
        >
          <span className="text-black/40">{t("valuesIntro")} </span>
          <GradientWaveText text={t("valuesHighlight")} inactiveColor="#000000" activeColor="#0aa39f" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-black/20">
          {values.map((value, index) => (
            <div
              key={value.key}
              className={`flex flex-col gap-8 lg:gap-12 py-6 px-0 lg:px-6 ${
                index > 0 ? "lg:border-l" : ""
              } border-black/20`}
            >
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                {t(`values.${value.key}.title`)}
              </h3>
              <p
                className="text-sm sm:text-base font-medium max-w-md"
                data-aos="fade-up"
              >
                {t(`values.${value.key}.quote`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
