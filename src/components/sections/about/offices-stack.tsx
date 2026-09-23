"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { officesHistory } from "@/data/offices-history";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function mapRange(v: number, lo: number, hi: number) { return clamp01((v - lo) / (hi - lo)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut3(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

const SLIDE_VH       = 120;
const SNAP_THRESHOLD_FWD  = 0.04; // snap forward after 4% progress (catches entry scroll)
const SNAP_THRESHOLD_BACK = 0.08; // snap backward only after deliberate 8% reverse scroll
const SNAP_DURATION  = 500;
// Frames of stable scrollY before snap fires (~133 ms at 60 fps)
const STABLE_FRAMES  = 8;

const CIRCUMFERENCE = 276.46;

const CIRCLE_FILL_START = 0.05;
const CIRCLE_FILL_END   = 0.50;
const TEXT_START        = CIRCLE_FILL_START + 0.50 * (CIRCLE_FILL_END - CIRCLE_FILL_START);
const CIRCLE_EXIT_START = 0.50;
const CIRCLE_EXIT_END   = 0.68;
const BLUR_END          = CIRCLE_FILL_END;

export function OfficesStack() {
  const t = useTranslations("officesHistory");
  const wrapperRef        = useRef<HTMLDivElement>(null);
  const viewportRef       = useRef<HTMLDivElement>(null);
  const imageRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const imgElRefs         = useRef<(HTMLImageElement | null)[]>([]);
  const cardRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs         = useRef<(HTMLHeadingElement | null)[]>([]);
  const para1Refs         = useRef<(HTMLParagraphElement | null)[]>([]);
  const para2Refs         = useRef<(HTMLParagraphElement | null)[]>([]);
  const para3Refs         = useRef<(HTMLParagraphElement | null)[]>([]);
  const para4Refs         = useRef<(HTMLParagraphElement | null)[]>([]);
  const circleWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleStrokeRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const rafRef            = useRef<number | null>(null);
  const snapRafRef        = useRef<number | null>(null);
  const isSnappingRef     = useRef(false);

  useEffect(() => {
    let prevScrollY   = -1;
    let stableFrames  = 0;
    let scrollDir     = 0; // +1 forward, -1 backward

    // ── Programmatic snap scroll ──────────────────────────────────────────────
    const snapTo = (targetY: number) => {
      if (snapRafRef.current) cancelAnimationFrame(snapRafRef.current);
      const startY    = window.scrollY;
      const distance  = targetY - startY;
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

      const currentIndex    = Math.min(officesHistory.length - 1, Math.floor(rawIndex));
      const currentProgress = clamp01(rawIndex - currentIndex);

      // Already exactly at a snap point — nothing to do
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
      const targetY    = wrapperTop + (targetIndex / officesHistory.length) * scrollableRange;

      isSnappingRef.current = true;
      stableFrames = 0;
      snapTo(targetY);
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    const update = () => {
      const wrapper  = wrapperRef.current;
      const viewport = viewportRef.current;
      if (!wrapper || !viewport) { rafRef.current = requestAnimationFrame(update); return; }

      const rect           = wrapper.getBoundingClientRect();
      const ih             = window.innerHeight;
      const slideHeight    = (SLIDE_VH / 100) * ih;
      const scrollableRange = wrapper.offsetHeight - ih;
      const totalScrolled  = clamp01(-rect.top / scrollableRange);
      const rawIndex       = totalScrolled * officesHistory.length;

      // ── Sticky positioning ────────────────────────────────────────────────
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

      // ── Scroll-stop detection (RAF-based, immune to momentum events) ──────
      const currentScrollY = window.scrollY;
      if (!isSnappingRef.current) {
        if (currentScrollY !== prevScrollY) {
          scrollDir    = currentScrollY > prevScrollY ? 1 : -1;
          stableFrames = 0;
        } else {
          stableFrames++;
          if (stableFrames === STABLE_FRAMES) {
            trySnap(rect, ih, scrollableRange, rawIndex);
          }
        }
      }
      prevScrollY = currentScrollY;

      // ── Per-slide animation ───────────────────────────────────────────────
      officesHistory.forEach((_, index) => {
        let ep: number;
        if (index === 0) {
          const animRange = 0.55 * slideHeight;
          ep = clamp01((ih * 0.5 - rect.top) / animRange);
        } else {
          ep = clamp01(rawIndex - index);

          // Image slides up from bottom: fully revealed at ep = 0.5
          const curtain = easeOut3(mapRange(ep, 0, 0.5));
          const img = imageRefs.current[index];
          if (img) img.style.transform = `translateY(${(1 - curtain) * 100}%)`;
        }

        // Layer animations start after image is partially revealed (slides 1+)
        const layerEp = index === 0 ? ep : clamp01((ep - 0.2) / 0.8);

        const imgEl = imgElRefs.current[index];
        if (imgEl) {
          const blurPx = 20 * (1 - easeOut3(mapRange(layerEp, 0.0, BLUR_END)));
          imgEl.style.filter = `blur(${blurPx.toFixed(1)}px)`;
        }

        const circleStroke = circleStrokeRefs.current[index];
        if (circleStroke) {
          const fill = easeOut3(mapRange(layerEp, CIRCLE_FILL_START, CIRCLE_FILL_END));
          circleStroke.setAttribute("stroke-dashoffset", String(CIRCUMFERENCE * (1 - fill)));
        }

        const circleWrapper = circleWrapperRefs.current[index];
        if (circleWrapper) {
          const fadeIn = easeOut3(mapRange(layerEp, 0.0, 0.08));
          const exit   = easeOut3(mapRange(layerEp, CIRCLE_EXIT_START, CIRCLE_EXIT_END));
          circleWrapper.style.transform = `scale(${1 - exit * 0.45}) translateY(${exit * -80}px)`;
          circleWrapper.style.opacity   = String(fadeIn * (1 - exit));
        }

        const card = cardRefs.current[index];
        if (card) {
          const s = TEXT_START;
          const topClip =
            90 * (1 - easeOut3(mapRange(layerEp, s, s + 0.18)));
          const rightClip =
            layerEp < s + 0.34
              ? 100 - 50 * easeOut3(mapRange(layerEp, s, s + 0.34))
              : 50 * (1 - easeOut3(mapRange(layerEp, s + 0.30, s + 0.52)));
          card.style.clipPath = `inset(${topClip}% ${rightClip}% 0% 0%)`;
        }

        const title = titleRefs.current[index];
        if (title) {
          const tp = easeOut3(mapRange(layerEp, TEXT_START + 0.01, TEXT_START + 0.17));
          title.style.opacity   = String(tp);
          title.style.transform = `translateY(${(1 - tp) * 22}px)`;
        }

        const p1 = para1Refs.current[index];
        if (p1) {
          const pp = easeOut3(mapRange(layerEp, TEXT_START + 0.08, TEXT_START + 0.24));
          p1.style.opacity   = String(pp);
          p1.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        const p2 = para2Refs.current[index];
        if (p2) {
          const pp = easeOut3(mapRange(layerEp, TEXT_START + 0.16, TEXT_START + 0.32));
          p2.style.opacity   = String(pp);
          p2.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        const p3 = para3Refs.current[index];
        if (p3) {
          const pp = easeOut3(mapRange(layerEp, TEXT_START + 0.29, TEXT_START + 0.43));
          p3.style.opacity   = String(pp);
          p3.style.transform = `translateX(${(1 - pp) * 20}px)`;
        }

        const p4 = para4Refs.current[index];
        if (p4) {
          const pp = easeOut3(mapRange(layerEp, TEXT_START + 0.38, TEXT_START + 0.52));
          p4.style.opacity   = String(pp);
          p4.style.transform = `translateX(${(1 - pp) * 20}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (snapRafRef.current) cancelAnimationFrame(snapRafRef.current);
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
              className="absolute inset-0 h-full w-full"
              style={{ zIndex: index + 1 }}
            >
              <div
                ref={(el) => { imageRefs.current[index] = el; }}
                className="absolute inset-0 h-full w-full overflow-hidden"
                style={{ transform: index === 0 ? "translateY(0%)" : "translateY(100%)" }}
              >
                <img
                  ref={(el) => { imgElRefs.current[index] = el; }}
                  src={office.image}
                  alt={office.name}
                  className="absolute inset-0 h-full w-full object-cover scale-[1.08]"
                  style={{ willChange: "filter" }}
                />
              </div>

              <div
                ref={(el) => { circleWrapperRefs.current[index] = el; }}
                className="absolute inset-0 flex items-center justify-center pb-[24%] sm:pb-[16%]"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                <div className="relative flex items-center justify-center w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                    <circle
                      ref={(el) => { circleStrokeRefs.current[index] = el; }}
                      cx="50" cy="50" r="44"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={CIRCUMFERENCE}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span className="relative text-white text-4xl sm:text-5xl font-medium tracking-tight tabular-nums">
                    {office.year}
                  </span>
                </div>
              </div>

              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                className="absolute inset-x-0 bottom-0 overflow-hidden bg-white/65 backdrop-blur-md"
                style={{ clipPath: "inset(90% 100% 0% 0%)" }}
              >
                <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-5 sm:pb-6">
                  <h3
                    ref={(el) => { titleRefs.current[index] = el; }}
                    className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium uppercase tracking-tight text-[#27102b]"
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                  >
                    {office.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 px-4 sm:px-6 lg:px-10 pb-8 sm:pb-10 lg:pb-12">
                  <div className="flex flex-col gap-4">
                    <p
                      ref={(el) => { para1Refs.current[index] = el; }}
                      className="text-sm sm:text-base font-medium leading-relaxed text-black/70"
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      {t(`${office.id}.p1`)}
                    </p>
                    <p
                      ref={(el) => { para2Refs.current[index] = el; }}
                      className="text-sm sm:text-base font-medium leading-relaxed text-black/70"
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      {t(`${office.id}.p2`)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p
                      ref={(el) => { para3Refs.current[index] = el; }}
                      className="text-sm sm:text-base font-medium leading-relaxed text-black/70"
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      {t(`${office.id}.p3`)}
                    </p>
                    <p
                      ref={(el) => { para4Refs.current[index] = el; }}
                      className="text-sm sm:text-base font-medium leading-relaxed text-black/70"
                      style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                      {t(`${office.id}.p4`)}
                    </p>
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
