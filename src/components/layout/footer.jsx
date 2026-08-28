import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Curve } from "@/components/ui/curve";
import { cn } from "@/lib/utils";

const shopLinks = [
  { key: "about", href: "/about-us" },
  { key: "services", href: "/practice-areas" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/#faq" },
  { key: "testimonials", href: "/#testimonials" },
  { key: "team", href: "/our-team" },
];

const talkLinks = [
  { key: "email", href: "mailto:info@gmattorneyscr.com" },
  { key: "phone", href: "tel:+50641084070" },
  { key: "whatsapp", href: "https://wa.me/50626532155" },
  { key: "instagram", href: "https://www.instagram.com/gm_attorneys/" },
  { key: "facebook", href: "https://www.facebook.com/gmattorneyscr?fref=ts" },
  { key: "linkedin", href: "https://www.linkedin.com/company/gm-attorneys" },
];

export function Footer({ variant = "dark" }) {
  const t = useTranslations("footer");
  const isDark = variant === "dark";

  const bg = isDark ? "bg-[#240824]" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-[#240824]";
  const textMuted = isDark ? "text-white/60" : "text-[#240824]/70";
  const borderColor = isDark ? "border-white/[0.12]" : "border-[#240824]/[0.12]";

  return (
    <footer className={cn("relative w-full", bg)}>
      <Curve
        curveColor="#240824"
        cornerColor="#ffffff"
        corner="right"
        className="relative z-0 h-[100px] sm:h-[160px] lg:h-[226px]"
      >
        <Link href="/" aria-label="Go to home" className="w-fit">
          <object
            data="/assets/GM_logotipo_Footer.svg"
            type="image/svg+xml"
            width="921"
            height="142"
            className={cn(
              "h-full w-full transition-[filter] duration-300",
              isDark ? "" : "brightness-0"
            )}
            aria-label="GM Attorneys logo"
          >
            <img src="/assets/GM_logotipo_Footer.svg" alt="GM Attorneys logo" />
          </object>
        </Link>
      </Curve>

      <Section className={cn("relative z-10 -mt-1 pt-8 sm:pt-10 pb-10 sm:pb-16", bg)}>
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-10 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start gap-6 max-w-[766px]">
            <p className={cn("text-sm sm:text-base lg:text-lg font-normal", textMuted)}>
              {t("description")}
            </p>
            <Link
              href="/contact-us"
              className="flex items-center gap-2 rounded bg-[#0aa39f] px-5 py-2.5 text-sm sm:text-base font-medium text-white transition-opacity duration-300 hover:opacity-90 whitespace-nowrap"
            >
              {t("getInTouch")}
            </Link>
          </div>

          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-10 sm:gap-16 lg:gap-[120px]">
            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6">
              <h3 className={cn("font-inter text-xl sm:text-2xl lg:text-[28px] font-bold uppercase", textPrimary)}>
                {t("shopTitle")}
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-3 sm:gap-5">
                {shopLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 whitespace-nowrap",
                      textMuted,
                      isDark ? "hover:text-white" : "hover:text-[#240824]"
                    )}
                  >
                    {t(`shopLinks.${link.key}`)}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6">
              <h3 className={cn("font-inter text-xl sm:text-2xl lg:text-[28px] font-bold uppercase whitespace-nowrap", textPrimary)}>
                {t("talkTitle")}
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-3 sm:gap-5">
                {talkLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 whitespace-nowrap",
                      textMuted,
                      isDark ? "hover:text-white" : "hover:text-[#240824]"
                    )}
                  >
                    {t(link.key)}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className={cn("flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left justify-between gap-3 sm:gap-6 border-t pt-8 mt-12 sm:mt-16 lg:mt-[100px]", borderColor, textPrimary)}>
          <a
            href="https://aurigital.com?utm_source=gm-attorneys-website&utm_medium=footer&utm_campaign=branding"
            target="_blank"
            rel="noopener"
            aria-label="Design & development by Aurigital"
            className="group flex items-center gap-2"
          >
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-widest transition-colors duration-200",
                isDark ? "text-white/40 group-hover:text-white/80" : "text-[#240824]/40 group-hover:text-[#240824]/80"
              )}
            >
              Crafted by
            </span>
            <em
              className={cn(
                "not-italic text-xs font-semibold transition-colors duration-200",
                isDark ? "text-white/60 group-hover:text-white" : "text-[#240824]/60 group-hover:text-[#240824]"
              )}
            >
              Aurigital
            </em>
            <img
              src="/assets/isotipo.avif"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-4 w-4 rounded-full bg-[#240824] p-0.5 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />
          </a>
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/privacy-policy"
              className={cn(
                "text-xs sm:text-sm font-medium underline-offset-2 transition-colors duration-300 hover:underline",
                isDark ? "hover:text-white" : "hover:text-[#240824]"
              )}
            >
              {t("privacyPolicy")}
            </Link>
            <p className="text-xs sm:text-sm font-medium whitespace-nowrap">{t("copyright")}</p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
