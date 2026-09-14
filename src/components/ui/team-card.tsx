"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TeamMember } from "@/data/team";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  const t = useTranslations("team");
  const delay = (index % 6) * 150;
  const [isHovered, setIsHovered] = useState(false);
  const hasBio = member.bio.length > 0;
  const isAboveFold = index < 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    // Dead zone at top: first 25% of card keeps text at start
    const DEAD_TOP = 0.25;
    const adjusted = relY < DEAD_TOP ? 0 : (relY - DEAD_TOP) / (1 - DEAD_TOP);
    const maxScroll = scroll.scrollHeight - scroll.clientHeight;
    targetScrollRef.current = adjusted * maxScroll;

    if (rafRef.current) return;
    const animate = () => {
      const diff = targetScrollRef.current - currentScrollRef.current;
      if (Math.abs(diff) < 0.5) {
        currentScrollRef.current = targetScrollRef.current;
        rafRef.current = null;
      } else {
        currentScrollRef.current += diff * 0.12;
        rafRef.current = requestAnimationFrame(animate);
      }
      if (scroll) scroll.scrollTop = currentScrollRef.current;
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 border-t border-black/20 pt-4 sm:pt-6">
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-black">
        {member.roleKey === "partner"
          ? `${member.name} — ${member.titleTag}`
          : member.name}
      </p>
      <div
        data-aos="zoom-in"
        data-aos-delay={delay}
        onMouseEnter={() => {
          setIsHovered(true);
          currentScrollRef.current = 0;
          targetScrollRef.current = 0;
          if (scrollRef.current) scrollRef.current.scrollTop = 0;
        }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={hasBio ? handleMouseMove : undefined}
        className="relative w-full aspect-[610/770] rounded-[4px] overflow-hidden"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-bottom"
          priority={isAboveFold}
        />
        {member.tagKeys.length > 0 && (
          <div className="absolute inset-0 flex flex-wrap content-end items-end gap-2.5 p-3 sm:p-5">
            {member.tagKeys.map((tagKey) => (
              <span
                key={tagKey}
                className="rounded-[4px] backdrop-blur-[10.45px] bg-black/[0.08] border border-white/[0.12] px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white whitespace-nowrap"
              >
                {t(`tags.${tagKey}`)}
              </span>
            ))}
          </div>
        )}

        {hasBio && (
          <div
            className={cn(
              "absolute inset-0 flex flex-col overflow-hidden bg-[#240824] p-5 sm:p-8 transition-opacity duration-300",
              isHovered ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <img
              src="/assets/home/hero-vector.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-10%] top-1/2 h-[90%] w-auto -translate-y-1/2 rotate-90 opacity-60"
            />

            <div className="relative flex items-center gap-2 shrink-0">
              <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
              <p className="text-sm sm:text-base font-semibold uppercase tracking-tight text-white">
                {member.titleTag}
              </p>
            </div>

            {/* Gradient fade hint at bottom */}
            <div className="relative flex-1 min-h-0 mt-4">
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto scrollbar-none"
              >
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/90 whitespace-pre-line pb-8">
                  {member.bio.join("\n\n")}
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#240824] to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
