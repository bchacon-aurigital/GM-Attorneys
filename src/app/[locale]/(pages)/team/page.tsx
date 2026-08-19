"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { TeamCard } from "@/components/ui/team-card";
import { ContactButton } from "@/components/ui/contact-button";
import { team } from "@/data/team";
import { cn } from "@/lib/utils";

const roleKeys = ["partner", "attorney", "businessDevelopment", "paralegals", "assistants", "seniorCounsel"];

export default function TeamPage() {
  const t = useTranslations("team");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeam = selectedRole ? team.filter((member) => member.roleKey === selectedRole) : team;

  return (
    <>
      <Navbar variant="default" />
      <main>
        <Section className="!pt-6">
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
            <div>
              <h1 className="sr-only">{t("title")}</h1>
              <object
                data="/assets/team/The team.svg"
                type="image/svg+xml"
                aria-label={t("title")}
                className="block w-full aspect-[1856/298]"
              >
                <img src="/assets/team/The team.svg" alt={t("title")} className="block w-full aspect-[1856/298]" />
              </object>
            </div>

            <div className="flex flex-col gap-6 sm:gap-10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="relative sm:w-[299px]" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-2 rounded border-[1.5px] border-black/20 px-4 sm:px-5 py-3 text-sm sm:text-base font-medium text-black"
                  >
                    <span>{t("sortBy")}</span>
                    <span className="flex items-center gap-2">
                      {selectedRole ? t(`roles.${selectedRole}`) : t("sortAll")}
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 11 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}
                      >
                        <path d="M1 1L5.5 5L10 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded border-[1.5px] border-black/20 bg-white">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRole(null);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "block w-full px-4 sm:px-5 py-3 text-left text-sm sm:text-base font-medium transition-colors duration-150 hover:bg-black/5",
                          !selectedRole ? "text-black" : "text-black/60"
                        )}
                      >
                        {t("sortAll")}
                      </button>
                      {roleKeys.map((roleKey) => (
                        <button
                          key={roleKey}
                          type="button"
                          onClick={() => {
                            setSelectedRole(roleKey);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "block w-full px-4 sm:px-5 py-3 text-left text-sm sm:text-base font-medium transition-colors duration-150 hover:bg-black/5",
                            selectedRole === roleKey ? "text-black" : "text-black/60"
                          )}
                        >
                          {t(`roles.${roleKey}`)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <ContactButton
                  href="#contact"
                  text={t("getInTouch")}
                  bgColor="#000000"
                  textColor="#ffffff"
                  className="sm:w-[299px]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {filteredTeam.map((member, index) => (
                  <TeamCard key={member.slug} member={member} index={index} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
