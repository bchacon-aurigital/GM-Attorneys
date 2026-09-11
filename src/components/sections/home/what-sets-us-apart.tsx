import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Curve } from "@/components/ui/curve";
import { GradientWaveText } from "@/components/ui/gradient-wave-text";

const values = [
  { key: "commitment" },
  { key: "integrity" },
  { key: "excellence" },
];

export function WhatSetsUsApart() {
  const t = useTranslations("home");
  const tAbout = useTranslations("about");

  return (
    <section id="testimonials" className="relative w-full bg-[#240824] overflow-hidden scroll-mt-24">
      <Curve
        curveColor="#240824"
        cornerColor="#ffffff"
        corner="right"
        className="h-[100px] sm:h-[160px] lg:h-[226px]"
      />
      <p className="absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-10 lg:top-8 text-xs sm:text-sm font-semibold uppercase tracking-tight text-white/40 whitespace-nowrap">
        {t("whatSetsUsApart")}
      </p>

      <Section className="relative z-10 -mt-1 overflow-hidden bg-[#240824] !pt-8 sm:!pt-10">
        <img
          src="/assets/home/who-we-are-vector.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden h-[90%] w-auto -translate-y-1/2 rotate-90 opacity-40 lg:block"
        />

        <div className="relative flex flex-col gap-16 sm:gap-24 lg:gap-[100px]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold uppercase tracking-tight leading-tight">
            <span className="text-white">{t("apartIntro")} </span>
            <GradientWaveText text={t("apartHighlight")} />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/20">
            {values.map((value, index) => (
              <div
                key={value.key}
                className={`flex flex-col gap-8 lg:gap-12 py-6 px-0 lg:px-6 ${
                  index > 0 ? "lg:border-l" : ""
                } border-white/20`}
              >
                <p className="text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                  {tAbout(`values.${value.key}.title`)}
                </p>
                <p
                  className="text-sm sm:text-base font-medium max-w-md text-white"
                  data-aos="fade-up"
                >
                  {tAbout(`values.${value.key}.quote`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}
