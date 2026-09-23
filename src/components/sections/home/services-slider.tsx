"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa6";
import { servicesSlides } from "@/data/services-slider";
import { ServicesProgressContainer } from "./services-progress-container";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function mapRange(v: number, lo: number, hi: number) { return clamp01((v - lo) / (hi - lo)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut3(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

// Scroll space reserved per slide. Smaller = less total page height, snap covers the rest.
const SLIDE_VH = 120;
// Fraction of a slide's scroll zone that triggers snap-forward (vs snap-back).
const SNAP_THRESHOLD_FWD  = 0.04;
const SNAP_THRESHOLD_BACK = 0.08;
// Duration of the programmatic snap scroll in ms.
const SNAP_DURATION = 550;

export function ServicesSlider() {
  const t = useTranslations("services");
  const { open } = useContactDrawer();
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
  const snapRafRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    let prevScrollY  = -1;
    let stableFrames = 0;
    let scrollDir    = 0;

    // ── Animation loop ────────────────────────────────────────────────────────
    const update = () => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;

      if (wrapper && viewport) {
        const rect = wrapper.getBoundingClientRect();
        const ih = window.innerHeight;

        // Sticky viewport positioning
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
        const scrollableRange = wrapper.offsetHeight - ih;
        const totalScrolled = clamp01(-rect.top / scrollableRange);
        const rawIndex = totalScrolled * servicesSlides.length;
        const currentIndex = Math.min(servicesSlides.length - 1, Math.floor(rawIndex));

        // ── Scroll-stop detection (RAF-based, direction-aware) ──────────────
        const currentScrollY = window.scrollY;
        if (!isSnappingRef.current) {
          if (currentScrollY !== prevScrollY) {
            scrollDir    = currentScrollY > prevScrollY ? 1 : -1;
            stableFrames = 0;
          } else {
            stableFrames++;
            if (stableFrames === 8) {
              trySnap(rect, ih, scrollableRange, rawIndex);
            }
          }
        }
        prevScrollY = currentScrollY;
        const currentProgress = clamp01(rawIndex - currentIndex);

        // Progress bar fills
        const fills = viewport.querySelectorAll<HTMLElement>("[data-segment-fill]");
        fills.forEach((fillEl) => {
          const si = Number(fillEl.getAttribute("data-segment-fill"));
          const pct = si < currentIndex ? 100 : si === currentIndex ? currentProgress * 100 : 0;
          fillEl.style.width = `${pct}%`;
        });

        servicesSlides.forEach((_, index) => {
          // Slide 0: entry-driven (starts animating as section enters viewport).
          // Slides 1+: clean per-zone ep — 0 at this slide's snap point, 1 at the next.
          const ep =
            index === 0
              ? clamp01((ih * 0.45 - rect.top) / (ih * 0.45 + slideHeight * 0.38))
              : clamp01(rawIndex - index);

          // Curtain clip-path (slides 1+): opens in first 55% of the snap zone.
          if (index > 0) {
            const curtain = easeOut3(mapRange(ep, 0, 0.55));
            const el = slideRefs.current[index];
            if (el) el.style.clipPath = `inset(${(1 - curtain) * 100}% 0% 0% 0%)`;
          }

          // Layer animations start after curtain is partially open (ep > 0.2 for slides 1+).
          const layerEp = index === 0 ? ep : clamp01((ep - 0.2) / 0.8);

          // ── Background: parallax drift up ──────────────────────────────────
          const bg = bgRefs.current[index];
          if (bg) {
            const bgY = (1 - easeOut3(mapRange(layerEp, 0, 0.9))) * 45;
            bg.style.transform = `translateY(${bgY}px) scale(1.08)`;
          }

          // ── Purple square: point → line → square ──────────────────────────
          const sq = squareRefs.current[index];
          if (sq) {
            const sx = easeOut3(mapRange(layerEp, 0.04, 0.38));
            const sy = easeOut3(mapRange(layerEp, 0.25, 0.56));
            sq.style.transform = `scaleX(${Math.max(0.004, sx)}) scaleY(${Math.max(0.004, sy)})`;
            sq.style.opacity = layerEp > 0.04 ? "1" : "0";
          }

          // ── Foreground: slides up and fades in ────────────────────────────
          const fg = fgRefs.current[index];
          if (fg) {
            const fgP = easeOut3(mapRange(layerEp, 0.25, 0.88));
            fg.style.transform = `translateX(-50%) translateY(${(1 - fgP) * 72}px)`;
            fg.style.opacity = String(easeOut3(mapRange(layerEp, 0.18, 0.56)));
          }

          // ── Text: staggered cascade ───────────────────────────────────────
          const title = titleRefs.current[index];
          if (title) {
            const tp = easeOut3(mapRange(layerEp, 0.42, 0.70));
            title.style.opacity = String(tp);
            title.style.transform = `translateY(${(1 - tp) * 30}px)`;
          }

          const body = bodyRefs.current[index];
          if (body) {
            const bp = easeOut3(mapRange(layerEp, 0.54, 0.80));
            body.style.opacity = String(bp);
            body.style.transform = `translateY(${(1 - bp) * 22}px)`;
          }

          const cta = ctaRefs.current[index];
          if (cta) {
            const cp = easeOut3(mapRange(layerEp, 0.63, 0.88));
            cta.style.opacity = String(cp);
            cta.style.transform = `translateY(${(1 - cp) * 16}px)`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(update);
    };

    // ── Programmatic snap scroll ───────────────────────────────────────────────
    const snapTo = (targetY: number) => {
      if (snapRafRef.current) cancelAnimationFrame(snapRafRef.current);
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) { isSnappingRef.current = false; return; }
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - startTime) / SNAP_DURATION, 1);
        window.scrollTo(0, startY + distance * easeInOut3(t));
        if (t < 1) {
          snapRafRef.current = requestAnimationFrame(step);
        } else {
          isSnappingRef.current = false;
        }
      };
      snapRafRef.current = requestAnimationFrame(step);
    };

    const trySnap = (rect: DOMRect, ih: number, scrollableRange: number, rawIndex: number) => {
      if (isSnappingRef.current) return;
      if (rect.top > 0 || rect.bottom <= ih) return;

      const currentIndex    = Math.min(servicesSlides.length - 1, Math.floor(rawIndex));
      const currentProgress = clamp01(rawIndex - currentIndex);

      if (currentProgress < 0.005) return;
      if (currentProgress > 0.995) return;

      let targetIndex: number;
      if (scrollDir >= 0) {
        if (currentProgress < SNAP_THRESHOLD_FWD) return;
        targetIndex = currentIndex + 1;
      } else {
        if (currentProgress > (1 - SNAP_THRESHOLD_BACK)) return;
        targetIndex = currentIndex;
      }

      const wrapperTop = window.scrollY + rect.top;
      const targetY = wrapperTop + (targetIndex / servicesSlides.length) * scrollableRange;

      isSnappingRef.current = true;
      stableFrames = 0;
      snapTo(targetY);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (snapRafRef.current) cancelAnimationFrame(snapRafRef.current);
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
                      <button
                        type="button"
                        onClick={open}
                        className="font-manrope flex w-fit items-center gap-3 border-b-[1.5px] border-white/20 py-3 text-base font-semibold text-white transition-opacity duration-300 hover:opacity-70"
                      >
                        <span>{t("getInTouch")}</span>
                        <FaArrowUp className="shrink-0 rotate-90" size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image column */}
                <div className="relative h-full w-full">

                  {/* Purple square */}
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

                  {/* Foreground */}
                  <div
                    ref={(el) => { fgRefs.current[index] = el; }}
                    className={`pointer-events-none absolute -bottom-10 left-1/2 w-full ${index === 1 ? "h-[88%] sm:h-[118%] xl:h-[88%]" : index === 2 ? "h-[72%] sm:h-[101%] xl:h-[72%]" : "h-[75%] sm:h-[105%] xl:h-[75%]"}`}
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
