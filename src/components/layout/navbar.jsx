"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "team", href: "/team" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

const NavDot = ({ light }) => (
  <span
    className={cn(
      "inline-block size-[3px] rounded-full",
      light ? "bg-white/70" : "bg-black/60"
    )}
    aria-hidden="true"
  />
);

const Navbar = ({ variant = "default" }) => {
  const isHome = variant === "home";
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "es" ? "en" : "es";

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHasScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isLight = isHome && !hasScrolled;

  return (
    <>
      <nav
        className={cn(
          "w-full z-50 py-4 sm:py-6 transition-[background-color,box-shadow,transform] duration-300",
          isHome ? "fixed top-0 left-0" : "sticky top-0 left-0",
          isLight ? "bg-transparent" : "bg-white",
          hasScrolled && !isLight ? "shadow-lg" : "",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex-shrink-0" aria-label="Go to home">
              <object
                data="/assets/GM_logotipo.svg"
                type="image/svg+xml"
                width="179"
                height="28"
                className={cn(
                  "h-auto w-[110px] sm:w-[125px] lg:w-[140px] transition-[filter] duration-300",
                  isLight ? "brightness-0 invert" : ""
                )}
                aria-label="GM Attorneys logo"
              >
                <img src="/assets/GM_logotipo.svg" alt="GM Attorneys logo" />
              </object>
            </Link>

            <Link
              href={pathname}
              locale={nextLocale}
              className={cn(
                "flex items-center justify-center rounded-full border size-7 sm:size-8 text-[10px] sm:text-[11px] font-semibold uppercase transition-colors duration-300",
                isLight
                  ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                  : "border-black/20 text-black hover:border-black/40 hover:bg-black/5"
              )}
              aria-label="Switch language"
            >
              {nextLocale.toUpperCase()}
            </Link>
          </div>

          <button
            className={cn(
              "lg:hidden focus:outline-none relative w-6 h-6 z-50 -translate-x-4",
              isLight ? "text-white" : "text-gray-900"
            )}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={cn(
                "absolute w-6 h-0.5 transition-all duration-500 ease-in-out",
                isOpen ? "rotate-45 top-3 bg-gray-900" : cn("top-1", isLight ? "bg-white" : "bg-gray-900")
              )}
            />
            <span
              className={cn(
                "absolute w-6 h-0.5 transition-all duration-500 ease-in-out",
                isOpen ? "opacity-0" : cn("top-3", isLight ? "bg-white" : "bg-gray-900")
              )}
            />
            <span
              className={cn(
                "absolute w-6 h-0.5 transition-all duration-500 ease-in-out",
                isOpen ? "-rotate-45 top-3 bg-gray-900" : cn("top-5", isLight ? "bg-white" : "bg-gray-900")
              )}
            />
          </button>

          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-300",
                  isLight ? "text-white hover:text-white/70" : "text-black hover:text-black/60"
                )}
                role="menuitem"
              >
                <NavDot light={isLight} />
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity duration-500 z-30",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed top-0 right-0 w-[80%] h-full bg-white transform transition-transform duration-500 ease-in-out z-40",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile menu">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="flex items-center gap-2.5 text-black font-semibold hover:text-black/60 px-3 py-2 text-lg transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
                role="menuitem"
              >
                <NavDot />
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <Link
            href={pathname}
            locale={nextLocale}
            onClick={toggleMenu}
            className="mt-auto mb-6 flex w-fit items-center rounded-full border border-black/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
            aria-label="Switch language"
          >
            {nextLocale.toUpperCase()}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
