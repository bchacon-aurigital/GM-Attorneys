import { getTranslations } from "next-intl/server";
import { FaLocationDot, FaEnvelope, FaPhone, FaClock } from "react-icons/fa6";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { offices } from "@/data/offices";
import { mainServices, complementaryServices } from "@/data/services";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tServices = await getTranslations("services");
  const allServices = [...mainServices, ...complementaryServices];

  return (
    <>
      <Navbar variant="default" />
      <main className="w-full bg-white">
        <Section className="pt-32 sm:pt-40">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col gap-10 lg:w-2/5">
              <p className="text-4xl font-medium leading-tight tracking-tight text-[#240824] sm:text-5xl">
                {t("title")}
              </p>

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
              <form className="flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-[#240824]">
                      {t("form.name")} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t("form.namePlaceholder")}
                      className="rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-phone" className="text-sm font-semibold text-[#240824]">
                      {t("form.phone")} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder={t("form.phonePlaceholder")}
                      className="rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-[#240824]">
                      {t("form.email")} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      className="rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-service" className="text-sm font-semibold text-[#240824]">
                      {t("form.service")} *
                    </label>
                    <select
                      id="contact-service"
                      defaultValue=""
                      className="rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] focus:border-[#240824]/40 focus:outline-none"
                    >
                      <option value="" disabled>
                        —
                      </option>
                      {allServices.map((service) => (
                        <option key={service.key} value={service.key}>
                          {tServices(`list.${service.titleKey}.title`).replace(/\n/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-subject" className="text-sm font-semibold text-[#240824]">
                    {t("form.subject")}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder={t("form.subjectPlaceholder")}
                    className="rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-details" className="text-sm font-semibold text-[#240824]">
                    {t("form.details")} *
                  </label>
                  <textarea
                    id="contact-details"
                    rows={6}
                    className="resize-none rounded border border-[#240824]/15 bg-white px-4 py-3 text-sm text-[#240824] placeholder:text-[#240824]/35 focus:border-[#240824]/40 focus:outline-none"
                  />
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-3 rounded border border-[#240824]/15 px-4 py-3 text-sm text-[#240824]">
                  <input type="checkbox" className="size-4 accent-[#240824]" />
                  {t("form.captcha")}
                </label>

                <button
                  type="submit"
                  disabled
                  className="rounded bg-[#240824] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {t("form.submit")}
                </button>
              </form>
            </div>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
