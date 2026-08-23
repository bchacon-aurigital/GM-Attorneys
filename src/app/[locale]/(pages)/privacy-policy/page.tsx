import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";

const paragraphs = [
  "GM ATTORNEYS sponsors this website for general information about the firm only and is not intended to constitute advertising, solicitation or legal advice. This website should not be relied upon or used without consulting a lawyer to consider your specific circumstances, possible changes to applicable laws, rules and regulations and other legal issues. The information and materials contained in this website may not reflect the most current legal developments, nor are guaranteed to be complete, correct, or up-to-date. The use of this website does not establish an attorney-client relationship, nor is it intended to do so.",
  'We are very proud of the results we obtain for our clients, but you should know that past results afford no guarantee of future results; that every case is different and must be judged on its own merits; and that the choice of a lawyer is an important decision and should not be based solely on advertisements. If you want us to represent you, please contact one of our attorneys directly or click on the "Contact Us" page and complete the form provided to send us an electronic message to determine whether such representation would be appropriate. We would be pleased to consider having an attorney represent you. If you are interested in having one of our attorneys represent you, we will provide you with additional information about our capabilities and terms of engagement. Please do not send us any proprietary or confidential information without first receiving authorization to send us the information.',
  "If you communicate with us through this website, by e-mail or otherwise concerning a legal matter for which we do not already represent you, your communication may not be treated as privileged or confidential. We may have prior client relationships or other potential conflicts that would prevent us from representing your or from treating your communications as confidential.",
  "GM ATTORNEYS collects certain personal information through this website.",
  'In general, you are not required to provide any personal information in order to consult our website. However, you may elect to contact us by completing the form provided on the "Contact Us" page of this website, in which case we ask you to provide your name and last name, telephone and mobile numbers, e-mail address, among others. We will use your information only to contact you and provide you with the information that you have requested. Please note that in order to process your query, we may be required to share your information within the offices of GM ATTORNEYS, but we will not share your personal information with any third party, except as required to do so by Law.',
  "By submitting your e-mail address to GM ATTORNEYS, you opt-in to receiving e-mail from us about events, publications and services provided by the firm that may be of interest to you. At any given time, you may opt-out of receiving further e-mail by contacting us.",
  "This website contains links to other websites. GM ATTORNEYS is not responsible for the privacy practices or the content of such websites.",
  'GM ATTORNEYS\'s website uses "cookies" in order to provide you a better service when you return to our website. The cookies used in our website let us know the date and time of the last time you visited our website, the content viewed and certain security setting that control access to restricted/secured areas within this website. You can set your browser to notify you when you receive a "cookie", giving you the opportunity to decide whether or not to accept it.',
  "You may at all times request a copy of your personal information and have it corrected or updated from our files. Inquiries and requests should be sent to one of our offices directly or by e-mail to info@gmattorneyscr.com",
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar variant="default" />
      <main>
        <Section className="pt-32 sm:pt-40">
          <div className="flex flex-col gap-10 sm:gap-14">
            <div className="flex flex-col gap-4 border-b border-[#240824]/20 pb-8 sm:gap-6 sm:pb-10">
              <p className="text-xs font-semibold uppercase tracking-tight text-[#240824]/40 sm:text-sm">
                Legal
              </p>
              <p className="text-4xl font-medium uppercase tracking-tight text-[#240824] sm:text-5xl lg:text-6xl">
                Legal Disclaimer &amp; Privacy Statement
              </p>
            </div>

            <div className="flex max-w-3xl flex-col gap-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm font-medium leading-relaxed text-[#240824]/70 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
