"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaArrowUp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { Curve } from "@/components/ui/curve";
import { useLenis } from "lenis/react";
import { useLoading } from "@/app/[locale]/context/LoadingContext";

const socialLinks = [
  { key: "instagram", href: "https://www.instagram.com/gm_attorneys/", Icon: FaInstagram },
  { key: "facebook", href: "https://www.facebook.com/gmattorneyscr?fref=ts", Icon: FaFacebookF },
  { key: "whatsapp", href: "https://wa.me/50626532155", Icon: FaWhatsapp },
];

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function anim(name: string, duration: string, delay: string): React.CSSProperties {
  return { animation: `${name} ${duration} ${ease} ${delay} both` };
}

export function HomeHero() {
  const t = useTranslations("home");
  const pictureRef = useRef<HTMLElement>(null);
  const { isReady } = useLoading();

  useLenis(({ scroll }) => {
    if (pictureRef.current) {
      pictureRef.current.style.transform = `translateY(${-scroll * 0.15}px)`;
    }
  });

  return (
    <section className="relative w-full h-[calc(100vh+60px)] sm:h-[calc(100vh+110px)] lg:h-[calc(100vh+160px)] min-h-[560px] overflow-hidden bg-[#0a2a4a]">
      <picture
        ref={pictureRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -50, height: "122%", ...(isReady ? anim("heroFadeIn", "1.2s", "0s") : { opacity: 0 }) }}
      >
        <source media="(min-width: 640px)" srcSet="/assets/home/hero.avif" type="image/avif" />
        <img
          src="/assets/home/hero-mob.avif"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>

      <img
        src="/assets/home/hero-vector.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 block h-[91%] w-auto"
        style={isReady ? anim("heroFadeIn", "1s", "0.2s") : { opacity: 0 }}
      />

      {/* Content */}
      <div className="absolute top-0 inset-x-0 h-screen flex items-start justify-center px-4 sm:px-6 lg:px-10 pt-[18vh]">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center text-white">
          <h1
            className="font-manrope text-4xl sm:text-6xl lg:text-7xl xl:text-[120px] font-medium leading-[0.9] xl:leading-[118px] tracking-tight text-white/75"
            style={isReady ? anim("heroFadeUp", "1s", "0.1s") : { opacity: 0 }}
          >
            {(() => {
              const title = t("heroTitle");
              const idx = title.indexOf(",");
              if (idx < 0) return title;
              return (
                <>
                  <span className="block">{title.slice(0, idx + 1)}</span>
                  <span className="block">{title.slice(idx + 1).trim()}</span>
                </>
              );
            })()}
          </h1>
          <p
            className="max-w-[576px] text-sm sm:text-base font-semibold tracking-tight"
            style={{
              textShadow: "0px 0px 10px rgba(0,0,0,0.25)",
              ...(isReady ? anim("heroFadeUp", "1s", "0.25s") : { opacity: 0 }),
            }}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Social icons */}
      <div
        className="absolute left-4 sm:left-6 lg:left-10 bottom-[84px] sm:bottom-[134px] lg:bottom-[184px] flex items-center gap-2"
        style={isReady ? anim("heroFadeIn", "0.8s", "0.5s") : { opacity: 0 }}
      >
        {socialLinks.map(({ key, href, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="flex size-9 sm:size-[46px] items-center justify-center rounded bg-white/[0.12] p-2 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <Icon className="size-full" />
          </a>
        ))}
      </div>

      {/* CTA buttons */}
      <div
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-10 z-50 flex items-center gap-2 sm:gap-3"
        style={isReady ? anim("heroFadeUp", "0.8s", "0.35s") : { opacity: 0 }}
      >
        <Link
          href="/newslettersubs"
          className="flex items-center gap-2 sm:gap-3 rounded bg-black/35 backdrop-blur-md border border-white/40 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-white transition-colors duration-300 hover:bg-black/50"
        >
          <span className="whitespace-nowrap">{t("areYouProtected")}</span>
          <FaArrowUp className="shrink-0 rotate-90 text-white" size={12} aria-hidden="true" />
        </Link>
        <Link
          href="/contact-us"
          className="flex items-center gap-2 sm:gap-3 rounded bg-white px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-black shadow-sm transition-opacity duration-300 hover:opacity-90"
        >
          <span className="whitespace-nowrap">{t("getInTouch")}</span>
          <FaArrowUp className="shrink-0 rotate-90 text-black" size={12} aria-hidden="true" />
        </Link>
      </div>

      <div style={isReady ? anim("heroFadeIn", "0.8s", "0.6s") : { opacity: 0 }}>
        <Curve
          curveColor="#ffffff"
          cornerColor="transparent"
          corner="left"
          className="absolute bottom-0 left-0 h-[60px] sm:h-[110px] lg:h-[160px]"
          contentClassName="items-center pb-4 sm:pb-6"
        >
          <a href="#who-we-are" className="flex items-center gap-2 bg-white py-2.5">
            <span className="text-sm sm:text-base font-semibold uppercase text-black">
              {t("whoWeAre")}
            </span>
            <span className="size-1.5 shrink-0 rounded-full bg-[#00a6a0]" aria-hidden="true" />
          </a>
        </Curve>
      </div>
    </section>
  );
}
