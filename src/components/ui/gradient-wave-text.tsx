"use client";

import { useRef, useEffect } from "react";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }

interface GradientWaveTextProps {
  text: string;
  className?: string;
  inactiveColor?: string;
  activeColor?: string;
}

export function GradientWaveText({
  text,
  className,
  inactiveColor = "rgba(255,255,255,0.3)",
  activeColor = "#0aa39f",
}: GradientWaveTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-w]"));
    const total = spans.length;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const ih = window.innerHeight;
      // 0 when element's top hits 80% of viewport, 1 when bottom exits 20%
      const progress = clamp01((ih * 0.75 - rect.top) / (rect.height + ih * 0.3));

      spans.forEach((span, i) => {
        // Each word activates one at a time across the scroll range
        const wp = clamp01(progress * total - i);

        if (wp <= 0) {
          span.style.color = inactiveColor;
        } else if (wp < 1) {
          // wave: briefly flash brighter before settling
          const bright = wp < 0.4
            ? `rgba(10,230,220,${0.6 + wp * 1.0})`
            : activeColor;
          span.style.color = bright;
        } else {
          span.style.color = activeColor;
        }
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inactiveColor, activeColor]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-w
          style={{ color: inactiveColor, transition: "color 0.25s ease" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
