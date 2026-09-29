"use client";

import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa6";
import { servicesSlides } from "@/data/services-slider";
import { ServicesProgressContainer } from "./services-progress-container";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";

export function ServicesSlider() {
  const t = useTranslations("services");
  const { open } = useContactDrawer();

  return (
    <section className="w-full">
      {servicesSlides.map((slide, index) => (
        <div
          key={slide.key}
          className="relative h-screen w-full overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 h-full w-full blur-[3px]">
            <img
              src={slide.backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="relative grid h-full w-full grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-10">

            {/* Text column */}
            <div className="flex h-full w-full items-end md:items-center px-4 sm:px-6 xl:px-10 xl:order-2">
              <div className="flex flex-col gap-6 text-white">
                <p className="font-manrope whitespace-pre-line text-2xl font-semibold leading-[1.05] tracking-tight sm:text-3xl xl:text-4xl">
                  {t(`list.${slide.key}.title`)}
                </p>
                <p className="font-manrope max-w-md text-sm font-semibold leading-[1.4] tracking-tight text-white/90 sm:text-base">
                  {t(`list.${slide.key}.heading`)}
                </p>
                <button
                  type="button"
                  onClick={open}
                  className="font-manrope flex w-fit items-center gap-3 border-b-[1.5px] border-white/20 py-3 text-base font-semibold text-white hover:opacity-70"
                >
                  <span>{t("getInTouch")}</span>
                  <FaArrowUp className="shrink-0 rotate-90" size={12} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Image column */}
            <div className="relative h-full w-full">

              {/* Purple square */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:top-[137px] xl:translate-y-0 h-[320px] sm:h-[480px] xl:h-[560px]">
                <ServicesProgressContainer
                  className="h-full w-auto aspect-[777/654]"
                  activeIndex={index}
                />
              </div>

              {/* Foreground */}
              <div
                className={`pointer-events-none absolute -bottom-10 left-1/2 w-full ${index === 1 ? "h-[88%] sm:h-[118%] xl:h-[88%]" : index === 2 ? "h-[72%] sm:h-[101%] xl:h-[72%]" : "h-[75%] sm:h-[105%] xl:h-[75%]"}`}
                style={{
                  transform: "translateX(-50%)",
                  zIndex: 2,
                }}
              >
                <img
                  src={slide.foregroundImage}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
