import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/sections/home/home-hero";
import { WhoWeAre } from "@/components/sections/home/who-we-are";
import { WhatSetsUsApart } from "@/components/sections/home/what-sets-us-apart";
import { ServicesSlider } from "@/components/sections/home/services-slider";
import { Complements } from "@/components/sections/home/complements";
import { TeamTeaser } from "@/components/sections/home/team-teaser";
import { AboutFaq } from "@/components/sections/about/about-faq";
import { StoreLocator } from "@/components/sections/about/store-locator";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { path, canonical, languages } = localizedAlternates("/", locale);

  return {
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default function Home() {
  return (
    <>
      <Navbar variant="home" />
      <main>
        <HomeHero />
        <WhoWeAre />
        <WhatSetsUsApart />
        <ServicesSlider />
        <Complements />
        <TeamTeaser />
        <StoreLocator variant="dark" />
        <AboutFaq curveCornerColor="#1D0120" />
      </main>
      <Footer variant="dark" />
    </>
  );
}
