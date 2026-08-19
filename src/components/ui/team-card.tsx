import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  const t = useTranslations("team");
  const delay = (index % 6) * 150;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 border-t border-black/20 pt-4 sm:pt-6">
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-black">
        {member.name} - {t(`roles.${member.roleKey}`)}
      </p>
      <div
        data-aos="zoom-in"
        data-aos-delay={delay}
        className="relative w-full aspect-[610/770] rounded-[4px] overflow-hidden"
      >
        <Image
          src="/assets/team/team-placeholder.png"
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
      </div>
    </div>
  );
}
