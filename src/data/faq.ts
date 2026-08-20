export interface FaqItem {
  slug: string;
  categoryKey: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  "corporateTax",
  "realEstatePurchases",
  "sellingRealEstate",
  "residencyImmigration",
  "banking",
  "rentalProperties",
  "officeLocations",
] as const;

export const faqItems: FaqItem[] = [
  {
    slug: "caf-raf-fees",
    categoryKey: "corporateTax",
    question: "What are the CAF and RAF fees, and how do they differ from Corporate Income Tax?",
    answer:
      "CAF (Corporate Annual Fee) refers to GM Attorneys' annual corporate compliance and administration service, formerly known as the Resident Agent Fee (RAF). This service provides support with ongoing corporate compliance obligations. As part of this service, GM Attorneys assists clients in complying with current legal requirements, including the registration and maintenance of the corporation's official email address for administrative and judicial notifications before the National Registry, pursuant to Law No. 10.597. This email address serves as the official means for receiving legal notifications from government authorities and courts and must remain valid and actively monitored. The CAF also helps clients stay up to date with other corporate compliance matters and regulatory changes that may affect their corporation. GM Attorneys' current CAF is US$339 plus VAT per year. This fee is separate from the Annual Corporate Tax, which is a government tax paid directly to the Costa Rican Tax Administration and varies depending on whether the corporation is active or inactive, with the amount adjusted annually.",
  },
  {
    slug: "pay-taxes-corporate-obligations",
    categoryKey: "corporateTax",
    question: "How can I pay my taxes and corporate obligations in Costa Rica?",
    answer:
      "Corporate obligations can generally be paid through:\nProperty Manager\nSTL Post Closing Services\nCosta Rican online banking platforms.\nYour accountant acting on your behalf.\nGM Attorneys' administrative support services when applicable.",
  },
  {
    slug: "annual-maintenance-costs",
    categoryKey: "corporateTax",
    question: "What annual maintenance costs and government fees apply to my corporation?",
    answer:
      "Typical annual expenses include:\nCAF (Corporate Annual Fee): US$300 + VAT\nBCCR Ownership Declaration (RTBF): US$200 + VAT\nCorporate Tax: Approximately US$120 to US$380, depending on the corporation's status and annual adjustments\nD-101 or D-195 tax filings: Accounting fees vary by professional, with an estimated reference cost of US$200",
  },
  {
    slug: "rtbf-compliance",
    categoryKey: "corporateTax",
    question: "What is the RTBF (Registro de Transparencia y Beneficiarios Finales), and how can I ensure my corporation remains compliant?",
    answer:
      "The RTBF is the mandatory beneficial ownership declaration filed with the Central Bank of Costa Rica (BCCR).\nEvery corporation must disclose:\nShareholders.\nPercentage ownership.\nUltimate beneficial owners.\nThe filing must be submitted annually during April and must also be updated whenever ownership changes involving 15% or more of the corporation's shares occur. Failure to comply may result in penalties and restrictions.",
  },
  {
    slug: "need-an-accountant",
    categoryKey: "corporateTax",
    question: "Do I need an accountant if my corporation is active, and what services would they provide?",
    answer:
      "Yes. Active corporations are generally required to maintain accounting records and file tax returns. Even inactive corporations must comply with certain filing obligations, including information returns.\n\nAn accountant can assist with:\nIncome tax returns.\nFilings for inactive corporations.\nTax registrations and updates.\nCorporate compliance matters.",
  },
  {
    slug: "no-costa-rican-bank-account",
    categoryKey: "corporateTax",
    question: "If I do not have a Costa Rican bank account, how can I pay my taxes and other corporate obligations?",
    answer:
      "Corporate obligations can generally be paid through:\nProperty Manager.\nSTLA Post Closing Services.\nYour accountant acting on your behalf.\nGM Attorneys' administrative support services when applicable.",
  },
  {
    slug: "closing-costs-purchasing",
    categoryKey: "realEstatePurchases",
    question: "What legal fees, taxes, and closing costs should I expect when purchasing property in Costa Rica?",
    answer:
      "Closing costs are generally estimated at approximately 4% of the purchase price or registered value, whichever is greater.\nThese costs may include:\nNotary fees.\nVAT.\nTransfer tax.\nRegistration stamps.\nRegistration duties.\nEscrow fees.\nAdditional costs may include corporate setup fees, inspections, surveys, powers of attorney, utility transfers, and post-closing compliance filings.",
  },
  {
    slug: "escrow-account-advantages",
    categoryKey: "realEstatePurchases",
    question: "What are the advantages of using an escrow account during a real estate transaction?",
    answer:
      "An escrow account provides security for both buyer and seller by ensuring that funds are held by an independent third party until all contractual conditions have been satisfied.\nKey benefits include:\nProtection against fraud.\nTransparent handling of funds.\nReduced transaction risk.\nProper coordination of closing requirements.\nEscrow services are commonly used in Costa Rican real estate transactions involving foreign buyers.",
  },
  {
    slug: "condominium-owner-obligations",
    categoryKey: "realEstatePurchases",
    question: "If I purchase a condominium, what legal and financial obligations will I have as an owner?",
    answer:
      "Condominium owners are generally responsible for:\nMonthly HOA or condominium fees.\nProperty taxes.\nGarbage collection fees.\nCompliance with condominium regulations and bylaws.\nMaintenance assessments approved by the condominium association.\nThe specific obligations vary from one condominium project to another.",
  },
  {
    slug: "personal-vs-corporate-ownership",
    categoryKey: "realEstatePurchases",
    question: "What are the advantages and disadvantages of purchasing property in my personal name versus through a corporation?",
    answer:
      "Personal Ownership\nAdvantages\nSimpler ownership structure.\nNo annual corporate compliance obligations.\nReduced administrative costs.\nDisadvantages\nLess flexibility for future transfers or estate planning.\n\nCorporate Ownership\nAdvantages\nEasier transfer of ownership through share transfers.\nPotential estate planning benefits.\nMay facilitate business or investment activities.\nDisadvantages\nAnnual corporate taxes.\nRTBF filings.\nAccounting and compliance obligations.\nCorporate requirements.",
  },
  {
    slug: "selling-property-taxes",
    categoryKey: "sellingRealEstate",
    question: "What taxes, fees, and expenses am I responsible for when selling my property?",
    answer:
      "Most real estate sales are subject to Capital Gains Tax.\nGenerally:\nThe tax rate is 15% on the capital gain (profit).\nCertain properties owned before July 1, 2019 may qualify for a one-time alternative calculation of 2.25% of the gross sale price.\nPrimary residences may qualify for exemption.\nNon-domiciled foreign sellers may be subject to a 2.5% withholding by the buyer.",
  },
  {
    slug: "residency-requirements",
    categoryKey: "residencyImmigration",
    question: "What are the requirements and process for obtaining Costa Rican residency?",
    answer:
      "Common temporary residency categories include:\n\nInvestor Residency\nInvestment of at least US$150,000 in Costa Rica, including real estate or qualifying corporate investments.\n\nPensionado Residency\nLifetime pension income of at least US$1,000 per month.\n\nRentista Residency\nGuaranteed income of at least US$2,500 per month for a minimum of two years.\n\nApplicants must also provide:\nBirth certificate.\nPolice clearance.\nMarriage certificate (if applicable).\nApostilles on foreign documents.\nFBI background documentation for U.S. applicants.\n\nDocuments generally must be issued within six months before filing.",
  },
  {
    slug: "open-bank-account",
    categoryKey: "banking",
    question: "Can I open a bank account in Costa Rica as a foreigner or through my corporation?",
    answer:
      "Yes. Foreign individuals and Costa Rican corporations can usually open bank accounts, subject to the bank's compliance and due diligence requirements.\n\nRequirements commonly include:\nPassport or identification.\nProof of address.\nSource of funds documentation.\nCorporate documents if the account is being opened by a corporation.\n\nRequirements vary by bank and are subject to regulatory compliance review.",
  },
  {
    slug: "rental-property-requirements",
    categoryKey: "rentalProperties",
    question: "What legal, tax, and regulatory requirements must I meet to rent out my property in Costa Rica?",
    answer:
      "Depending on the type of rental activity, owners may be required to:\nRegister for tax purposes.\nReport rental income.\nCollect and remit applicable taxes when required.\nObtain municipal permits where applicable.\nComply with condominium and zoning regulations.\nOwners operating through a corporation must also maintain all corporate compliance requirements.",
  },
  {
    slug: "closest-office-location",
    categoryKey: "officeLocations",
    question: "Which office location is closest to me, and how can I contact it?",
    answer:
      "GM Attorneys currently has offices in:\nSan José (Los Yoses)\nFlamingo, Guanacaste\nTamarindo, Guanacaste\nNosara, Guanacaste\n\nFor assistance determining the most convenient office, contact info@gmattorneyscr.com or call (+506) 4108-4070.",
  },
];
