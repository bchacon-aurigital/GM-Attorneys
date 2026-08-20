import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutImpact } from "@/components/sections/about/about-impact";
import { AboutFaq } from "@/components/sections/about/about-faq";
import { StoreLocator } from "@/components/sections/about/store-locator";
import { OfficesStack } from "@/components/sections/about/offices-stack";

export default function AboutPage() {
  return (
    <>
      <Navbar variant="default" />
      <main>
        <AboutHero />
        <AboutValues />
        <AboutImpact />
        <OfficesStack />
        <StoreLocator variant="light" />
        <AboutFaq curveCornerColor="#ffffff" />
      </main>
      <Footer variant="dark" />
    </>
  );
}
