"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { useLoading } from "@/app/[locale]/context/LoadingContext";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
const SCROLL_THRESHOLD = 10;

export function StickyCtaButtons() {
  const t = useTranslations("home");
  const { isReady } = useLoading();
  const { open } = useContactDrawer();
  const [animDone, setAnimDone] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);
  const lastScrollY = useRef(0);
  const animDoneRef = useRef(false);

  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => {
      animDoneRef.current = true;
      setAnimDone(true);
    }, 1150);
    return () => clearTimeout(timer);
  }, [isReady]);

  const onScroll = useCallback(({ scroll }: { scroll: number }) => {
    if (!animDoneRef.current) return;
    const delta = scroll - lastScrollY.current;
    if (delta > SCROLL_THRESHOLD) {
      setScrollVisible(true);
      lastScrollY.current = scroll;
    } else if (delta < -SCROLL_THRESHOLD || scroll <= 50) {
      setScrollVisible(false);
      lastScrollY.current = scroll;
    }
  }, []);

  useLenis(onScroll);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-10 z-50 flex items-center gap-2 sm:gap-3",
        animDone && "transition-transform duration-300",
        animDone && !scrollVisible && "translate-y-[calc(100%+1.5rem)] sm:translate-y-0"
      )}
      style={
        !animDone
          ? isReady
            ? { animation: `heroFadeUp 0.8s ${ease} 0.35s both` }
            : { opacity: 0 }
          : undefined
      }
    >
      <Link
        href="/newslettersubs"
        className="flex items-center gap-2 sm:gap-3 rounded bg-black/35 backdrop-blur-md border border-white/40 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-white transition-colors duration-300 hover:bg-black/50"
      >
        <span className="whitespace-nowrap">{t("areYouProtected")}</span>
        <FaArrowUp className="shrink-0 rotate-90 text-white" size={12} aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-2 sm:gap-3 rounded bg-white px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-black shadow-sm transition-opacity duration-300 hover:opacity-90"
      >
        <span className="whitespace-nowrap">{t("getInTouch")}</span>
        <FaArrowUp className="shrink-0 rotate-90 text-black" size={12} aria-hidden="true" />
      </button>
    </div>
  );
}
