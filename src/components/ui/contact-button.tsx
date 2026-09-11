"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useContactDrawer } from "@/app/[locale]/context/ContactDrawerContext";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  href: string;
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export function ContactButton({
  href,
  text,
  bgColor = "#000000",
  textColor = "#ffffff",
  className,
}: ContactButtonProps) {
  const { open } = useContactDrawer();
  const pathname = usePathname();

  const isContactLink = href === "/contact-us";
  const isOnContactPage = pathname?.includes("/contact-us");

  const sharedClass = cn(
    "flex items-center justify-between gap-2 rounded px-4 sm:px-5 py-3 text-sm sm:text-base font-medium transition-opacity duration-300 hover:opacity-90",
    className
  );

  const arrow = (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 6H14M14 6L9 1M14 6L9 11" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (isContactLink && !isOnContactPage) {
    return (
      <button
        type="button"
        onClick={open}
        style={{ backgroundColor: bgColor, color: textColor }}
        className={sharedClass}
      >
        <span>{text}</span>
        {arrow}
      </button>
    );
  }

  return (
    <Link
      href={href}
      style={{ backgroundColor: bgColor, color: textColor }}
      className={sharedClass}
    >
      <span>{text}</span>
      {arrow}
    </Link>
  );
}
