export interface TeamMember {
  slug: string;
  name: string;
  roleKey: string;
  tagKeys: string[];
}

export const team: TeamMember[] = [
  { slug: "ivan-granados", name: "Iván Granados", roleKey: "partner", tagKeys: ["managingPartner", "experience25"] },
  { slug: "jorge-granados", name: "Jorge Granados", roleKey: "partner", tagKeys: ["seniorPartner", "founder", "experience40"] },
  { slug: "adriana-cordero", name: "Adriana Cordero", roleKey: "attorney", tagKeys: [] },
  { slug: "andrea-jara", name: "Andrea Jara", roleKey: "attorney", tagKeys: [] },
  { slug: "brians-salazar", name: "Brians Salazar", roleKey: "attorney", tagKeys: [] },
  { slug: "daniel-oses", name: "Daniel Oses", roleKey: "attorney", tagKeys: [] },
  { slug: "harold-matarrita", name: "Harold Matarrita", roleKey: "attorney", tagKeys: [] },
  { slug: "mariajose-viquez", name: "Mariajosé Víquez", roleKey: "attorney", tagKeys: [] },
  { slug: "carmen-julia-rodriguez", name: "Carmen Julia Rodríguez", roleKey: "businessDevelopment", tagKeys: ["seniorAdminOfficer", "years16"] },
  { slug: "diana-granados", name: "Diana Granados", roleKey: "businessDevelopment", tagKeys: ["strategicDevelopment", "clientExperienceConsultant"] },
  { slug: "fiorella-rodriguez", name: "Fiorella Rodríguez", roleKey: "businessDevelopment", tagKeys: ["officeManager"] },
  { slug: "manfred-peters", name: "Manfred Peters", roleKey: "businessDevelopment", tagKeys: ["since2018"] },
  { slug: "alina-guzman", name: "Alina Guzmán", roleKey: "paralegals", tagKeys: [] },
  { slug: "efrain-hidalgo", name: "Efraín Hidalgo", roleKey: "paralegals", tagKeys: [] },
  { slug: "gloriana-arrieta-1", name: "Gloriana Arrieta", roleKey: "paralegals", tagKeys: [] },
  { slug: "santiago-batalla", name: "Santiago Batalla", roleKey: "paralegals", tagKeys: [] },
  { slug: "valery-turcio", name: "Valery Turcio", roleKey: "paralegals", tagKeys: [] },
  { slug: "gloriana-arrieta-2", name: "Gloriana Arrieta", roleKey: "paralegals", tagKeys: [] },
  { slug: "allison-canales", name: "Allison Canales", roleKey: "assistants", tagKeys: [] },
  { slug: "denis-lopez", name: "Denis López", roleKey: "assistants", tagKeys: [] },
  { slug: "valeria-ramirez", name: "Valeria Ramírez", roleKey: "assistants", tagKeys: [] },
  { slug: "valeska-ruiz", name: "Valeska Ruíz", roleKey: "assistants", tagKeys: [] },
  { slug: "alvaro-fernandez-silva", name: "Álvaro Fernández Silva", roleKey: "seniorCounsel", tagKeys: ["litigator", "speaksSpanishItalian", "formerSupremeCourtJustice"] },
  { slug: "enrique-granados", name: "Enrique Granados", roleKey: "seniorCounsel", tagKeys: ["lawyer", "publicNotary", "speaksSpanishItalianEnglish"] },
];
