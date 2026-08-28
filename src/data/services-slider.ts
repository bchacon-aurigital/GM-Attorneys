export interface ServiceSlide {
  key: "realEstate" | "corporateLaw" | "immigration" | "familyEstate";
  backgroundImage: string;
  foregroundImage: string;
}

export const servicesSlides: ServiceSlide[] = [
  {
    key: "realEstate",
    backgroundImage: "/assets/home/B-Image1.avif",
    foregroundImage: "/assets/home/F-Image1.webp",
  },
  {
    key: "corporateLaw",
    backgroundImage: "/assets/home/B-Image2.avif",
    foregroundImage: "/assets/home/F-Image2.webp",
  },
  {
    key: "immigration",
    backgroundImage: "/assets/home/B-Image3.avif",
    foregroundImage: "/assets/home/F-Image3.webp",
  },
  {
    key: "familyEstate",
    backgroundImage: "/assets/home/B-Image4.avif",
    foregroundImage: "/assets/home/F-Image4.webp",
  },
];
