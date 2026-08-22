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
        src="/assets/home/low-angle-shot-tall-palm-tree-gleaming-blue-sky 2.webp"
        alt=""
        className="pointer-events-none absolute -left-[3%] top-[16%] hidden w-[56%] -rotate-[8deg] lg:block"
      />

      <p className="font-inter relative max-w-4xl text-2xl sm:text-3xl lg:absolute lg:left-[1.7%] lg:top-[6%] lg:max-w-none lg:w-[96.7%] lg:text-5xl font-medium uppercase tracking-tight leading-tight text-black indent-[38%] sm:indent-[45%] lg:indent-[52%]">
        {t("whoWeAreTitle")}
      </p>

      <p className="relative mt-16 max-w-sm text-sm sm:mt-24 sm:text-base lg:absolute lg:right-[3.3%] lg:top-[62%] lg:mt-0 lg:max-w-[18.5%] font-medium text-black/70 tracking-tight">
        {t("whoWeAreText")}
      </p>

      <div className="h-16 sm:h-24 lg:hidden" aria-hidden="true" />
    </section>
  );
}
