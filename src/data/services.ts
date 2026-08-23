export interface Service {
  key: string;
  titleKey: string;
}

export const mainServices: Service[] = [
  { key: "realEstate", titleKey: "realEstate" },
  { key: "corporateLaw", titleKey: "corporateLaw" },
  { key: "immigration", titleKey: "immigration" },
];

export const complementaryServices: Service[] = [
  { key: "taxLaw", titleKey: "taxLaw" },
  { key: "familyEstate", titleKey: "familyEstate" },
  { key: "notaryPublic", titleKey: "notaryPublic" },
  { key: "disputeResolution", titleKey: "disputeResolution" },
  { key: "intellectualProperty", titleKey: "intellectualProperty" },
  { key: "foreignInvestments", titleKey: "foreignInvestments" },
];
