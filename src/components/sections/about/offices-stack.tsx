import Image from "next/image";
import { useTranslations } from "next-intl";
import { officesHistory } from "@/data/offices-history";
import { Section } from "@/components/ui/section";

export function OfficesStack() {
  const t = useTranslations("officesHistory");

  return (
    <Section className="bg-white">
      <div className="relative mx-auto max-w-6xl">
        {/* Vertical timeline rail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 bottom-4 w-px bg-[#240824]/15 sm:left-6 lg:left-8"
        />

        <ol className="flex flex-col gap-12 sm:gap-16">
          {officesHistory.map((office, index) => (
            <li key={office.id} className="relative pl-12 sm:pl-16 lg:pl-20">
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-[#0aa39f] ring-4 ring-white sm:left-6 lg:left-8"
              />

              <article
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="overflow-hidden rounded-lg border border-[#240824]/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={office.image}
                    alt={office.name}
                    fill
                    sizes="(min-width: 1024px) 72rem, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
                  />
                  <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight tabular-nums text-white">
                    {office.year}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium uppercase tracking-tight text-[#27102b]">
                    {office.name}
                  </h3>

                  <div className="flex flex-col gap-3 text-sm sm:text-base font-medium leading-relaxed text-black/70">
                    <p>{t(`${office.id}.p1`)}</p>
                    <p>{t(`${office.id}.p2`)}</p>
                    <p>{t(`${office.id}.p3`)}</p>
                    <p>{t(`${office.id}.p4`)}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
