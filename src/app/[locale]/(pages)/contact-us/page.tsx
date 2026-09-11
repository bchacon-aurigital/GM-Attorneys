import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaLocationDot, FaEnvelope, FaPhone, FaClock } from "react-icons/fa6";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { offices } from "@/data/offices";
import { localizedAlternates } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ContactForm } from "@/components/sections/contact/contact-form";

const TITLE = {
  es: "Contáctanos",
  en: "Contact Us",
};

const DESCRIPTION = {
  es: "Ponte en contacto con GM Attorneys. Oficinas en San José, Flamingo, Tamarindo y Nosara. Escríbenos a info@gmattorneyscr.com o llámanos al (+506) 4108-4070.",
  en: "Get in touch with GM Attorneys. Offices in San José, Flamingo, Tamarindo, and Nosara. Email us at info@gmattorneyscr.com or call (+506) 4108-4070.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path, canonical, languages } = localizedAlternates("/contact-us", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    description: isSpanish ? DESCRIPTION.es : DESCRIPTION.en,
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path } = localizedAlternates("/contact-us", locale);
  const t = await getTranslations("contact");

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      <Navbar variant="default" />
      <main className="w-full bg-white">
        <Section className="pt-32 sm:pt-40">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col gap-10 lg:w-2/5">
              <h1 className="text-4xl font-medium leading-tight tracking-tight text-[#240824] sm:text-5xl">
                {t("title")}
              </h1>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-3 border-t border-[#240824]/15 pt-4">
                  <div className="flex items-center gap-2 text-[#240824]/50">
                    <FaLocationDot className="size-3.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{t("offices")}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {offices.map((office) => (
                      <a
                        key={office.id}
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-[#240824] transition-opacity duration-300 hover:opacity-70"
                      >
                        {office.city}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#240824]/15 pt-4">
                  <div className="flex items-center gap-2 text-[#240824]/50">
                    <FaEnvelope className="size-3.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{t("contact")}</p>
                  </div>
                  <a
                    href="mailto:info@gmattorneyscr.com"
                    className="text-sm text-[#240824] transition-opacity duration-300 hover:opacity-70"
                  >
                    info@gmattorneyscr.com
                  </a>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#240824]/15 pt-4">
                  <div className="flex items-center gap-2 text-[#240824]/50">
                    <FaPhone className="size-3.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{t("phoneNumbers")}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {offices.map((office) => (
                      <a
                        key={office.id}
                        href="tel:+50641084070"
                        className="text-sm text-[#240824] transition-opacity duration-300 hover:opacity-70"
                      >
                        (+506) 4108-4070 — {office.city}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#240824]/15 pt-4">
                  <div className="flex items-center gap-2 text-[#240824]/50">
                    <FaClock className="size-3.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{t("openHours")}</p>
                  </div>
                  <p className="text-sm text-[#240824]">{t("openHoursValue")}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
