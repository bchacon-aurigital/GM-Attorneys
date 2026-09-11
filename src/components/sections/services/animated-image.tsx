"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

interface AnimatedImageProps {
  className?: string;
  src?: string;
}

export function AnimatedImage({ className, src }: AnimatedImageProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const el = elRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const ih = window.innerHeight;
        // Start when top of image crosses 90% of viewport, complete at 30%
        const progress = clamp01((ih * 0.9 - rect.top) / (ih * 0.6));
        const eased = easeOut3(progress);
        const half = 50 * (1 - eased);
        el.style.clipPath = `inset(0% ${half}% 0% ${half}%)`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      ref={elRef}
      className={cn("relative w-full overflow-hidden rounded", className)}
      style={{ clipPath: "inset(0% 50% 0% 50%)" }}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
