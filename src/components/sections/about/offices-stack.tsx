"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { officesHistory } from "@/data/offices-history";
import { OfficeCardCurve } from "./office-card-curve";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const SLIDE_VH = 300;

export function OfficesStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
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

        officesHistory.forEach((_, index) => {
          if (index === 0) return;

          const slideTop = (index - 1) * (SLIDE_VH / 100) * window.innerHeight;
          const slideHeight = (SLIDE_VH / 100) * window.innerHeight;
          const scrolled = clamp01((-wrapperRect.top - slideTop) / slideHeight);

          const imageProgress = clamp01(scrolled / 0.5);
          const infoProgress = clamp01((scrolled - 0.5) / 0.5);

          const imageEl = imageRefs.current[index];
          if (imageEl) {
            imageEl.style.transform = `translateY(${(1 - imageProgress) * 100}%)`;
          }

          const infoEl = infoRefs.current[index];
          if (infoEl) {
            infoEl.style.clipPath = `inset(${(1 - infoProgress) * 100}% 0% 0% 0%)`;
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

  const totalHeight = 100 + (officesHistory.length - 1) * SLIDE_VH;

  return (
    <section className="w-full">
      <div ref={wrapperRef} className="relative w-full" style={{ height: `${totalHeight}vh` }}>
        <div ref={viewportRef} className="left-0 h-screen w-full overflow-hidden">
          {officesHistory.map((office, index) => (
            <div
              key={office.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 h-full w-full"
              style={{
                zIndex: index + 1,
                transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              <Image
                src={office.image}
                alt={office.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />

              <div
                ref={(el) => {
                  infoRefs.current[index] = el;
                }}
                className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-10 py-4"
                style={{ clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              >
                <OfficeCardCurve className="flex h-[90px] sm:h-[120px] lg:h-[160px] w-full items-center px-4 sm:px-6 lg:px-10">
                  <h3 className="max-w-full truncate text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium uppercase tracking-tight text-[#240824]">
                    {office.name}
                  </h3>
                </OfficeCardCurve>
                <div className="w-full bg-white px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
                  <p className="w-full text-sm sm:text-base font-medium text-[#240824]/70">
                    {office.paragraphs.join(" ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
