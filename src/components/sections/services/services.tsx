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
          <h1 className="text-[#27102b] text-5xl sm:text-7xl lg:text-8xl xl:text-[128px] font-semibold uppercase tracking-tight leading-[0.95]">
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
        curveColor="#27102b"
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

      <Section className="bg-[#27102b] pt-0 pb-16 sm:pb-24 lg:pb-[120px] relative overflow-hidden">
        <img
          src="/assets/home/hero-vector.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 h-[90%] w-auto -translate-y-1/2 opacity-40"
        />
        <div className="relative flex flex-col">
          {mainServices.map((service) => (
            <ServiceRow key={service.key} serviceKey={service.key} isDark image={service.image} />
          ))}
        </div>
      </Section>

      <Curve
        curveColor="#ffffff"
        cornerColor="#27102b"
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
          <div className="flex flex-col">
            {complementaryServices.map((service) => (
              <ServiceRow key={service.key} serviceKey={service.key} isDark={false} variant="complementary" image={service.image} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
