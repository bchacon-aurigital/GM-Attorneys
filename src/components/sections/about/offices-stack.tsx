"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { officesHistory } from "@/data/offices-history";
 
function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function mapRange(v: number, lo: number, hi: number) { return clamp01((v - lo) / (hi - lo)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

// ─── Scroll geometry ────────────────────────────────────────────────────────
// Each slide's ep 0→1 spans exactly ANIM_FRACTION × slideHeight of scroll.
// Slide 0  : ep = (0.5×ih − rect.top)  / animRange
//              starts when section is 50% into viewport
//              ends   at rect.top ≈ −1.7×ih   (with SLIDE_VH=400)
//
// Slides 1+: epRaw = (−rect.top − (i−1)×slideHeight) / slideHeight
//            ep    = (epRaw − EPRAW_START) / ANIM_FRACTION
//              EPRAW_START=0.43  →  ep=0 at rect.top≈−1.72×ih
//              This makes slide N+1 begin AFTER slide N finishes. No cropping.
//
// Image curtain (slides 1+): epRaw 0.41→0.65  →  fully revealed at ep≈0.40
// ─────────────────────────────────────────────────────────────────────────────
const SLIDE_VH      = 200;
const ANIM_FRACTION = 0.55;   // animRange = 0.55 × slideHeight = 2.2×ih
const EPRAW_START   = 0.43;   // slides 1+ ep=0 aligns with slide 0 ep=1

const CIRCUMFERENCE = 276.46; // 2π × 44

// ─── Per-slide animation timing (in ep 0→1 space) ───────────────────────────
const CIRCLE_FILL_START = 0.05;
const CIRCLE_FILL_END   = 0.50;  // circle fully loaded at ep=0.50

// text fires at 50% of circle fill range
const TEXT_START = CIRCLE_FILL_START + 0.50 * (CIRCLE_FILL_END - CIRCLE_FILL_START); // 0.275

// circle starts fading immediately when loading ends
const CIRCLE_EXIT_START = 0.50;
const CIRCLE_EXIT_END   = 0.68;

// blur fades out as circle fills: max blur at ep=0, fully clear by ep=CIRCLE_FILL_END
const BLUR_END = CIRCLE_FILL_END; // 0.50

export function OfficesStack() {
  const t = useTranslations("officesHistory");
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const viewportRef   = useRef<HTMLDivElement>(null);
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
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const wrapper  = wrapperRef.current;
      const viewport = viewportRef.current;
      if (!wrapper || !viewport) { rafRef.current = requestAnimationFrame(update); return; }

      const rect = wrapper.getBoundingClientRect();
      const ih   = window.innerHeight;
      const slideHeight = (SLIDE_VH / 100) * ih;
      const animRange   = ANIM_FRACTION * slideHeight; // 2.2×ih

      // ── Sticky viewport ───────────────────────────────────────────────────
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

      officesHistory.forEach((_, index) => {
        // ── Unified ep: same 2.2×ih window for every slide ───────────────────
        let ep: number;
        if (index === 0) {
          ep = clamp01((ih * 0.5 - rect.top) / animRange);
        } else {
          const epRaw = clamp01((-rect.top - (index - 1) * slideHeight) / slideHeight);

          // Image curtain: slides up from bottom; fully revealed at ep ≈ 0.40
          const curtain = easeOut3(mapRange(epRaw, 0.41, 0.65));
          const img = imageRefs.current[index];
          if (img) img.style.transform = `translateY(${(1 - curtain) * 100}%)`;

          ep = clamp01((epRaw - EPRAW_START) / ANIM_FRACTION);
        }

        // ── Image blur: max blur → clear as circle fills ─────────────────────
        const imgEl = imgElRefs.current[index];
        if (imgEl) {
          const blurPx = 20 * (1 - easeOut3(mapRange(ep, 0.0, BLUR_END)));
          imgEl.style.filter = `blur(${blurPx.toFixed(1)}px)`;
        }

        // ── Circle stroke fill ────────────────────────────────────────────────
        const circleStroke = circleStrokeRefs.current[index];
        if (circleStroke) {
          const fill = easeOut3(mapRange(ep, CIRCLE_FILL_START, CIRCLE_FILL_END));
          circleStroke.setAttribute("stroke-dashoffset", String(CIRCUMFERENCE * (1 - fill)));
        }

        // ── Circle wrapper: fade in → stay visible → shrink up & fade out ────
        const circleWrapper = circleWrapperRefs.current[index];
        if (circleWrapper) {
          const fadeIn = easeOut3(mapRange(ep, 0.0, 0.08));
          const exit   = easeOut3(mapRange(ep, CIRCLE_EXIT_START, CIRCLE_EXIT_END));
          circleWrapper.style.transform = `scale(${1 - exit * 0.45}) translateY(${exit * -80}px)`;
          circleWrapper.style.opacity   = String(fadeIn * (1 - exit));
        }

        // ── White card: clip-path grows from bottom-left, fires at TEXT_START ─
        const card = cardRefs.current[index];
        if (card) {
          const s = TEXT_START;
          const topClip =
            90 * (1 - easeOut3(mapRange(ep, s, s + 0.18)));
          const rightClip =
            ep < s + 0.34
              ? 100 - 50 * easeOut3(mapRange(ep, s, s + 0.34))
              : 50 * (1 - easeOut3(mapRange(ep, s + 0.30, s + 0.52)));
          card.style.clipPath = `inset(${topClip}% ${rightClip}% 0% 0%)`;
        }

        // ── Title ─────────────────────────────────────────────────────────────
        const title = titleRefs.current[index];
        if (title) {
          const tp = easeOut3(mapRange(ep, TEXT_START + 0.01, TEXT_START + 0.17));
          title.style.opacity   = String(tp);
          title.style.transform = `translateY(${(1 - tp) * 22}px)`;
        }

        // ── Para 1 ────────────────────────────────────────────────────────────
        const p1 = para1Refs.current[index];
        if (p1) {
          const pp = easeOut3(mapRange(ep, TEXT_START + 0.08, TEXT_START + 0.24));
          p1.style.opacity   = String(pp);
          p1.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        // ── Para 2 ────────────────────────────────────────────────────────────
        const p2 = para2Refs.current[index];
        if (p2) {
          const pp = easeOut3(mapRange(ep, TEXT_START + 0.16, TEXT_START + 0.32));
          p2.style.opacity   = String(pp);
          p2.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        // ── Para 3 ────────────────────────────────────────────────────────────
        const p3 = para3Refs.current[index];
        if (p3) {
          const pp = easeOut3(mapRange(ep, TEXT_START + 0.29, TEXT_START + 0.43));
          p3.style.opacity   = String(pp);
          p3.style.transform = `translateX(${(1 - pp) * 20}px)`;
        }

        // ── Para 4 ────────────────────────────────────────────────────────────
        const p4 = para4Refs.current[index];
        if (p4) {
          const pp = easeOut3(mapRange(ep, TEXT_START + 0.38, TEXT_START + 0.52));
          p4.style.opacity   = String(pp);
          p4.style.transform = `translateX(${(1 - pp) * 20}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
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
              {/* Background image */}
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

              {/* ── Founding year circle ─────────────────────────────────── */}
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

              {/* White card — expands from bottom-left corner */}
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
