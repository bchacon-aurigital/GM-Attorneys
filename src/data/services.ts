export interface Service {
  key: string;
  titleKey: string;
  image: string;
}

export const mainServices: Service[] = [
  { key: "realEstate", titleKey: "realEstate", image: "/assets/services/mservice1.avif" },
  { key: "corporateLaw", titleKey: "corporateLaw", image: "/assets/services/mservice2.avif" },
  { key: "immigration", titleKey: "immigration", image: "/assets/services/mservice3.avif" },
  { key: "familyEstate", titleKey: "familyEstate", image: "/assets/services/mservice4.avif" },
];

export const complementaryServices: Service[] = [
  { key: "taxLaw", titleKey: "taxLaw", image: "/assets/services/cservice1.avif" },
  { key: "notaryPublic", titleKey: "notaryPublic", image: "/assets/services/cservice2.avif" },
  { key: "disputeResolution", titleKey: "disputeResolution", image: "/assets/services/cservice3.avif" },
  { key: "intellectualProperty", titleKey: "intellectualProperty", image: "/assets/services/cservice4.avif" },
  { key: "foreignInvestments", titleKey: "foreignInvestments", image: "/assets/services/cservice5.avif" },
];
