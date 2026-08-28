"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { servicesSlides } from "@/data/services-slider";
import { ServicesProgressContainer } from "./services-progress-container";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function mapRange(v: number, lo: number, hi: number) { return clamp01((v - lo) / (hi - lo)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

const SLIDE_VH = 270;

export function ServicesSlider() {
  const t = useTranslations("services");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;

      if (wrapper && viewport) {
        const rect = wrapper.getBoundingClientRect();
        const ih = window.innerHeight;

        // Sticky viewport
        if (rect.top > 0) {
          viewport.style.position = "absolute";
          viewport.style.top = "0";
        } else if (rect.bottom <= ih) {
          viewport.style.position = "absolute";
          viewport.style.top = `${wrapper.offsetHeight - ih}px`;
        } else {
          viewport.style.position = "fixed";
          viewport.style.top = "0";
        }

        const slideHeight = (SLIDE_VH / 100) * ih;
        const totalScrolled = clamp01(-rect.top / (wrapper.offsetHeight - ih));
        const rawIndex = totalScrolled * servicesSlides.length;
        const currentIndex = Math.min(servicesSlides.length - 1, Math.floor(rawIndex));
        const currentProgress = clamp01(rawIndex - currentIndex);

        // Progress bar fills
        const fills = viewport.querySelectorAll<HTMLElement>("[data-segment-fill]");
        fills.forEach((fillEl) => {
          const si = Number(fillEl.getAttribute("data-segment-fill"));
          const pct = si < currentIndex ? 100 : si === currentIndex ? currentProgress * 100 : 0;
          fillEl.style.width = `${pct}%`;
        });

        servicesSlides.forEach((_, index) => {
          // Raw scroll progress within each slide's window.
          // Slide 0: starts when section is ~45% into viewport, spans entry + early sticky.
          // Slides 1+: 0 at the start of their sticky window, 1 at the end.
          const epRaw =
            index === 0
              ? clamp01((ih * 0.45 - rect.top) / (ih * 0.45 + slideHeight * 0.38))
              : clamp01((-rect.top - (index - 1) * slideHeight) / slideHeight);

          // Curtain clip-path for slides after the first.
          // Delayed start (0.32) gives the previous slide time to finish animating.
          if (index > 0) {
            const curtain = easeOut3(mapRange(epRaw, 0.32, 0.82));
            const el = slideRefs.current[index];
            if (el) el.style.clipPath = `inset(${(1 - curtain) * 100}% 0% 0% 0%)`;
          }

          // Layer animation progress: each slide's animations run fresh from 0→1
          // starting exactly when the slide first becomes visible (curtain open).
          // Slide 0 uses epRaw directly; slides 1+ remap from curtain-open to +0.48.
          const ep = index === 0 ? epRaw : clamp01((epRaw - 0.32) / 0.48);

          // ── Background: parallax drift up into place ──────────────────────
          const bg = bgRefs.current[index];
          if (bg) {
            const bgY = (1 - easeOut3(mapRange(ep, 0, 0.9))) * 45;
            bg.style.transform = `translateY(${bgY}px) scale(1.08)`;
          }

          // ── Purple square: point → horizontal line → full square ──────────
          // scaleX: grows first (0.04 → 0.38 of ep)
          // scaleY: grows second, overlapping (0.25 → 0.56 of ep)
          const sq = squareRefs.current[index];
          if (sq) {
            const sx = easeOut3(mapRange(ep, 0.04, 0.38));
            const sy = easeOut3(mapRange(ep, 0.25, 0.56));
            sq.style.transform = `scaleX(${Math.max(0.004, sx)}) scaleY(${Math.max(0.004, sy)})`;
            sq.style.opacity = ep > 0.04 ? "1" : "0";
          }

          // ── Foreground: slides up from below, fades in after square starts ─
          const fg = fgRefs.current[index];
          if (fg) {
            const fgP = easeOut3(mapRange(ep, 0.25, 0.88));
            fg.style.transform = `translateX(-50%) translateY(${(1 - fgP) * 72}px)`;
            fg.style.opacity = String(easeOut3(mapRange(ep, 0.18, 0.56)));
          }

          // ── Text: staggered cascade ───────────────────────────────────────
          const title = titleRefs.current[index];
          if (title) {
            const tp = easeOut3(mapRange(ep, 0.42, 0.70));
            title.style.opacity = String(tp);
            title.style.transform = `translateY(${(1 - tp) * 30}px)`;
          }

          const body = bodyRefs.current[index];
          if (body) {
            const bp = easeOut3(mapRange(ep, 0.54, 0.80));
            body.style.opacity = String(bp);
            body.style.transform = `translateY(${(1 - bp) * 22}px)`;
          }

          const cta = ctaRefs.current[index];
          if (cta) {
            const cp = easeOut3(mapRange(ep, 0.63, 0.88));
            cta.style.opacity = String(cp);
            cta.style.transform = `translateY(${(1 - cp) * 16}px)`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const totalHeight = 100 + (servicesSlides.length - 1) * SLIDE_VH;

  return (
    <section className="w-full">
      <div ref={wrapperRef} className="relative w-full" style={{ height: `${totalHeight}vh` }}>
        <div ref={viewportRef} className="left-0 h-screen w-full overflow-hidden">
          {servicesSlides.map((slide, index) => (
            <div
              key={slide.key}
              ref={(el) => { slideRefs.current[index] = el; }}
              className="absolute inset-0 h-full w-full overflow-hidden"
              style={{
                zIndex: index + 1,
                clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              }}
            >
              {/* Background — parallax layer */}
              <div
                ref={(el) => { bgRefs.current[index] = el; }}
                className="absolute inset-0 h-full w-full blur-[3px]"
                style={{ willChange: "transform" }}
              >
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
                    <div
                      ref={(el) => { titleRefs.current[index] = el; }}
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      <p className="font-manrope whitespace-pre-line text-2xl font-semibold leading-[1.05] tracking-tight sm:text-3xl xl:text-4xl">
                        {t(`list.${slide.key}.title`)}
                      </p>
                    </div>
                    <div
                      ref={(el) => { bodyRefs.current[index] = el; }}
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      <p className="font-manrope max-w-md text-sm font-semibold leading-[1.4] tracking-tight text-white/90 sm:text-base">
                        {t(`list.${slide.key}.heading`)}
                      </p>
                    </div>
                    <div
                      ref={(el) => { ctaRefs.current[index] = el; }}
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      <Link
                        href="/contact-us"
                        className="font-manrope flex w-fit items-center gap-3 border-b-[1.5px] border-white/20 py-3 text-base font-semibold text-white transition-opacity duration-300 hover:opacity-70"
                      >
                        <span>{t("getInTouch")}</span>
                        <FaArrowUp className="shrink-0 rotate-90" size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image column */}
                <div className="relative h-full w-full">

                  {/* Purple square — outer positions, inner scales from a point */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:top-[137px] xl:translate-y-0 h-[320px] sm:h-[480px] xl:h-[560px]">
                    <div
                      ref={(el) => { squareRefs.current[index] = el; }}
                      className="h-full"
                      style={{
                        opacity: 0,
                        transformOrigin: "center center",
                        willChange: "transform, opacity",
                      }}
                    >
                      <ServicesProgressContainer className="h-full w-auto aspect-[777/654]" />
                    </div>
                  </div>

                  {/* Foreground — in front of square (z-index: 2), slides up */}
                  <div
                    ref={(el) => { fgRefs.current[index] = el; }}
                    className={`pointer-events-none absolute -bottom-10 left-1/2 w-full ${index === 2 ? "h-[90%] sm:h-[126%] xl:h-[90%]" : "h-[75%] sm:h-[105%] xl:h-[75%]"}`}
                    style={{
                      transform: "translateX(-50%) translateY(72px)",
                      opacity: 0,
                      zIndex: 2,
                      willChange: "transform, opacity",
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
        </div>
      </div>
    </section>
  );
}
