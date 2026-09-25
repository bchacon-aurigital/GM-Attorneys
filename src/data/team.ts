export interface TeamMember {
  slug: string;
  name: string;
  roleKey: string;
  titleTag: string;
  tagKeys: string[];
  image: string;
  bio: string[];
  hidden?: boolean;
}

export const team: TeamMember[] = [
  // ── Partners ──────────────────────────────────────────────────────────────
  {
    slug: "jorge-granados",
    name: "Jorge Granados",
    roleKey: "partner",
    titleTag: "Founding Partner",
    tagKeys: ["experience45", "pathmaker"],
    image: "/assets/team/Jorge.avif",
    bio: [
      "With over 40 years of professional experience, I am the founder of GM Attorneys and have guided clients through complex criminal matters in Costa Rica and beyond — from financial crimes and corruption to high-stakes litigation before national and international courts.",
      "Early in my career, I saw something others didn't: the extraordinary potential of Guanacaste as a destination for international real estate investment. Acting on that vision, I established our presence there long before it became a magnet for global investors. That decision shaped our firm's DNA—strategic thinking, technical excellence, and genuine connection with the communities we serve.",
      "Fluent in Spanish, English, and Portuguese.",
    ],
  },
  {
    slug: "ivan-granados",
    name: "Iván Granados",
    roleKey: "partner",
    titleTag: "Managing Partner",
    tagKeys: ["experience25", "sharpThinker"],
    image: "/assets/team/Ivan.avif",
    bio: [
      "I am an attorney at law with over 25 years of experience. Graduated Summa Cum Laude and holding a dual Master's in Tax and Business Law.",
      "As Managing Partner at GM Attorneys, I dedicate my practice to ensuring that every client's investment or project in Costa Rica is not only secure but also seamless. My expertise lies in real estate, corporate, and tax law, where I take pride in delivering solutions that blend legal precision with agile, personalized service.",
      "My career began in the public sector, where I gained a deep appreciation for regulatory clarity and the art of strategic negotiation. Since 2004, I have led our Firm, advising investors and companies—particularly foreign clients—who rely on a trusted legal partner to navigate Costa Rica's dynamic market successfully.",
      "My greatest satisfaction comes from seeing clients close their real estate and investment projects with confidence—knowing everything was done right in a timely manner—and that our Firm is becoming their trusted advisor for long-term legal support.",
    ],
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    slug: "adriana-cordero",
    name: "Adriana Cordero",
    roleKey: "attorney",
    titleTag: "Senior Associate",
    tagKeys: ["experience25", "clarifier"],
    image: "/assets/team/Adriana.avif",
    bio: [
      "I guide individuals, businesses, and communities through complex legal processes with a balance of firmness, empathy, and strategic vision. With over 25 years of experience in civil and commercial law, I focus on real estate and business transactions, estate and corporate law, and resolving condominium property disputes.",
      "What I enjoy most is untangling legal knots—bringing clarity to complex situations and finding sustainable solutions that protect my clients' interests. Based in our Playa Nosara office, I combine my legal practice with a strong commitment to the coastal community where I live.",
      "Fluent in English and Spanish.",
    ],
  },
  {
    slug: "mariajose-viquez",
    name: "Mariajosé Víquez",
    roleKey: "attorney",
    titleTag: "Senior Associate",
    tagKeys: ["experience14", "pragmatic"],
    image: "/assets/team/Maria.avif",
    bio: [
      "I have called Guanacaste home for over nine years, which means I understand first-hand what it takes to settle, invest, and build a life in Costa Rica. I work closely with foreign clients on real estate, immigration, and corporate matters, offering guidance that is practical, clear, and personal.",
      "As an attorney and notary public with advanced studies in Notarial and Registry Law, and a specialization in artificial intelligence applied to legal practice, I use technology as a tool to simplify processes and make the legal experience faster and more accessible.",
      "Fluent in English and Spanish.",
    ],
  },
  {
    slug: "andrea-jara",
    name: "Andrea Jara",
    roleKey: "attorney",
    titleTag: "Senior Associate",
    tagKeys: ["experience15", "negotiator"],
    image: "/assets/team/Andrea.avif",
    bio: [
      "I am a trusted legal advisor guiding companies and individuals through complex legal challenges with clarity, precision, and strategic insight. With over a decade of experience as an attorney and notary public, I offer thoughtful and effective cross-border legal solutions in Spanish and English that drive results and build lasting relationships with executive teams and clients alike.",
      "Graduated from the University of Costa Rica with a specialization in Environmental Law, and holding a postgraduate certification in Notary and Registry Law, I work seamlessly across jurisdictions to deliver solutions that are thoughtful, effective, and sustainable.",
      "Fluent in English and Spanish.",
    ],
  },
  {
    slug: "brians-salazar",
    name: "Brians Salazar",
    roleKey: "attorney",
    titleTag: "Associate",
    tagKeys: ["experience10", "strategist"],
    image: "/assets/team/Brians.avif",
    bio: [
      "With over five years in GM's corporate, real estate, and legal practice, and a background as a legislative advisor for major companies, I bring a balance of practical solutions and social commitment to my work.",
      "I have advised nonprofit organizations in Nosara and worked directly with migrants and refugees in Costa Rica, experiences that have shaped my ability to handle legal matters with empathy, efficiency, and a focus on real-world impact.",
      "Fluent in English and Spanish.",
    ],
  },
  {
    slug: "harold-matarrita",
    name: "Harold Matarrita",
    roleKey: "attorney",
    titleTag: "Junior Associate",
    tagKeys: ["experience4", "reliable"],
    image: "/assets/team/Harold.avif",
    bio: [
      "I have built my career at GM Attorneys, starting in 2019 in client service and coordination, later working as a legal assistant, and now practicing as an attorney specializing in corporate and notarial law.",
      "My progression within the firm has allowed me to understand the client journey from the very first contact to the successful completion of a matter. I bring this insight to every case, ensuring that processes run smoothly and expectations are met with precision.",
      "Currently pursuing a specialization in Notarial and Registry Law, I continue to strengthen my knowledge in corporate matters while remaining committed to delivering attentive, detail-oriented service.",
    ],
  },
  {
    slug: "gloriana-arrieta",
    name: "Gloriana Arrieta",
    roleKey: "attorney",
    titleTag: "Junior Associate",
    tagKeys: ["experience4", "composed"],
    image: "/assets/team/Gloriana.avif",
    bio: [
      "I support clients throughout property purchase and sale processes, from due diligence to formal documentation, ensuring every transaction is legally secure and commercially successful.",
      "With a background in civil, labor, and family law, and a Law degree with a specialization in Human Rights, I bring a humanistic perspective and strong ethical commitment to my practice.",
      "What defines my approach is professionalism, meticulous attention to detail, and the determination to guide clients with clarity through complex decisions.",
    ],
  },
  {
    slug: "valery-turcio",
    name: "Valery Turcios",
    roleKey: "attorney",
    titleTag: "Junior Associate",
    tagKeys: ["experience5", "explorer"],
    image: "/assets/team/Valery.avif",
    bio: [
      "I focus my practice on corporate law, drafting contracts and deeds to formalize real estate transactions in high-demand markets.",
      "Holding a Law degree with a specialization in Judge Training, I combine technical accuracy with clear communication—particularly valuable when working with clients from diverse backgrounds.",
      "Fluent in English and Spanish, I help ensure that processes move forward efficiently and with the confidence that every legal detail has been addressed.",
    ],
  },
  // Paralegals
  {
    slug: "jorge-granados-paralegal",
    name: "Jorge Arturo Granados",
    roleKey: "paralegals",
    titleTag: "Paralegal",
    tagKeys: ["versatile"],
    image: "/assets/team/placeholder.avif",
    bio: [],
  },
  {
    slug: "santiago-batalla",
    name: "Santiago Batalla",
    roleKey: "paralegals",
    titleTag: "Paralegal",
    tagKeys: ["experience3", "trustBuilder"],
    image: "/assets/team/Santiago.avif",
    bio: [
      "I am passionate about delivering legal services with a human-centered approach. To me, every client represents a unique set of goals, challenges, and aspirations—not just another legal matter. My objective is to provide thoughtful guidance, meticulous attention to detail, and practical solutions that help clients move forward with confidence.",
      "With more than three years of experience advising on real estate transactions, complemented by work in civil litigation, I have developed a well-rounded perspective that strengthens my transactional practice. My litigation experience has enabled me to identify potential legal risks before they become disputes, anticipate future contingencies, and draft agreements that provide clarity, certainty, and long-term protection for our clients. Currently pursuing my Law degree, I continue to build on this foundation with one goal in mind: helping clients invest with confidence, even when they are doing so far from home.",
      "Fluent in English and Spanish.",
    ],
  },
  {
    slug: "francelly-marchena",
    name: "Francelly Marchena",
    roleKey: "paralegals",
    titleTag: "Paralegal",
    tagKeys: ["precise"],
    image: "/assets/team/Francelly.avif",
    bio: [],
  },

  // ── Business & Strategy Development – Client Experience ───────────────────
  {
    slug: "diana-granados",
    name: "Diana Granados",
    roleKey: "businessDevelopment",
    titleTag: "Strategic Development & CX",
    tagKeys: ["catalyst"],
    image: "/assets/team/Diana.avif",
    bio: [
      "I lead strategic development and client experience initiatives at GM Attorneys, ensuring that every legal solution meets the highest standards while feeling seamless and personal. My role is to bridge strategic planning, operational excellence, and client relationships, so that results are achieved without compromising the human connection.",
      "With nearly 14 years of experience across law firms, corporate environments, and strategic consulting, I specialize in negotiation and conflict resolution. I am results-driven, passionate, and dynamic, working to make sure that each achievement not only delivers tangible value but also strengthens the relationship behind it.",
      "My cross-sector background allows me to anticipate challenges, align multidisciplinary teams, and design solutions that support both immediate goals and long-term growth. I believe in achieving measurable results while cultivating relationships that turn one successful project into a lasting partnership.",
    ],
  },
  {
    slug: "manfred-peters",
    name: "Manfred Peters",
    roleKey: "businessDevelopment",
    titleTag: "Business Development & Client Experience",
    tagKeys: ["connector"],
    image: "/assets/team/Manfred.avif",
    bio: [
      "Since joining GM Attorneys in 2018, I have focused on business development and strategic relationship management, connecting the firm with international clients and key players in the luxury real estate sector.",
      "I led the opening of our Nosara office, strengthening our presence in Guanacaste and positioning us closer to the communities we serve. My background combines legal training with an MBA, allowing me to bridge legal expertise with commercial strategy.",
      "I enjoy building partnerships that endure—relationships where trust, professionalism, and mutual benefit define the way forward.",
    ],
  },
  {
    slug: "efrain-hidalgo",
    name: "Efraín Hidalgo",
    roleKey: "businessDevelopment",
    titleTag: "Legal & Innovation Lead",
    tagKeys: ["solutionOriented"],
    image: "/assets/team/Efrain.avif",
    bio: [
      "I am a legal assistant with over a decade of experience providing legal support across a variety of matters. My focus is on delivering work that is accurate, timely, and aligned with the highest professional standards.",
      "Throughout my career, I have developed a deep understanding of Costa Rica's legal framework, which allows me to assist attorneys effectively and anticipate client needs.",
      "I take pride in being a reliable point of support for both the legal team and our clients, ensuring that every detail is handled with care.",
    ],
  },
  {
    slug: "alina-guzman",
    name: "Alina Guzmán",
    roleKey: "businessDevelopment",
    titleTag: "Real Estate Specialist & Project Coordinator",
    tagKeys: ["orchestrator"],
    image: "/assets/team/Alina.avif",
    bio: [
      "With more than seven years of experience as a paralegal at GM Attorneys, I provide strategic support in complex real estate, commercial, corporate, and due diligence matters. My work combines technical expertise, legal precision, and strong interpersonal skills to help drive successful outcomes for clients and multidisciplinary teams.",
      "Holding degrees in Criminology and Law, I bring a strong analytical mindset and a practical understanding of legal and business challenges. I thrive in collaborative environments where attention to detail, organization, and effective communication are essential.",
      "Committed to continuous professional development, I am passionate about strengthening my leadership abilities, enhancing soft skills, and expanding my expertise in corporate and commercial law. My goal is to contribute strategic legal insight while building long-term value for clients and organizations.",
    ],
  },

  // ── Operations ────────────────────────────────────────────────────────────
  {
    slug: "carmen-rodriguez",
    name: "Carmen Julia Rodríguez",
    roleKey: "assistants",
    titleTag: "Senior Administrative Officer",
    tagKeys: ["backbone"],
    image: "/assets/team/Carmen.avif",
    bio: [
      "I have been part of the GM family for the past 16 years, serving with commitment and excellence as an Administrative Assistant.",
      "My professional journey with the firm began in late 2009, just as the company was taking its first steps toward expansion. Since then, I have closely accompanied its growth, contributing not only my knowledge but also an unwavering work ethic.",
      "I hold a high school diploma in Accounting and Business Administration, and throughout my career I have been recognized as a responsible, honest, and attentive individual. These qualities have allowed me to positively impact the work environment, maintaining a cordial and respectful relationship with both clients and colleagues. One of my greatest achievements has been providing consistent and thoughtful attention to everyone around me.",
      "Over the years, my presence at GM has become synonymous with stability, efficiency, and trust. Without a doubt, my career reflects the value of perseverance, dedication, and a job well done.",
    ],
  },
  {
    slug: "fiorella-rodriguez",
    name: "Fiorella Rodríguez",
    roleKey: "assistants",
    titleTag: "Office Manager",
    tagKeys: ["forwardThinking"],
    image: "/assets/team/Fiorella.avif",
    bio: [],
  },
  {
    slug: "valeria-ramirez",
    name: "Valeria Ramírez",
    roleKey: "assistants",
    titleTag: "Accountant Department",
    tagKeys: ["collaborative"],
    image: "/assets/team/Valeria.avif",
    bio: [],
  },
  {
    slug: "isabela-juarez",
    name: "Isabela Juárez",
    roleKey: "assistants",
    titleTag: "Administrative Assistant",
    tagKeys: ["consistent"],
    image: "/assets/team/Isabela.avif",
    bio: [],
  },
  {
    slug: "allison-canales",
    name: "Allison Canales",
    roleKey: "assistants",
    titleTag: "Front Desk Executive",
    tagKeys: ["adaptable"],
    image: "/assets/team/Allison.avif",
    bio: [],
  },
  {
    slug: "grettel-araya",
    name: "Grettel Araya",
    roleKey: "assistants",
    titleTag: "Administrative Assistant",
    tagKeys: ["facilitator"],
    image: "/assets/team/Grettel.avif",
    bio: [],
  },
  {
    slug: "valeska-ruiz",
    name: "Valeska Ruiz",
    roleKey: "assistants",
    titleTag: "Administrative Assistant",
    tagKeys: ["steadfast"],
    image: "/assets/team/Valezka.avif",
    bio: [],
  },

  {
    slug: "marianne-zumbado",
    name: "Marianne Zumbado",
    roleKey: "assistants",
    titleTag: "Front Desk Executive",
    tagKeys: ["harmonizer"],
    image: "/assets/team/Marianne.avif",
    bio: [],
  },

  // ── Senior Counsel ────────────────────────────────────────────────────────
  {
    slug: "alvaro-fernandez-silva",
    name: "Álvaro Fernández Silva",
    roleKey: "seniorCounsel",
    titleTag: "Senior Counsel",
    tagKeys: ["formerSupremeCourtJustice", "litigator"],
    hidden: true,
    image: "/assets/team/placeholder.avif",
    bio: [
      "Álvaro Fernández Silva is a well-known trial Attorney, legal advisor and former Supreme Court Judge, who speaks Spanish, Italian and is fluent reading in English, French and Portuguese.",
      "In 1959, he began his studies in Medicine and Political Science in Padova, Italy. However, he decided to study Law at the University of Costa Rica (UCR), and in 1969, he obtained his Law Degree as an honor student. In 1970, he specialized in Administrative Law and Related Sciences with honors, (Suma Cum Laude), degree awarded by the University of Rome, Italy.",
      "Professionally, Attorney Fernandez has a wide experience in the public, private and education sector. He had the high honor to be appointed as a Supreme Court Judge for more than 13 years, serving for both the Second and First Chambers. He also served as a Parliament Advisor and Judge of the Juzgado Civil de Hacienda.",
      "In the education sector, he lectured at the University of Costa Rica and the Universidad Autónoma de Centro América. His private sector experience includes serving as Legal Counsel for KLM Royal Dutch Airlines and Of Counsel for BANDECO (Del Monte). He is a founder of several legal institutions, including the Costa Rican Association of Public Law.",
    ],
  },
  {
    slug: "enrique-granados",
    name: "Enrique Granados",
    roleKey: "seniorCounsel",
    titleTag: "Senior Counsel",
    tagKeys: ["publicNotary", "speaksSpanishItalianEnglish"],
    hidden: true,
    image: "/assets/team/placeholder.avif",
    bio: [
      "Enrique Granados is an Attorney, Notary Public and also a well known Opera Singer, who speaks Spanish, Italian and English.",
      "In 1959, he began his studies at the University of Costa Rica, graduating from Law School in 1965 and the Conservatory of Music in 1969. In 1973, he specialized in Air and Space Law in Buenos Aires, Argentina.",
      "His public sector career includes roles as General Director of the Immigration Department, Ambassador for the Ministry of Foreign Affairs, and Minister of Culture, Youth and Sports. He has also been a Professor of Law at UACA and received numerous international honors, including being named an Official Knight of the Order of Merit of the Italian Republic.",
      "As an artist, he was the Founder and Artistic Director of the National Lyric Company and has several publications regarding the intersection of Law and Opera.",
    ],
  },
];

export const visibleTeam = team.filter((m) => !m.hidden);
