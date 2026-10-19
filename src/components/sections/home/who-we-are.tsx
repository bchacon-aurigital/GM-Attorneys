import { useTranslations } from "next-intl";

export function WhoWeAre() {
  const t = useTranslations("home");

  return (
    <section
      id="who-we-are"
      className="relative w-full overflow-hidden bg-white px-4 pt-16 sm:px-6 sm:pt-20 lg:aspect-[1920/1618] lg:px-10 lg:pt-[6vw]"
    >
      <img
        src="/assets/home/who-we-are-vector.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] bottom-[-65%] z-0 hidden h-[75%] w-auto -translate-y-1/2 rotate-90 lg:block"
      />

      <img
        src="/assets/home/mermaid.avif"
        alt={t("mermaidCaption")}
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
        className="pointer-events-none absolute left-0 bottom-0 hidden w-[72%] lg:block"
      />

      <figcaption
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
        className="absolute left-[34%] bottom-[22%] hidden max-w-[26%] rounded-md bg-black/55 px-5 py-4 backdrop-blur-sm lg:block"
      >
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          {t("mermaidCaption")}
        </span>
        <span className="mt-2 block h-px w-10 bg-white/40" aria-hidden="true" />
        <span className="mt-2.5 block text-xs leading-relaxed text-white/90 italic">
          {t("mermaidStory")}
        </span>
      </figcaption>

      <h2 className="font-arial relative max-w-4xl text-2xl sm:text-3xl lg:absolute lg:left-[1.7%] lg:top-[6%] lg:max-w-none lg:w-[96.7%] lg:text-5xl font-medium uppercase tracking-tight leading-tight text-black indent-[38%] sm:indent-[45%] lg:indent-[52%]">
        {t("whoWeAreTitle")}
      </h2>

      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="relative mt-16 max-w-md text-sm sm:mt-24 sm:text-base lg:absolute lg:right-[3.3%] lg:top-[52%] lg:mt-0 lg:max-w-[22%] font-medium text-black/70 tracking-tight"
      >
        {t("whoWeAreText")}
      </p>

      <div className="h-16 sm:h-24 lg:hidden" aria-hidden="true" />
    </section>
  );
}
