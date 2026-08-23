"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { servicesSlides } from "@/data/services-slider";
import { ServicesProgressContainer } from "./services-progress-container";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const SLIDE_VH = 220;

export function ServicesSlider() {
  const t = useTranslations("services");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;

      if (wrapper && viewport) {
        const wrapperRect = wrapper.getBoundingClientRect();

        if (wrapperRect.top > 0) {
          viewport.style.position = "absolute";
          viewport.style.top = "0";
        } else if (wrapperRect.bottom <= window.innerHeight) {
          viewport.style.position = "absolute";
          viewport.style.top = `${wrapper.offsetHeight - window.innerHeight}px`;
        } else {
          viewport.style.position = "fixed";
          viewport.style.top = "0";
        }

        const slideHeight = (SLIDE_VH / 100) * window.innerHeight;
        const totalScrolled = clamp01(
          -wrapperRect.top / (wrapper.offsetHeight - window.innerHeight)
        );
        const rawIndex = totalScrolled * servicesSlides.length;
        const currentIndex = Math.min(servicesSlides.length - 1, Math.floor(rawIndex));
        const currentProgress = clamp01(rawIndex - currentIndex);

        const fills = viewport.querySelectorAll<HTMLElement>("[data-segment-fill]");
        fills.forEach((fillEl) => {
          const segmentIndex = Number(fillEl.getAttribute("data-segment-fill"));
          const fillPercent =
            segmentIndex < currentIndex ? 100 : segmentIndex === currentIndex ? currentProgress * 100 : 0;
          fillEl.style.width = `${fillPercent}%`;
        });

        servicesSlides.forEach((_, index) => {
          if (index === 0) return;

          const slideTop = (index - 1) * slideHeight;
          const scrolled = clamp01((-wrapperRect.top - slideTop) / slideHeight);
          const curtainProgress = clamp01(scrolled / 0.7);

          const slideEl = slideRefs.current[index];
          if (slideEl) {
            slideEl.style.clipPath = `inset(${(1 - curtainProgress) * 100}% 0% 0% 0%)`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const totalHeight = 100 + (servicesSlides.length - 1) * SLIDE_VH;

  return (
    <section className="w-full">
      <div ref={wrapperRef} className="relative w-full" style={{ height: `${totalHeight}vh` }}>
        <div ref={viewportRef} className="left-0 h-screen w-full overflow-hidden">
          {servicesSlides.map((slide, index) => (
            <div
              key={slide.key}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="absolute inset-0 h-full w-full overflow-hidden"
              style={{
                zIndex: index + 1,
                clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              }}
            >
              <div className="absolute inset-0 h-full w-full blur-[3px] scale-105">
                <Image
                  src={slide.backgroundImage}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="relative grid h-full w-full grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-10 ">

                <div className="flex h-full w-full items-end md:items-center px-4 sm:px-6 xl:px-10 xl:order-2">
                  <div className="flex flex-col gap-6 text-white">
                    <p className="whitespace-pre-line text-2xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-3xl xl:text-4xl">
                      {t(`list.${slide.key}.title`)}
                    </p>
                    <p className="max-w-md text-sm font-semibold uppercase leading-[1.4] tracking-tight text-white/90 sm:text-base">
                      {t(`list.${slide.key}.heading`)}
                    </p>
                    <Link
                      href="/contact"
                      className="flex w-fit items-center gap-3 border-b-[1.5px] border-white/20 py-3 text-base font-semibold text-white transition-opacity duration-300 hover:opacity-70"
                    >
                      <span>{t("getInTouch")}</span>
                      <FaArrowUp className="shrink-0 rotate-90" size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="relative h-full w-full">
                  <ServicesProgressContainer className="absolute left-1/2 top-1/2 h-[320px] w-auto -translate-x-1/2 -translate-y-1/2 sm:h-[480px] xl:top-[137px] xl:h-[560px] xl:translate-y-0" />
                  <div className="pointer-events-none absolute -bottom-10 left-1/2 h-[75%] sm:h-[105%] xl:h-[75%] w-full -translate-x-1/2">
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
        </div>
      </div>
    </section>
  );
}
