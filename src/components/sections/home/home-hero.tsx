import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaArrowUp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { Curve } from "@/components/ui/curve";

const socialLinks = [
  { key: "instagram", href: "https://instagram.com", Icon: FaInstagram },
  { key: "facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { key: "whatsapp", href: "https://wa.me/50641084070", Icon: FaWhatsapp },
];

export function HomeHero() {
  const t = useTranslations("home");

  return (
    <section className="relative w-full h-[90vh] sm:h-[105vh] min-h-[560px] overflow-hidden bg-[#0a2a4a]">
      <Image
        src="/assets/home/hero.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />

      <img
        src="/assets/home/hero-vector.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[91%] w-auto lg:block"
      />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center text-white pb-12 sm:pb-16">
          <p className="font-inter text-5xl sm:text-7xl lg:text-8xl xl:text-[160px] font-medium leading-[0.85] tracking-tight">
            {t("heroTitle")}
          </p>
          <p
            className="max-w-xl text-sm sm:text-base font-semibold tracking-tight"
            style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.25)" }}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[76px] sm:bottom-[126px] lg:bottom-[176px] flex flex-col md:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 rounded bg-white/20 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-white transition-colors duration-300 hover:bg-white/30"
          >
            <span className="whitespace-nowrap">{t("areYouProtected")}</span>
            <FaArrowUp className="shrink-0 rotate-90 text-white" size={12} aria-hidden="true" />
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 sm:gap-3 rounded bg-white px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base font-medium text-black transition-opacity duration-300 hover:opacity-90"
          >
            <span className="whitespace-nowrap">{t("getInTouch")}</span>
            <FaArrowUp className="shrink-0 rotate-90 text-black" size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Curve
        curveColor="#ffffff"
        cornerColor="transparent"
        corner="left"
        className="absolute bottom-0 left-0 h-[60px] sm:h-[110px] lg:h-[160px] translate-y-2"
        contentClassName="items-center pb-4 sm:pb-6"
      >
        <a href="#who-we-are" className="flex items-center gap-2 bg-white py-2.5">
          <span className="text-sm sm:text-base font-semibold uppercase text-black">
            {t("whoWeAre")}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-[#00a6a0]" aria-hidden="true" />
        </a>
      </Curve>
    </section>
  );
}
