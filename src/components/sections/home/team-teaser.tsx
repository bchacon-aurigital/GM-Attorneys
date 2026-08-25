"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { TeamCard } from "@/components/ui/team-card";
import { team, type TeamMember } from "@/data/team";

function getRandomMembers(count: number): TeamMember[] {
  const shuffled = [...team].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function TeamTeaser() {
  const t = useTranslations("home");
  const [members, setMembers] = useState<TeamMember[]>(() => team.slice(0, 3));

  useEffect(() => {
    setMembers(getRandomMembers(3));
  }, []);

  return (
    <Section>
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[70px]">
        <h2 className="font-inter text-2xl sm:text-3xl lg:text-5xl font-medium uppercase tracking-tight leading-tight indent-[38%] sm:indent-[45%] lg:indent-[52%]">
          <span className="text-black/40">{t("teamIntro")} </span>
          <span className="text-black">{t("teamHighlight")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-3">
          {members.map((member, index) => (
            <TeamCard key={member.slug} member={member} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
