interface LocalizedText {
  es: string;
  en: string;
}

export interface FaqItem {
  slug: string;
  categoryKey: string;
  question: LocalizedText;
  answer: LocalizedText;
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
    question: {
      en: "What are the CAF and RAF fees, and how do they differ from Corporate Income Tax?",
      es: "¿Qué son las tarifas CAF y RAF, y en qué se diferencian del Impuesto sobre la Renta Corporativa?",
    },
    answer: {
      en: "CAF (Corporate Annual Fee) refers to GM Attorneys' annual corporate compliance and administration service, formerly known as the Resident Agent Fee (RAF). This service provides support with ongoing corporate compliance obligations. As part of this service, GM Attorneys assists clients in complying with current legal requirements, including the registration and maintenance of the corporation's official email address for administrative and judicial notifications before the National Registry, pursuant to Law No. 10.597. This email address serves as the official means for receiving legal notifications from government authorities and courts and must remain valid and actively monitored.\nIn addition, GM Attorneys serves as the legal domicile of the CR LLC, where the company's legal and books are maintained and held in custody, ensuring compliance with applicable corporate record-keeping requirements and facilitating the proper administration of company matters.\nThis fee is separate from the Annual Corporate Tax, which is a government tax paid directly to the Costa Rican Tax Administration and varies depending on whether the company is active or inactive, with the amount adjusted annually.",
      es: "El CAF (Cuota Anual Corporativa) es el servicio anual de cumplimiento y administración corporativa de GM Attorneys, antes conocido como la Cuota de Agente Residente (RAF). Este servicio brinda apoyo con las obligaciones de cumplimiento corporativo continuo. Como parte de este servicio, GM Attorneys ayuda a los clientes a cumplir con los requisitos legales vigentes, incluyendo el registro y mantenimiento del correo electrónico oficial de la sociedad para notificaciones administrativas y judiciales ante el Registro Nacional, conforme a la Ley N.° 10.597. Este correo electrónico es el medio oficial para recibir notificaciones legales de autoridades gubernamentales y tribunales, y debe mantenerse válido y monitoreado activamente.\nAdicionalmente, GM Attorneys actúa como domicilio legal de la SRL costarricense, donde los documentos legales y libros de la empresa se mantienen y custodian, garantizando el cumplimiento de los requisitos de llevanza de registros corporativos aplicables y facilitando la adecuada administración de los asuntos de la empresa.\nEsta tarifa es independiente del Impuesto Corporativo Anual, que es un impuesto estatal pagado directamente a la Administración Tributaria de Costa Rica y varía según si la sociedad está activa o inactiva, con el monto ajustado anualmente.",
    },
  },
  {
    slug: "pay-taxes-corporate-obligations",
    categoryKey: "corporateTax",
    question: {
      en: "How can I pay my property and corporate obligations in Costa Rica?",
      es: "¿Cómo puedo pagar mis obligaciones de propiedad y corporativas en Costa Rica?",
    },
    answer: {
      en: "Corporate obligations can generally be paid through:\nEscrow companies that provide Post Closing Services.\nTribu CR (IBAN account registration).\nCosta Rican accountant.\nThe company's legal representative can make the payment at BAC Credomatic and Bank of Costa Rica (BCR) teller window.\n\nProperty Obligations can generally be paid through:\nProperty Manager.\nCosta Rican online banking platforms.\nMunicipality websites.",
      es: "Las obligaciones corporativas generalmente pueden pagarse mediante:\nEmpresas de escrow que brindan servicios Post Closing.\nTribu CR (registro de cuenta IBAN).\nContador costarricense.\nEl representante legal de la empresa puede realizar el pago en ventanilla de BAC Credomatic y Banco de Costa Rica (BCR).\n\nLas obligaciones de propiedad generalmente pueden pagarse mediante:\nProperty Manager.\nPlataformas de banca en línea costarricenses.\nSitios web de las municipalidades.",
    },
  },
  {
    slug: "rtbf-compliance",
    categoryKey: "corporateTax",
    question: {
      en: "What is the RTBF (Registro de Transparencia y Beneficiarios Finales), and how can I ensure my corporation remains compliant?",
      es: "¿Qué es el RTBF (Registro de Transparencia y Beneficiarios Finales), y cómo puedo asegurarme de que mi sociedad se mantenga en cumplimiento?",
    },
    answer: {
      en: "The RTBF is the mandatory beneficial ownership declaration filed with the Central Bank of Costa Rica (BCCR).\nEvery corporation must disclose:\nShareholders.\nPercentage ownership.\nUltimate beneficial owners.\nThe filing must be submitted annually during April and must also be updated whenever ownership changes involving 15% or more of the corporation's shares occur. Failure to comply may result in penalties and restrictions.",
      es: "El RTBF es la declaración obligatoria de beneficiarios finales que se presenta ante el Banco Central de Costa Rica (BCCR).\nToda sociedad debe declarar:\nSus accionistas.\nEl porcentaje de participación.\nLos beneficiarios finales últimos.\nLa declaración debe presentarse anualmente durante abril, y también debe actualizarse cada vez que ocurran cambios de propiedad que involucren el 15% o más de las acciones de la sociedad. El incumplimiento puede resultar en sanciones y restricciones.",
    },
  },
  {
    slug: "need-an-accountant",
    categoryKey: "corporateTax",
    question: {
      en: "Do I need an accountant if my corporation is active, and what services would they provide?",
      es: "¿Necesito un contador si mi sociedad está activa, y qué servicios brindaría?",
    },
    answer: {
      en: "Yes. Active corporations are generally required to maintain accounting records and file tax returns. Even inactive corporations must comply with certain filing obligations, including information returns.\n\nAn accountant can assist with:\nIncome tax returns.\nFilings for inactive corporations.\nTax registrations and updates.\nCorporate compliance matters.",
      es: "Sí. Las sociedades activas generalmente están obligadas a llevar registros contables y presentar declaraciones de impuestos. Incluso las sociedades inactivas deben cumplir con ciertas obligaciones de declaración, incluyendo declaraciones informativas.\n\nUn contador puede ayudar con:\nDeclaraciones de impuesto sobre la renta.\nDeclaraciones para sociedades inactivas.\nInscripciones y actualizaciones tributarias.\nAsuntos de cumplimiento corporativo.",
    },
  },
  {
    slug: "no-costa-rican-bank-account",
    categoryKey: "corporateTax",
    question: {
      en: "If I do not have a Costa Rican bank account, how can I pay my taxes and other corporate obligations?",
      es: "Si no tengo una cuenta bancaria en Costa Rica, ¿cómo puedo pagar mis impuestos y otras obligaciones corporativas?",
    },
    answer: {
      en: "Corporate obligations can generally be paid through:\nEscrow companies that provide Post Closing Services.\nTribu CR (IBAN account registration).\nCosta Rican accountant.\nThe company's legal representative can make the payment at BAC Credomatic and Bank of Costa Rica (BCR) teller window.\n\nProperty Obligations can generally be paid through:\nProperty Manager.\nCosta Rican online banking platforms.\nMunicipality websites.",
      es: "Las obligaciones corporativas generalmente pueden pagarse mediante:\nEmpresas de escrow que brindan servicios Post Closing.\nTribu CR (registro de cuenta IBAN).\nContador costarricense.\nEl representante legal de la empresa puede realizar el pago en ventanilla de BAC Credomatic y Banco de Costa Rica (BCR).\n\nLas obligaciones de propiedad generalmente pueden pagarse mediante:\nProperty Manager.\nPlataformas de banca en línea costarricenses.\nSitios web de las municipalidades.",
    },
  },
  {
    slug: "closing-costs-purchasing",
    categoryKey: "realEstatePurchases",
    question: {
      en: "What legal fees, taxes, and closing costs should I expect when purchasing property in Costa Rica?",
      es: "¿Qué honorarios legales, impuestos y costos de cierre debo esperar al comprar una propiedad en Costa Rica?",
    },
    answer: {
      en: "Closing costs are generally estimated at approximately 4~5% of the purchase price or registered value, whichever is greater.\nThese costs may include:\nNotary fees.\nVAT.\nTransfer tax.\nRegistration stamps.\nRegistration duties.\nEscrow fees.\nAdditional costs may include corporate setup fees, inspections, surveys, powers of attorney, utility transfers, and post-closing compliance filings.",
      es: "Los costos de cierre generalmente se estiman en aproximadamente un 4~5% del precio de compra o el valor registrado, el que sea mayor.\nEstos costos pueden incluir:\nHonorarios notariales.\nIVA.\nImpuesto de traspaso.\nEspecies fiscales de inscripción.\nDerechos de registro.\nHonorarios de la cuenta de garantía (escrow).\nLos costos adicionales pueden incluir la constitución de una sociedad, inspecciones, levantamientos topográficos, poderes, traspaso de servicios públicos y trámites de cumplimiento posteriores al cierre.",
    },
  },
  {
    slug: "escrow-account-advantages",
    categoryKey: "realEstatePurchases",
    question: {
      en: "What are the advantages of using an escrow account during a real estate transaction?",
      es: "¿Cuáles son las ventajas de usar una cuenta de garantía (escrow) durante una transacción inmobiliaria?",
    },
    answer: {
      en: "An escrow account provides security for both buyer and seller by ensuring that funds are held by an independent third party until all contractual conditions have been satisfied.\nKey benefits include:\nProtection against fraud.\nTransparent handling of funds.\nReduced transaction risk.\nProper coordination and logistics of closing requirements.\nEscrow services are commonly used in Costa Rican real estate transactions involving foreign buyers.",
      es: "Una cuenta de garantía (escrow) brinda seguridad tanto al comprador como al vendedor, asegurando que los fondos sean resguardados por un tercero independiente hasta que se cumplan todas las condiciones contractuales.\nLos principales beneficios incluyen:\nProtección contra fraude.\nManejo transparente de los fondos.\nMenor riesgo en la transacción.\nCoordinación y logística adecuadas de los requisitos de cierre.\nLos servicios de escrow se utilizan comúnmente en transacciones inmobiliarias en Costa Rica que involucran compradores extranjeros.",
    },
  },
  {
    slug: "condominium-owner-obligations",
    categoryKey: "realEstatePurchases",
    question: {
      en: "If I purchase a condominium, what legal and financial obligations will I have as an owner?",
      es: "Si compro un condominio, ¿qué obligaciones legales y financieras tendré como propietario?",
    },
    answer: {
      en: "Condominium owners are generally responsible for:\nMonthly HOA or condominium fees.\nProperty taxes.\nGarbage collection fees.\nCompliance with condominium regulations and bylaws.\nMaintenance assessments approved by the condominium association.\nInsurance of the common areas, among others.\nThe specific obligations vary from one condominium project to another.",
      es: "Los propietarios de un condominio generalmente son responsables de:\nLas cuotas mensuales de mantenimiento o condominio.\nEl impuesto sobre bienes inmuebles.\nLas tasas de recolección de basura.\nEl cumplimiento del reglamento y estatutos del condominio.\nLas cuotas extraordinarias de mantenimiento aprobadas por la asociación de condóminos.\nEl seguro de las áreas comunes, entre otros.\nLas obligaciones específicas varían de un proyecto de condominio a otro.",
    },
  },
  {
    slug: "personal-vs-corporate-ownership",
    categoryKey: "realEstatePurchases",
    question: {
      en: "What are the advantages and disadvantages of purchasing property in my personal name versus through a corporation?",
      es: "¿Cuáles son las ventajas y desventajas de comprar una propiedad a mi nombre personal versus a través de una sociedad?",
    },
    answer: {
      en: "Personal Ownership\nAdvantages:\nSimpler ownership structure.\nNo annual corporate compliance obligations.\nReduced administrative costs.\nDisadvantages:\nLess flexibility for future transfers or estate planning.\nUpdating ID everytime it gets expired or lost.\nIn Person appearance for the execution of closing.\n\nCorporate Ownership\nAdvantages:\nRemotely execution of Closing Documents.\nBroader Estate Planning alternatives.\nMay facilitate business or investment activities.\nDisadvantages:\nAnnual corporate taxes and filings.\nAccounting and compliance obligations.\nCorporate requirements.",
      es: "Propiedad Personal\nVentajas:\nEstructura de propiedad más simple.\nSin obligaciones anuales de cumplimiento corporativo.\nMenores costos administrativos.\nDesventajas:\nMenor flexibilidad para futuros traspasos o planificación patrimonial.\nActualizar la identificación cada vez que vence o se pierde.\nPresencia en persona para la firma de documentos de cierre.\n\nPropiedad a través de Sociedad\nVentajas:\nFirma remota de documentos de cierre.\nMayores alternativas de planificación patrimonial.\nPuede facilitar actividades comerciales o de inversión.\nDesventajas:\nImpuestos y declaraciones corporativas anuales.\nObligaciones contables y de cumplimiento.\nRequisitos corporativos.",
    },
  },
  {
    slug: "selling-property-taxes",
    categoryKey: "sellingRealEstate",
    question: {
      en: "What taxes, fees, and expenses am I responsible for when selling my property?",
      es: "¿De qué impuestos, tarifas y gastos soy responsable al vender mi propiedad?",
    },
    answer: {
      en: "Typically the seller will pay the following:\nReal estate commission.\nSeller's legal advisory.\nA percentage of Closing Costs, unless something else is agreed.\nCapital Gains Tax under the scenarios described below:\nThe default tax rate is 15% on the capital gain (profit).\nCertain properties owned before July 1, 2019, may qualify for a one-time alternative calculation of 2.25% of the gross sale price.\nPrimary residences may qualify for exemption subject to compliance with CR Tax Residence (183 days or more in CR).\nNon-domiciled foreign sellers may be subject to a 2.5% withholding by the buyer.",
      es: "Por lo general, el vendedor pagará lo siguiente:\nComisión inmobiliaria.\nAsesoría legal del vendedor.\nUn porcentaje de los costos de cierre, salvo que se acuerde algo diferente.\nImpuesto sobre Ganancias de Capital bajo los escenarios descritos a continuación:\nLa tasa de impuesto predeterminada es del 15% sobre la ganancia de capital (utilidad).\nCiertas propiedades adquiridas antes del 1 de julio de 2019 pueden calificar para un cálculo alternativo único del 2.25% sobre el precio bruto de venta.\nLas residencias principales pueden calificar para exención sujeto al cumplimiento de la Residencia Fiscal en Costa Rica (183 días o más en CR).\nLos vendedores extranjeros no domiciliados pueden estar sujetos a una retención del 2.5% por parte del comprador.",
    },
  },
  {
    slug: "residency-requirements",
    categoryKey: "residencyImmigration",
    question: {
      en: "What are the requirements and process for obtaining Costa Rican residency?",
      es: "¿Cuáles son los requisitos y el proceso para obtener la residencia costarricense?",
    },
    answer: {
      en: "Common temporary residency categories include:\n\nInvestor Residency\nInvestment of at least US$200,000 in Costa Rica, including real estate or qualifying corporate investments.\n\nPensionado Residency\nLifetime pension income of at least US$1,000 per month.\n\nRentista Residency\nGuaranteed income of at least US$2,500 per month for a minimum of two years.\n\nApplicants must also provide:\nBirth certificate.\nPolice clearance records:\nFBI fingerprints and background documentation for U.S. applicants.\nRoyal Canadian Mounted Police (RCMP) fingerprints and background documentation for Canadian applicants.\nMarriage certificate (if applicable).\n\nThe above documents must be issued and apostilled no more than six months before filing.",
      es: "Las categorías comunes de residencia temporal incluyen:\n\nResidencia por Inversión\nInversión de al menos US$200,000 en Costa Rica, incluyendo bienes inmuebles o inversiones corporativas calificadas.\n\nResidencia Pensionado\nIngreso vitalicio por pensión de al menos US$1,000 mensuales.\n\nResidencia Rentista\nIngreso garantizado de al menos US$2,500 mensuales durante un mínimo de dos años.\n\nLos solicitantes también deben aportar:\nCertificado de nacimiento.\nAntecedentes policiales:\nHuellas dactilares del FBI y documentación de antecedentes para solicitantes estadounidenses.\nHuellas dactilares de la Real Policía Montada del Canadá (RCMP) y documentación de antecedentes para solicitantes canadienses.\nCertificado de matrimonio (si aplica).\n\nLos documentos anteriores deben haber sido emitidos y apostillados no más de seis meses antes de la presentación.",
    },
  },
  {
    slug: "what-is-apostille",
    categoryKey: "residencyImmigration",
    question: {
      en: "What is an Apostille and how do I get it?",
      es: "¿Qué es una Apostilla y cómo la obtengo?",
    },
    answer: {
      en: "The Hague Convention on the Apostille establishes a simplified method for authenticating public documents so they are recognized across all signatory countries.\nThrough this convention, public documents or certificates — such as birth, marriage, or death certificates, court judgments, registry extracts, notarial attestations, and other official documents — are recognized in any of the countries that have signed the Hague Convention.\nAn Apostille certifies only the legal validity and the origin of the public document to which it relates. It verifies the authenticity of the signature or seal of the person or authority that signed or sealed the document and their official capacity. An Apostille does not certify the content of the document itself.\nFor further information, contact our team.",
      es: "El Convenio de La Haya sobre la Apostilla establece un método simplificado para autenticar documentos públicos de manera que sean reconocidos en todos los países signatarios.\nA través de este convenio, los documentos públicos o certificados —como actas de nacimiento, matrimonio o defunción, sentencias judiciales, extractos de registros, certificaciones notariales y otros documentos oficiales— son reconocidos en cualquiera de los países que han firmado el Convenio de La Haya.\nUna Apostilla certifica únicamente la validez legal y el origen del documento público al que se refiere. Verifica la autenticidad de la firma o sello de la persona o autoridad que firmó o selló el documento y su calidad oficial. La Apostilla no certifica el contenido del documento en sí.\nPara mayor información, comuníquese con nuestro equipo.",
    },
  },
  {
    slug: "open-bank-account",
    categoryKey: "banking",
    question: {
      en: "Can I open a bank account in Costa Rica as a foreigner or through my corporation?",
      es: "¿Puedo abrir una cuenta bancaria en Costa Rica como extranjero o a través de mi sociedad?",
    },
    answer: {
      en: "Yes. Foreign individuals and Costa Rican corporations can usually open bank accounts, subject to the bank's compliance and due diligence requirements.\n\nRequirements commonly include:\nPassport or identification.\nProof of address.\nSource of funds (backup documentation).\nCorporate documents if the account is being opened by a corporation.\nCash Flow Projections.\nForeign and Local CPA Certification.\nAt least 6 months of bank statements of the applicant.\n\nRequirements vary by bank and are subject to regulatory compliance review.",
      es: "Sí. Los extranjeros y las sociedades costarricenses generalmente pueden abrir cuentas bancarias, sujeto a los requisitos de cumplimiento y debida diligencia del banco.\n\nLos requisitos comúnmente incluyen:\nPasaporte o documento de identificación.\nComprobante de domicilio.\nDocumentación sobre el origen de los fondos.\nDocumentos corporativos si la cuenta se abre a nombre de una sociedad.\nProyecciones de flujo de caja.\nCertificación de CPA extranjero y local.\nAl menos 6 meses de estados de cuenta bancarios del solicitante.\n\nLos requisitos varían según el banco y están sujetos a revisión de cumplimiento regulatorio.",
    },
  },
  {
    slug: "rental-property-requirements",
    categoryKey: "rentalProperties",
    question: {
      en: "What legal, tax, and regulatory requirements must I meet to rent out my property in Costa Rica?",
      es: "¿Qué requisitos legales, fiscales y regulatorios debo cumplir para alquilar mi propiedad en Costa Rica?",
    },
    answer: {
      en: "Depending on the type of rental activity, owners may be required to:\nRegister as a taxpayer with the Costa Rican Tax Office.\nFile rental income and VAT Tax.\nCollect and remit applicable taxes when required.\nObtain municipal licenses where applicable.\nComply with condominium and zoning regulations.\nICT Registration for Short-Term Rentals.\nOwners operating through a corporation must also maintain all corporate compliance requirements.",
      es: "Dependiendo del tipo de actividad de alquiler, los propietarios pueden estar obligados a:\nInscribirse como contribuyentes ante la Administración Tributaria de Costa Rica.\nDeclarar los ingresos por alquiler y el Impuesto al Valor Agregado (IVA).\nCobrar y remitir los impuestos aplicables cuando corresponda.\nObtener licencias municipales cuando aplique.\nCumplir con las regulaciones de condominio y zonificación.\nRegistro ante el ICT para alquileres a corto plazo.\nLos propietarios que operan a través de una sociedad también deben mantener todos los requisitos de cumplimiento corporativo.",
    },
  },
  {
    slug: "closest-office-location",
    categoryKey: "officeLocations",
    question: {
      en: "Which office location is closest to me, and how can I contact it?",
      es: "¿Cuál oficina está más cerca de mí, y cómo puedo contactarla?",
    },
    answer: {
      en: "GM Attorneys currently has offices in:\nFlamingo, Guanacaste\nTamarindo, Guanacaste\nNosara, Guanacaste\nLos Yoses, San José\n\nFor assistance determining the most convenient office, contact info@gmattorneyscr.com or call (+506) 4108-4070.",
      es: "GM Attorneys actualmente cuenta con oficinas en:\nFlamingo, Guanacaste\nTamarindo, Guanacaste\nNosara, Guanacaste\nLos Yoses, San José\n\nPara ayuda determinando la oficina más conveniente, contáctenos en info@gmattorneyscr.com o llame al (+506) 4108-4070.",
    },
  },
];
