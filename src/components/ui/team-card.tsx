"use client";

import { useState } from "react";
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

  return (
    <div className="flex flex-col gap-4 sm:gap-6 border-t border-black/20 pt-4 sm:pt-6">
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-black">
        {member.name} - {t(`roles.${member.roleKey}`)}
      </p>
      <div
        data-aos="zoom-in"
        data-aos-delay={delay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[610/770] rounded-[4px] overflow-hidden"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover object-bottom"
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
              "absolute inset-0 flex flex-col justify-between overflow-hidden bg-[#240824] p-5 sm:p-8 transition-opacity duration-300",
              isHovered ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <img
              src="/assets/home/hero-vector.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-10%] top-1/2 h-[90%] w-auto -translate-y-1/2 rotate-90 opacity-60"
            />

            <div className="relative flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
              <p className="text-sm sm:text-base font-semibold uppercase tracking-tight text-white">
                {member.titleTag}
              </p>
            </div>

            <div className="relative overflow-y-auto">
              <p className="text-sm sm:text-base font-medium text-white whitespace-pre-line">
                {member.bio.join("\n\n")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
