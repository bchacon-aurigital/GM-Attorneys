import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Curve } from "@/components/ui/curve";
import { ContactButton } from "@/components/ui/contact-button";
import { ServiceRow } from "./service-row";
import { mainServices, complementaryServices } from "@/data/services";

export function Services() {
  const t = useTranslations("services");

  return (
    <>
      <Section className="bg-white pb-0">
        <div className="flex flex-col gap-10 sm:gap-16 lg:gap-[86px]">
          <h1 className="text-[#1d0120] text-5xl sm:text-7xl lg:text-8xl xl:text-[128px] font-semibold uppercase tracking-tight leading-[0.95]">
            {t("heroTitle1")}
            <br />
            {t("heroTitle2")}
          </h1>
          <ContactButton
            href="/contact-us"
            text={t("getInTouch")}
            bgColor="#240824"
            textColor="#ffffff"
            className="w-fit sm:w-[299px] py-4"
          />
        </div>
      </Section>

      <Curve
        curveColor="#1d0120"
        cornerColor="#ffffff"
        corner="left"
        contentClassName="items-start pt-6 sm:pt-8"
        className="h-[100px] sm:h-[140px] lg:h-[164px]"
      >
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-white" />
          <h2 className="text-xs sm:text-sm font-bold uppercase text-white">{t("mainServicesLabel")}</h2>
        </div>
      </Curve>

      <Section className="bg-[#1d0120] pt-0 pb-16 sm:pb-24 lg:pb-[120px]">
        <div className="flex flex-col">
          {mainServices.map((service) => (
            <ServiceRow key={service.key} serviceKey={service.key} isDark />
          ))}
        </div>
      </Section>

      <Curve
        curveColor="#ffffff"
        cornerColor="#1d0120"
        corner="left"
        contentClassName="items-start pt-6 sm:pt-8"
        className="h-[100px] sm:h-[140px] lg:h-[164px]"
      >
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-black" />
          <h2 className="text-xs sm:text-sm font-bold uppercase text-black">{t("complementaryLabel")}</h2>
        </div>
      </Curve>

      <Section className="bg-white pt-0 pb-16 sm:pb-24 lg:pb-[120px]">
        <div className="flex flex-col gap-6 sm:gap-10 pt-8 sm:pt-12 lg:pt-16">
          <button
            type="button"
            className="flex items-center justify-between gap-2 rounded border-[1.5px] border-black/20 px-4 sm:px-5 py-3 text-sm sm:text-base font-medium text-black sm:w-[299px]"
          >
            <span>{t("sortBy")}</span>
            <span className="flex items-center gap-2">
              {t("sortAll")}
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 1L5.5 5L10 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <div className="flex flex-col">
            {complementaryServices.map((service) => (
              <ServiceRow key={service.key} serviceKey={service.key} isDark={false} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
