"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { TeamCard } from "@/components/ui/team-card";
import { GradientWaveText } from "@/components/ui/gradient-wave-text";
import { visibleTeam } from "@/data/team";

const CARDS_SHOWN = 16;

export function TeamTeaser() {
  const t = useTranslations("home");
  const [members] = useState(() => visibleTeam.slice(0, CARDS_SHOWN));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function cpv() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  function stepPx() {
    const flexDiv = containerRef.current?.firstElementChild as HTMLElement | null;
    if (!flexDiv || flexDiv.children.length < 2) {
      return containerRef.current?.offsetWidth ?? 0;
    }
    const first = flexDiv.children[0] as HTMLElement;
    const second = flexDiv.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = CARDS_SHOWN - cpv();
        return prev >= max ? 0 : prev + 1;
      });
    }, 4000);
  }

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    setDragging(true);
    setDragOffset(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    dragOffsetRef.current = dx;
    setDragOffset(dx);
  }

  function onPointerUp() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const dx = dragOffsetRef.current;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    if (dx < -60) {
      setCurrentIndex((prev) => Math.min(prev + 1, CARDS_SHOWN - cpv()));
    } else if (dx > 60) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    startInterval();
  }

  const translatePx = containerRef.current
    ? -(currentIndex * stepPx()) + dragOffset
    : 0;

  return (
    <Section>
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[70px]">
        <h2 className="font-arial text-2xl sm:text-3xl lg:text-5xl font-medium uppercase tracking-tight leading-tight indent-[38%] sm:indent-[45%] lg:indent-[52%]">
          <GradientWaveText text={t("teamIntro") + " "} inactiveColor="rgba(0,0,0,0.3)" activeColor="#0aa39f" />{" "}
          <span className="text-black">{t("teamHighlight")}</span>
        </h2>

        <div
          ref={containerRef}
          className={`overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="flex gap-6 lg:gap-3"
            style={{
              transform: `translateX(${translatePx}px)`,
              transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              willChange: "transform",
            }}
          >
            {members.map((member, index) => (
              <div
                key={member.slug}
                className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-9px)]"
                style={{ pointerEvents: dragging ? "none" : "auto" }}
              >
                <TeamCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
