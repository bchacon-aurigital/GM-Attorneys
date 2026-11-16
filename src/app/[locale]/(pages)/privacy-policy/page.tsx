import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { localizedAlternates, buildOpenGraph } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const TITLE = {
  es: "Política de Privacidad",
  en: "Privacy Policy",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path, canonical, languages } = localizedAlternates("/privacy-policy", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    alternates: { canonical, languages },
    openGraph: buildOpenGraph(path, locale),
    robots: { index: false, follow: true },
  };
}

const paragraphs: (string | { heading: string })[] = [
  "GM ATTORNEYS sponsors this website for general information about the firm only and is not intended to constitute advertising, solicitation or legal advice. This website should not be relied upon or used without consulting a lawyer to consider your specific circumstances, possible changes to applicable laws, rules and regulations and other legal issues. The information and materials contained in this website may not reflect the most current legal developments, nor are guaranteed to be complete, correct, or up-to-date. The use of this website does not establish an attorney-client relationship, nor is it intended to do so.",
  "We are very proud of the results we obtain for our clients, but you should know that past results afford no guarantee of future results; that every case is different and must be judged on its own merits; and that the choice of a lawyer is an important decision and should not be based solely on advertisements. If you want us to represent you, please contact one of our attorneys directly or click on the \"Contact Us\" page and complete the form provided to send us an electronic message to determine whether such representation would be appropriate. We would be pleased to consider having an attorney represent you. If you are interested in having one of our attorneys represent you, we will provide you with additional information about our capabilities and terms of engagement. Please do not send us any proprietary or confidential information without first receiving authorization to send us the information.",
  "If you communicate with us through this website, by e-mail or otherwise concerning a legal matter for which we do not already represent you, your communication may not be treated as privileged or confidential. We may have prior client relationships or other potential conflicts that would prevent us from representing your or from treating your communications as confidential.",
  "GM ATTORNEYS collects certain personal information through this website and processes such information in accordance with Costa Rican Law No. 8968, Protection of Individuals with regard to the Processing of their Personal Data, and its implementing regulations.",
  "In general, you are not required to provide any personal information in order to consult our website. Additionally, certain technical information may be collected automatically through cookies or similar technologies, as described below.",
  "However, you may elect to contact us by completing the form provided on the \"Contact Us\" page of this website, in which case we ask you to provide your name and last name, telephone and mobile numbers, e-mail address, among others. Personal information may also be collected when you subscribe to our newsletter or request publications or other materials through this website.",
  "We will use your information to respond to your inquiries, provide the information or materials requested, manage communications related to your requests and, where applicable, administer subscriptions to our publications and newsletters.",
  "The provision of personal information is voluntary. However, certain information may be necessary to process and respond to your request. Where required by applicable law, consent will be obtained in accordance with the applicable legal requirements.",
  "Please note that in order to process your query, we may be required to share your information within the offices of GM ATTORNEYS, or with third-party service providers involved in processing your request or operating the website, subject to applicable legal requirements. Personal information may also be disclosed where authorized or required by law.",
  "GM ATTORNEYS may send you e-mails about events, publications and services provided by the firm that may be of interest to you, subject to your prior consent, where required by applicable law. At any time, you may opt out of receiving further promotional communications by contacting us.",
  "This website contains links to other websites. GM ATTORNEYS is not responsible for the privacy practices or the content of such websites.",
  "GM ATTORNEYS's website uses \"cookies\" in order to provide you a better service when you return to our website. The cookies used in our website let us know the date and time of the last time you visited our website, the content viewed and certain security settings that control access to restricted/secured areas within this website. Additional cookies or similar technologies may be used depending on the website's functionalities. Where applicable, information concerning their purposes and the available consent or preference mechanisms will be provided in accordance with applicable law. You can set your browser to notify you when you receive a \"cookie\", giving you the opportunity to decide whether or not to accept it.",
  "Personal information collected through this website is subject to the security and confidentiality requirements established by applicable Costa Rican legislation. Such information may be retained for the purposes for which it was collected and for any additional period required or permitted by law.",
  "You may exercise your rights to access, rectify, update or request the deletion of your personal data, subject to applicable legal requirements and exceptions. Such requests will be addressed in accordance with the procedures and time limits established by applicable law. Inquiries and requests should be sent to one of our offices directly or by e-mail to info@gmattorneyscr.com",
  { heading: "Professional Engagements" },
  "Finally, this Privacy Statement applies to personal data collected and processed through this website. Once an attorney-client relationship has been formally established, the handling of personal information shall be subject to the applicable terms of engagement, professional confidentiality obligations, data protection legislation, and the firm's internal policies and procedures.",
  "For the purposes of evaluating, establishing and maintaining a professional relationship, GM ATTORNEYS may collect, process and retain personal information and supporting documentation as necessary to provide legal services, verify client identity, conduct know-your-customer (KYC) and due diligence procedures, assess potential conflicts of interest, and comply with applicable legal, regulatory and professional obligations, including anti-money laundering requirements, where applicable. Such information may be retained for as long as necessary for the provision of services, compliance with applicable obligations and the protection of the firm's legitimate interests, subject to applicable law.",
];

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path } = localizedAlternates("/privacy-policy", locale);

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      <Navbar variant="default" />
      <main>
        <Section className="pt-32 sm:pt-40">
          <div className="flex flex-col gap-10 sm:gap-14">
            <div className="flex flex-col gap-4 border-b border-[#240824]/20 pb-8 sm:gap-6 sm:pb-10">
              <p className="text-xs font-semibold uppercase tracking-tight text-[#240824]/40 sm:text-sm">
                Legal
              </p>
              <h1 className="text-4xl font-medium uppercase tracking-tight text-[#240824] sm:text-5xl lg:text-6xl">
                Legal Disclaimer &amp; Privacy Statement
              </h1>
            </div>

            <div className="flex max-w-3xl flex-col gap-6">
              {paragraphs.map((paragraph, index) =>
                typeof paragraph === "string" ? (
                  <p key={index} className="text-sm font-medium leading-relaxed text-[#240824]/70 sm:text-base">
                    {paragraph}
                  </p>
                ) : (
                  <h2 key={index} className="pt-4 text-xl font-medium uppercase tracking-tight text-[#240824] sm:text-2xl">
                    {paragraph.heading}
                  </h2>
                ),
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
