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

const paragraphsEs: (string | { heading: string })[] = [
  "GM ATTORNEYS patrocina este sitio web únicamente para brindar información general sobre la firma y no pretende constituir publicidad, solicitud de servicios ni asesoría legal. No debe confiar en este sitio web ni utilizarlo sin consultar a un abogado que considere sus circunstancias específicas, posibles cambios en las leyes, reglas y regulaciones aplicables y otros asuntos legales. La información y los materiales contenidos en este sitio web pueden no reflejar los desarrollos legales más recientes, ni se garantiza que sean completos, correctos o actualizados. El uso de este sitio web no establece una relación abogado-cliente, ni tiene la intención de hacerlo.",
  'Estamos muy orgullosos de los resultados que obtenemos para nuestros clientes, pero debe saber que los resultados pasados no garantizan resultados futuros; que cada caso es diferente y debe juzgarse según sus propios méritos; y que la elección de un abogado es una decisión importante que no debe basarse únicamente en publicidad. Si desea que lo representemos, por favor contacte directamente a uno de nuestros abogados o haga clic en la página "Contáctenos" y complete el formulario para enviarnos un mensaje electrónico y determinar si dicha representación sería apropiada. Con gusto consideraremos que un abogado lo represente. Si está interesado en que uno de nuestros abogados lo represente, le brindaremos información adicional sobre nuestras capacidades y términos de contratación. Por favor no nos envíe información privada o confidencial sin antes recibir autorización para hacerlo.',
  "Si se comunica con nosotros a través de este sitio web, por correo electrónico o de otra forma respecto a un asunto legal en el cual aún no lo representamos, su comunicación podría no ser tratada como privilegiada o confidencial. Es posible que tengamos relaciones previas con clientes u otros posibles conflictos que nos impidan representarlo o tratar sus comunicaciones como confidenciales.",
  "GM ATTORNEYS recopila cierta información personal a través de este sitio web y la trata de conformidad con la Ley costarricense N.º 8968, Protección de la Persona frente al Tratamiento de sus Datos Personales, y su reglamento.",
  "En general, no se le exige proporcionar información personal para consultar nuestro sitio web. Adicionalmente, cierta información técnica puede recopilarse automáticamente mediante cookies o tecnologías similares, según se describe más adelante.",
  'Sin embargo, usted puede optar por contactarnos completando el formulario de la página "Contáctenos" de este sitio web, en cuyo caso le solicitamos su nombre y apellidos, números de teléfono y móvil, y correo electrónico, entre otros. También se puede recopilar información personal cuando se suscribe a nuestro boletín o solicita publicaciones u otros materiales a través de este sitio web.',
  "Utilizaremos su información para responder a sus consultas, proporcionarle la información o los materiales solicitados, gestionar las comunicaciones relacionadas con sus solicitudes y, cuando corresponda, administrar las suscripciones a nuestras publicaciones y boletines.",
  "El suministro de información personal es voluntario. No obstante, cierta información puede ser necesaria para tramitar y responder su solicitud. Cuando lo exija la ley aplicable, el consentimiento se obtendrá de acuerdo con los requisitos legales correspondientes.",
  "Tenga presente que, para tramitar su consulta, es posible que debamos compartir su información dentro de las oficinas de GM ATTORNEYS, o con proveedores de servicios externos que participen en el procesamiento de su solicitud o en la operación del sitio web, sujeto a los requisitos legales aplicables. La información personal también podrá divulgarse cuando la ley lo autorice o lo exija.",
  "GM ATTORNEYS puede enviarle correos electrónicos sobre eventos, publicaciones y servicios de la firma que puedan ser de su interés, sujeto a su consentimiento previo cuando la ley aplicable lo requiera. En cualquier momento, puede dejar de recibir comunicaciones promocionales contactándonos.",
  "Este sitio web contiene enlaces a otros sitios web. GM ATTORNEYS no es responsable de las prácticas de privacidad ni del contenido de dichos sitios web.",
  'El sitio web de GM ATTORNEYS utiliza "cookies" para brindarle un mejor servicio cuando regrese a nuestro sitio. Las cookies utilizadas en nuestro sitio web nos permiten conocer la fecha y hora de su última visita, el contenido visto y ciertos parámetros de seguridad que controlan el acceso a áreas restringidas o protegidas dentro de este sitio web. Podrán utilizarse cookies adicionales u otras tecnologías similares según las funcionalidades del sitio web. Cuando corresponda, se proporcionará información sobre sus finalidades y los mecanismos de consentimiento o preferencias disponibles, de acuerdo con la ley aplicable. Puede configurar su navegador para que le notifique cuando reciba una "cookie", dándole la oportunidad de decidir si la acepta o no.',
  "La información personal recopilada a través de este sitio web está sujeta a los requisitos de seguridad y confidencialidad establecidos por la legislación costarricense aplicable. Dicha información podrá conservarse para los fines para los cuales fue recopilada y durante cualquier período adicional que la ley exija o permita.",
  "Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, actualización o supresión de sus datos personales, sujeto a los requisitos y excepciones legales aplicables. Dichas solicitudes se atenderán de acuerdo con los procedimientos y plazos establecidos por la ley aplicable. Las consultas y solicitudes deben enviarse directamente a una de nuestras oficinas o por correo electrónico a info@gmattorneyscr.com",
  { heading: "Contratación de Servicios Profesionales" },
  "Finalmente, esta Declaración de Privacidad aplica a los datos personales recopilados y tratados a través de este sitio web. Una vez que se haya establecido formalmente una relación abogado-cliente, el manejo de la información personal estará sujeto a los términos de contratación aplicables, las obligaciones de confidencialidad profesional, la legislación de protección de datos y las políticas y procedimientos internos de la firma.",
  "Para efectos de evaluar, establecer y mantener una relación profesional, GM ATTORNEYS puede recopilar, tratar y conservar información personal y documentación de respaldo según sea necesario para prestar servicios legales, verificar la identidad del cliente, realizar procedimientos de conocimiento del cliente (KYC) y debida diligencia, evaluar posibles conflictos de interés y cumplir con las obligaciones legales, regulatorias y profesionales aplicables, incluidos los requisitos de prevención del lavado de dinero, cuando corresponda. Dicha información podrá conservarse durante el tiempo necesario para la prestación de los servicios, el cumplimiento de las obligaciones aplicables y la protección de los intereses legítimos de la firma, sujeto a la ley aplicable.",
];

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path } = localizedAlternates("/privacy-policy", locale);
  const content = isSpanish ? paragraphsEs : paragraphs;

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
                {isSpanish ? "Aviso Legal y Declaración de Privacidad" : "Legal Disclaimer & Privacy Statement"}
              </h1>
            </div>

            <div className="flex max-w-3xl flex-col gap-6">
              {content.map((paragraph, index) =>
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
