import Image from "next/image";
import { useTranslations } from "next-intl";
import { Curve } from "@/components/ui/curve";

export function AboutHero() {
  const t = useTranslations("about");

  const heroText = (
    <div className="flex flex-col gap-3 sm:gap-4 min-w-0 w-full">
      <h1 className="sr-only">{t("heroTitle")}</h1>
      <object
        data="/assets/about-us/we-are-gm-attorneys.svg"
        type="image/svg+xml"
        aria-label={t("heroTitle")}
        className="block w-full aspect-[1133/96] h-auto"
      >
        <img
          src="/assets/about-us/we-are-gm-attorneys.svg"
          alt={t("heroTitle")}
          className="block w-full max-w-[720px] h-auto"
        />
      </object>
      <p className="text-sm sm:text-base text-black/70 max-w-xl">
        {t("heroSubtitle")}
      </p>
    </div>
  );

  return (
    <section className="relative w-full h-[90vh] sm:h-screen min-h-[560px] overflow-hidden">
      <Image
        src="/assets/about-us/hero.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />

      <Curve
        curveColor="#ffffff"
        cornerColor="transparent"
        corner="right"
        flip
        className="hidden lg:block absolute top-0 left-0 h-[180px]"
        contentClassName="items-start pt-6 sm:pt-8"
        offset={20}
      >
        {heroText}
      </Curve>

      <Curve
        curveColor="#ffffff"
        cornerColor="transparent"
        corner="right"
        flip
        className="block lg:hidden absolute top-0 left-0 h-[140px] sm:h-[160px]"
        contentClassName="items-end my-2"
      >
        {heroText}
      </Curve>

      <Curve
        curveColor="#ffffff"
        cornerColor="transparent"
        corner="left"
        className="absolute bottom-0 left-0 h-[60px] md:h-[160px]"
      />
    </section>
  );
}
