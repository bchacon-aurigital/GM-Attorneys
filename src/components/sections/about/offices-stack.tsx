"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { officesHistory } from "@/data/offices-history";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function mapRange(v: number, lo: number, hi: number) { return clamp01((v - lo) / (hi - lo)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

const SLIDE_VH = 350;

export function OfficesStack() {
  const t = useTranslations("officesHistory");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const para1Refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const para2Refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const para3Refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const para4Refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;
      if (!wrapper || !viewport) { rafRef.current = requestAnimationFrame(update); return; }

      const rect = wrapper.getBoundingClientRect();
      const ih = window.innerHeight;
      const slideHeight = (SLIDE_VH / 100) * ih;

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

      officesHistory.forEach((_, index) => {
        // Raw progress per slide
        const epRaw =
          index === 0
            ? clamp01((ih * 0.45 - rect.top) / (ih * 0.45 + slideHeight * 0.35))
            : clamp01((-rect.top - (index - 1) * slideHeight) / slideHeight);

        // Slide 1+: image curtain slides up from bottom
        if (index > 0) {
          const curtain = easeOut3(mapRange(epRaw, 0.28, 0.72));
          const img = imageRefs.current[index];
          if (img) img.style.transform = `translateY(${(1 - curtain) * 100}%)`;
        }

        // Per-slide animation progress: fresh 0→1 once slide is visible
        const ep = index === 0 ? epRaw : clamp01((epRaw - 0.28) / 0.50);

        // ── White card: clip-path point → half-square → full rectangle ────────
        // topClip: 90%→0% (ep 0→0.35) — card grows in height from bottom
        // rightClip phase 1: 100%→50% (ep 0→0.44) — reveals left half
        // rightClip phase 2: 50%→0% (ep 0.46→0.85) — reveals right half
        const card = cardRefs.current[index];
        if (card) {
          const topClip = 90 * (1 - easeOut3(mapRange(ep, 0, 0.35)));
          const rightClip =
            ep < 0.46
              ? 100 - 50 * easeOut3(mapRange(ep, 0, 0.44))
              : 50 * (1 - easeOut3(mapRange(ep, 0.46, 0.85)));
          card.style.clipPath = `inset(${topClip}% ${rightClip}% 0% 0%)`;
        }

        // ── Title ─────────────────────────────────────────────────────────────
        const title = titleRefs.current[index];
        if (title) {
          const tp = easeOut3(mapRange(ep, 0.08, 0.36));
          title.style.opacity = String(tp);
          title.style.transform = `translateY(${(1 - tp) * 22}px)`;
        }

        // ── Paras 1–2 (left column, phase 1) ─────────────────────────────────
        const p1 = para1Refs.current[index];
        if (p1) {
          const pp = easeOut3(mapRange(ep, 0.20, 0.46));
          p1.style.opacity = String(pp);
          p1.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        const p2 = para2Refs.current[index];
        if (p2) {
          const pp = easeOut3(mapRange(ep, 0.28, 0.54));
          p2.style.opacity = String(pp);
          p2.style.transform = `translateY(${(1 - pp) * 14}px)`;
        }

        // ── Paras 3–4 (right column, phase 2) ────────────────────────────────
        const p3 = para3Refs.current[index];
        if (p3) {
          const pp = easeOut3(mapRange(ep, 0.50, 0.70));
          p3.style.opacity = String(pp);
          p3.style.transform = `translateX(${(1 - pp) * 20}px)`;
        }

        const p4 = para4Refs.current[index];
        if (p4) {
          const pp = easeOut3(mapRange(ep, 0.60, 0.80));
          p4.style.opacity = String(pp);
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
                className="absolute inset-0 h-full w-full"
                style={{ transform: index === 0 ? "translateY(0%)" : "translateY(100%)" }}
              >
                <img
                  src={office.image}
                  alt={office.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* White card — expands from point at bottom-left */}
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                className="absolute inset-x-0 bottom-0 overflow-hidden bg-white/65 backdrop-blur-md"
                style={{ clipPath: "inset(90% 100% 0% 0%)" }}
              >
                {/* Title */}
                <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-5 sm:pb-6">
                  <h3
                    ref={(el) => { titleRefs.current[index] = el; }}
                    className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium uppercase tracking-tight text-[#27102b]"
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                  >
                    {office.name}
                  </h3>
                </div>

                {/* Two-column content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 px-4 sm:px-6 lg:px-10 pb-8 sm:pb-10 lg:pb-12">
                  {/* Left column: paras 1–2 — visible during phase 1 */}
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

                  {/* Right column: paras 3–4 — revealed during phase 2 */}
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
