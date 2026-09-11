import { offices } from "@/data/offices";

const SITE_URL = "https://gmattorneyscr.com";
const LOGO_URL = `${SITE_URL}/assets/GM_logotipo_Footer.svg`;

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: "GM Attorneys",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Premium boutique law firm in Costa Rica with over 45 years of experience in real estate, foreign investment, corporate law, and immigration.",
    email: "info@gmattorneyscr.com",
    telephone: "+506-4108-4070",
    priceRange: "$$$",
    areaServed: "CR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San José",
      addressCountry: "CR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+506-4108-4070",
      email: "info@gmattorneyscr.com",
      contactType: "customer service",
      areaServed: "CR",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://www.instagram.com/gm_attorneys/",
      "https://www.facebook.com/gmattorneyscr?fref=ts",
      "https://cr.linkedin.com/company/gm-attorneys",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "GM Attorneys",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["es-CR", "en-US"],
  };

  const officeSchemas = offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#office-${office.id}`,
    name: office.name,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    image: LOGO_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressCountry: "CR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.lat,
      longitude: office.lng,
    },
    telephone: "+506-4108-4070",
    email: office.email,
    url: office.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  }));

  const schemas = [organizationSchema, websiteSchema, ...officeSchemas];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
