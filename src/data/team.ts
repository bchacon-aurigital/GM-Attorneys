export interface LocalizedText {
  es: string;
  en: string;
}

export interface LocalizedParagraphs {
  es: string[];
  en: string[];
}

export interface TeamMember {
  slug: string;
  name: string;
  roleKey: string;
  titleTag: LocalizedText;
  tagKeys: string[];
  image: string;
  bio: LocalizedParagraphs;
  hidden?: boolean;
}

export const team: TeamMember[] = [
  // ── Partners ──────────────────────────────────────────────────────────────
  {
    slug: "jorge-granados",
    name: "Jorge Granados",
    roleKey: "partner",
    titleTag: { en: "Founding Partner", es: "Socio Fundador" },
    tagKeys: ["experience45", "pathmaker"],
    image: "/assets/team/Jorge.avif",
    bio: {
      en: [
        "With over 40 years of professional experience, I am the founder of GM Attorneys and have guided clients through complex criminal matters in Costa Rica and beyond — from financial crimes and corruption to high-stakes litigation before national and international courts.",
        "Early in my career, I saw something others didn't: the extraordinary potential of Guanacaste as a destination for international real estate investment. Acting on that vision, I established our presence there long before it became a magnet for global investors. That decision shaped our firm's DNA—strategic thinking, technical excellence, and genuine connection with the communities we serve.",
        "I speak Spanish, English, and Portuguese.",
      ],
      es: [
        "Con más de 40 años de experiencia profesional, soy el fundador de GM Attorneys y he acompañado a clientes en asuntos penales complejos en Costa Rica y el extranjero — desde delitos financieros y corrupción hasta litigios de alto nivel ante tribunales nacionales e internacionales.",
        "Al inicio de mi carrera vi algo que otros no veían: el extraordinario potencial de Guanacaste como destino para la inversión inmobiliaria internacional. Actuando sobre esa visión, establecimos nuestra presencia allí mucho antes de que se convirtiera en un imán para inversionistas globales. Esa decisión moldeó el ADN de nuestra firma: pensamiento estratégico, excelencia técnica y una conexión genuina con las comunidades a las que servimos.",
        "Hablo español, inglés y portugués.",
      ],
    },
  },
  {
    slug: "ivan-granados",
    name: "Iván Granados",
    roleKey: "partner",
    titleTag: { en: "Managing Partner", es: "Socio Director" },
    tagKeys: ["experience25", "sharpThinker"],
    image: "/assets/team/Ivan.avif",
    bio: {
      en: [
        "I am an attorney with over 25 years of experience. I graduated Summa Cum Laude, hold a dual Master's degree in Tax and Business Law, and am fluent in English and Spanish.",
        "As Managing Partner at GM Attorneys, I dedicate my practice to ensuring that every client's investment or project in Costa Rica is secure and runs smoothly from start to finish. My expertise lies in real estate and corporate law, as well as tax planning, where I take pride in delivering solutions that combine legal precision with agile, personalized service.",
        "My career began in the public sector, where I gained a deep appreciation for regulatory clarity and the art of strategic negotiation. Since 2004, I have led our firm, advising investors and companies, particularly foreign clients, who rely on a trusted legal partner to navigate Costa Rica's market.",
        "For more than 20 years, I have worked, raised my family, and built my career in Guanacaste. In that time, I have watched this coast evolve from an emerging market into a destination where people from around the world choose to invest, build, and call home. Living that change firsthand gives me context that shapes the advice I give every day.",
        "My greatest satisfaction comes from seeing clients close their real estate and investment projects with confidence, knowing everything was done right and on time, and from becoming the firm they trust for long-term legal support.",
      ],
      es: [
        "Soy abogado con más de 25 años de experiencia. Me gradué con honores Summa Cum Laude, tengo una doble maestría en Derecho Tributario y Derecho Empresarial, y hablo inglés y español con fluidez.",
        "Como Socio Director de GM Attorneys, mi trabajo es que cada inversión o proyecto de nuestros clientes en Costa Rica esté bien respaldado y avance sin complicaciones de principio a fin. Me especializo en derecho inmobiliario y corporativo, además de planificación tributaria, y busco siempre dar soluciones que unan el rigor legal con un servicio ágil y cercano.",
        "Empecé mi carrera en el sector público, donde aprendí el valor de la claridad en las reglas y de una buena negociación. Desde 2004 dirijo la firma y asesoro a inversionistas y empresas, sobre todo extranjeros, que necesitan un respaldo legal de confianza para invertir en Costa Rica.",
        "Desde hace más de 20 años vivo y trabajo en Guanacaste, donde crié a mi familia y construí mi carrera. En este tiempo he visto cómo esta costa pasó de ser un mercado emergente a un lugar donde gente de todo el mundo decide invertir, construir y quedarse a vivir. Haber vivido ese cambio de cerca me da una perspectiva que aplico en cada asesoría.",
        "Lo que más me satisface es ver a nuestros clientes cerrar sus proyectos con tranquilidad, sabiendo que todo se hizo de la manera correcta y a tiempo, y que nos sigan buscando como su firma de confianza a largo plazo.",
      ],
    },
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    slug: "adriana-cordero",
    name: "Adriana Cordero",
    roleKey: "attorney",
    titleTag: { en: "Senior Associate", es: "Asociada Senior" },
    tagKeys: ["experience25", "clarifier"],
    image: "/assets/team/Adriana.avif",
    bio: {
      en: [
        "I guide individuals, businesses, and communities through complex legal processes with a balance of firmness, empathy, and strategic vision. With over 25 years of experience in civil and commercial law, I focus on real estate and business transactions, estate and corporate law, and resolving condominium property disputes.",
        "What I enjoy most is untangling legal knots—bringing clarity to complex situations and finding sustainable solutions that protect my clients' interests. Based in our Playa Nosara office, I combine my legal practice with a strong commitment to the coastal community where I live.",
        "I speak English and Spanish.",
      ],
      es: [
        "Acompaño a personas, empresas y comunidades a través de procesos legales complejos con un equilibrio entre firmeza, empatía y visión estratégica. Con más de 25 años de experiencia en derecho civil y comercial, me enfoco en transacciones inmobiliarias y empresariales, derecho sucesorio y corporativo, y resolución de disputas en propiedad en condominio.",
        "Lo que más disfruto es desenredar nudos legales: aportar claridad a situaciones complejas y encontrar soluciones sostenibles que protejan los intereses de mis clientes. Con base en nuestra oficina de Playa Nosara, combino mi práctica legal con un fuerte compromiso con la comunidad costera donde vivo.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "mariajose-viquez",
    name: "Mariajosé Víquez",
    roleKey: "attorney",
    titleTag: { en: "Senior Associate", es: "Asociada Senior" },
    tagKeys: ["experience14", "pragmatic"],
    image: "/assets/team/Maria.avif",
    bio: {
      en: [
        "I have called Guanacaste home for over nine years, which means I understand first-hand what it takes to settle, invest, and build a life in Costa Rica. I work closely with foreign clients on real estate, immigration, and corporate matters, offering guidance that is practical, clear, and personal.",
        "As an attorney and notary public with advanced studies in Notarial and Registry Law, and a specialization in artificial intelligence applied to legal practice, I use technology as a tool to simplify processes and make the legal experience faster and more accessible.",
        "I speak English and Spanish.",
      ],
      es: [
        "He llamado hogar a Guanacaste por más de nueve años, lo que significa que entiendo de primera mano lo que implica establecerse, invertir y construir una vida en Costa Rica. Trabajo de cerca con clientes extranjeros en asuntos inmobiliarios, migratorios y corporativos, ofreciendo una guía práctica, clara y personal.",
        "Como abogada y notaria pública con estudios avanzados en Derecho Notarial y Registral, y una especialización en inteligencia artificial aplicada a la práctica legal, utilizo la tecnología como herramienta para simplificar procesos y hacer la experiencia legal más rápida y accesible.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "andrea-jara",
    name: "Andrea Jara",
    roleKey: "attorney",
    titleTag: { en: "Senior Associate", es: "Asociada Senior" },
    tagKeys: ["experience15", "negotiator"],
    image: "/assets/team/Andrea.avif",
    bio: {
      en: [
        "I am a trusted legal advisor guiding companies and individuals through complex legal challenges with clarity, precision, and strategic insight. With over a decade of experience as an attorney and notary public, I offer thoughtful and effective cross-border legal solutions in Spanish and English that drive results and build lasting relationships with executive teams and clients alike.",
        "Graduated from the University of Costa Rica with a specialization in Environmental Law, and holding a postgraduate certification in Notary and Registry Law, I work seamlessly across jurisdictions to deliver solutions that are thoughtful, effective, and sustainable.",
        "I speak English and Spanish.",
      ],
      es: [
        "Soy una asesora legal de confianza que guía a empresas y personas a través de desafíos jurídicos complejos con claridad, precisión y visión estratégica. Con más de una década de experiencia como abogada y notaria pública, ofrezco soluciones legales transfronterizas cuidadosas y efectivas en español e inglés, que generan resultados y construyen relaciones duraderas tanto con equipos ejecutivos como con clientes.",
        "Graduada de la Universidad de Costa Rica con especialización en Derecho Ambiental, y con una certificación de posgrado en Derecho Notarial y Registral, trabajo sin problemas entre jurisdicciones para brindar soluciones reflexivas, efectivas y sostenibles.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "brians-salazar",
    name: "Brians Salazar",
    roleKey: "attorney",
    titleTag: { en: "Associate", es: "Asociado" },
    tagKeys: ["experience10", "strategist"],
    image: "/assets/team/Brians.avif",
    bio: {
      en: [
        "With over five years in GM's corporate, real estate, and legal practice, and a background as a legislative advisor for major companies, I bring a balance of practical solutions and social commitment to my work.",
        "I have advised nonprofit organizations in Nosara and worked directly with migrants and refugees in Costa Rica, experiences that have shaped my ability to handle legal matters with empathy, efficiency, and a focus on real-world impact.",
        "I speak English and Spanish.",
      ],
      es: [
        "Con más de cinco años en la práctica corporativa, inmobiliaria y legal de GM, y una trayectoria como asesor legislativo para grandes empresas, aporto un equilibrio entre soluciones prácticas y compromiso social en mi trabajo.",
        "He asesorado a organizaciones sin fines de lucro en Nosara y he trabajado directamente con migrantes y refugiados en Costa Rica, experiencias que han forjado mi capacidad para manejar asuntos legales con empatía, eficiencia y un enfoque en el impacto real.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "harold-matarrita",
    name: "Harold Matarrita",
    roleKey: "attorney",
    titleTag: { en: "Junior Associate", es: "Asociado Junior" },
    tagKeys: ["experience4", "reliable"],
    image: "/assets/team/Harold.avif",
    bio: {
      en: [
        "I have built my career at GM Attorneys, starting in 2019 in client service and coordination, later working as a legal assistant, and now practicing as an attorney specializing in corporate and notarial law.",
        "My progression within the firm has allowed me to understand the client journey from the very first contact to the successful completion of a matter. I bring this insight to every case, ensuring that processes run smoothly and expectations are met with precision.",
        "Currently pursuing a specialization in Notarial and Registry Law, I continue to strengthen my knowledge in corporate matters while remaining committed to delivering attentive, detail-oriented service.",
        "I speak English and Spanish.",
      ],
      es: [
        "He construido mi carrera en GM Attorneys, comenzando en 2019 en atención y coordinación de clientes, luego como asistente legal, y hoy ejerciendo como abogado especializado en derecho corporativo y notarial.",
        "Mi progresión dentro de la firma me ha permitido entender el recorrido del cliente desde el primer contacto hasta la conclusión exitosa de un asunto. Aporto esta perspectiva a cada caso, asegurando que los procesos fluyan y que las expectativas se cumplan con precisión.",
        "Actualmente cursando una especialización en Derecho Notarial y Registral, continúo fortaleciendo mis conocimientos en materia corporativa, manteniendo el compromiso de brindar un servicio atento y detallado.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "gloriana-arrieta",
    name: "Gloriana Arrieta",
    roleKey: "attorney",
    titleTag: { en: "Junior Associate", es: "Asociada Junior" },
    tagKeys: ["experience4", "composed"],
    image: "/assets/team/Gloriana.avif",
    bio: {
      en: [
        "I support clients throughout property purchase and sale processes, from due diligence to formal documentation, ensuring every transaction is legally secure and commercially successful.",
        "With a background in civil, labor, and family law, and a Law degree with a specialization in Human Rights, I bring a humanistic perspective and strong ethical commitment to my practice.",
        "What defines my approach is professionalism, meticulous attention to detail, and the determination to guide clients with clarity through complex decisions.",
        "I speak English and Spanish.",
      ],
      es: [
        "Acompaño a los clientes durante los procesos de compraventa de propiedades, desde la debida diligencia hasta la documentación formal, asegurando que cada transacción sea legalmente segura y comercialmente exitosa.",
        "Con formación en derecho civil, laboral y de familia, y con un título en Derecho con especialización en Derechos Humanos, aporto una perspectiva humanista y un fuerte compromiso ético a mi práctica.",
        "Lo que define mi enfoque es la profesionalidad, la atención meticulosa al detalle y la determinación de guiar a los clientes con claridad a través de decisiones complejas.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "valery-turcio",
    name: "Valery Turcios",
    roleKey: "attorney",
    titleTag: { en: "Junior Associate", es: "Asociada Junior" },
    tagKeys: ["experience5", "explorer"],
    image: "/assets/team/Valery.avif",
    bio: {
      en: [
        "I focus my practice on corporate law, drafting contracts and deeds to formalize real estate transactions in high-demand markets.",
        "Holding a Law degree with a specialization in Judge Training, I combine technical accuracy with clear communication—particularly valuable when working with clients from diverse backgrounds.",
        "Fluent in English and Spanish, I help ensure that processes move forward efficiently and with the confidence that every legal detail has been addressed.",
      ],
      es: [
        "Enfoco mi práctica en el derecho corporativo, redactando contratos y escrituras para formalizar transacciones inmobiliarias en mercados de alta demanda.",
        "Con un título en Derecho y una especialización en Formación Judicial, combino la precisión técnica con una comunicación clara, especialmente valiosa al trabajar con clientes de diversos orígenes.",
        "Bilingüe en inglés y español, ayudo a que los procesos avancen con eficiencia y con la confianza de que cada detalle legal ha sido atendido.",
      ],
    },
  },
  // Paralegals
  {
    slug: "jorge-granados-paralegal",
    name: "Jorge Arturo Granados",
    roleKey: "paralegals",
    titleTag: { en: "Paralegal", es: "Asistente Legal" },
    tagKeys: ["versatile"],
    image: "/assets/team/placeholder.avif",
    bio: {
      en: [
        "Jorge Arturo guides GM Attorneys clients through every stage of their legal matters with a rare mix of rigor and warmth. Over more than four years in the legal field, he has become known for his service-driven approach, his humanistic outlook and his ease in adapting to each client's needs. His natural curiosity leads him to dig beyond the obvious and find the detail others miss, a habit clients appreciate. He completed his law studies at Universidad Autónoma de Centro América (UACA) and works fluently in English and Spanish.",
      ],
      es: [
        "Jorge Arturo acompaña a los clientes de GM Attorneys en cada etapa de sus procesos, con una combinación poco común de rigor y cercanía. En más de cuatro años de experiencia en el ámbito legal se ha distinguido por su vocación de servicio, su mirada humanista y su facilidad para adaptarse a lo que cada cliente necesita. Su curiosidad natural lo lleva a investigar más allá de lo evidente y a encontrar el dato que otros pasan por alto, algo que sus clientes valoran. Egresado de la carrera de Derecho de la Universidad Autónoma de Centro América (UACA), trabaja con fluidez en español e inglés.",
      ],
    },
  },
  {
    slug: "santiago-batalla",
    name: "Santiago Batalla",
    roleKey: "paralegals",
    titleTag: { en: "Paralegal", es: "Asistente Legal" },
    tagKeys: ["experience3", "trustBuilder"],
    image: "/assets/team/Santiago.avif",
    bio: {
      en: [
        "I am passionate about delivering legal services with a human-centered approach. To me, every client represents a unique set of goals, challenges, and aspirations—not just another legal matter. My objective is to provide thoughtful guidance, meticulous attention to detail, and practical solutions that help clients move forward with confidence.",
        "With more than three years of experience advising on real estate transactions, complemented by work in civil litigation, I have developed a well-rounded perspective that strengthens my transactional practice. My litigation experience has enabled me to identify potential legal risks before they become disputes, anticipate future contingencies, and draft agreements that provide clarity, certainty, and long-term protection for our clients. Currently pursuing my Law degree, I continue to build on this foundation with one goal in mind: helping clients invest with confidence, even when they are doing so far from home.",
        "I speak English and Spanish.",
      ],
      es: [
        "Me apasiona brindar servicios legales con un enfoque centrado en las personas. Para mí, cada cliente representa un conjunto único de metas, retos y aspiraciones — no solo un asunto legal más. Mi objetivo es ofrecer una guía cuidadosa, una atención meticulosa al detalle y soluciones prácticas que ayuden a los clientes a avanzar con confianza.",
        "Con más de tres años de experiencia asesorando en transacciones inmobiliarias, complementada con trabajo en litigio civil, he desarrollado una perspectiva integral que fortalece mi práctica transaccional. Mi experiencia en litigio me ha permitido identificar riesgos legales antes de que se conviertan en disputas, anticipar contingencias futuras y redactar acuerdos que brinden claridad, certeza y protección a largo plazo para nuestros clientes. Actualmente cursando mi licenciatura en Derecho, continúo construyendo sobre esta base con un objetivo en mente: ayudar a los clientes a invertir con confianza, incluso cuando lo hacen lejos de casa.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "francelly-marchena",
    name: "Francelly Marchena",
    roleKey: "paralegals",
    titleTag: { en: "Paralegal", es: "Asistente Legal" },
    tagKeys: ["precise"],
    image: "/assets/team/Francelly.avif",
    bio: {
      en: [
        "I am particularly drawn to legal work that involves research, analysis, and a detailed understanding of complex matters. I enjoy exploring each subject in depth, identifying the relevant elements, and understanding how they relate to one another in order to develop clear and well-grounded solutions. In my work, I place strong emphasis on accuracy and attention to detail, particularly when preparing and reviewing documents and following through on legal matters.",
        "My experience in the legal environment has allowed me to work on corporate matters, real estate transactions, the preparation and review of legal documents, and the coordination of different legal processes. These experiences have strengthened my ability to work in an organized manner, analyze information from different perspectives, anticipate needs, and carefully follow each matter through.",
        "I particularly enjoy work that requires research, judgment, attention to detail, and follow-through. I am motivated by the opportunity to continuously acquire knowledge, explore complex subjects, and turn that information into practical tools for legal work. As I build my career in law, I continue to develop these skills while pursuing a growing interest in corporate and transactional practice.",
        "I speak Spanish and English.",
      ],
      es: [
        "Me caracterizo por una fuerte inclinación hacia la investigación, el análisis y la comprensión detallada de los asuntos jurídicos. Me interesa profundizar en cada tema, identificar los elementos relevantes y entender cómo se relacionan entre sí para construir soluciones claras y bien fundamentadas. En mi trabajo, presto especial atención a los detalles y a la precisión, particularmente en la preparación y revisión de documentos y en el seguimiento de procesos legales.",
        "Mi experiencia en el entorno jurídico me ha permitido involucrarme en asuntos corporativos, transacciones inmobiliarias, preparación y revisión de documentos y coordinación de distintos procesos legales. Estas experiencias han fortalecido mi capacidad para trabajar de manera organizada, analizar información desde diferentes perspectivas, anticipar necesidades y mantener un seguimiento cuidadoso de cada asunto.",
        "Disfruto especialmente los trabajos que requieren investigación, criterio, atención al detalle y seguimiento. Me motiva la posibilidad de adquirir conocimiento, profundizar en temas complejos y transformar esa información en herramientas prácticas para el trabajo jurídico. Continúo desarrollando estas habilidades mientras construyo mi carrera en Derecho, con especial interés en seguir creciendo dentro del ámbito corporativo y transaccional.",
        "Hablo español e inglés.",
      ],
    },
  },

  // ── Business & Strategy Development – Client Experience ───────────────────
  {
    slug: "diana-granados",
    name: "Diana Granados",
    roleKey: "businessDevelopment",
    titleTag: {
      en: "Strategic Development and Client Experience",
      es: "Desarrollo Estratégico y Experiencia del Cliente",
    },
    tagKeys: ["catalyst"],
    image: "/assets/team/Diana.avif",
    bio: {
      en: [
        "I lead strategic development and client experience initiatives at GM Attorneys, ensuring that every legal solution meets the highest standards while feeling seamless and personal. My role is to bridge strategic planning, operational excellence, and client relationships, so that results are achieved without compromising the human connection.",
        "With nearly 14 years of experience across law firms, corporate environments, and strategic consulting, I specialize in negotiation and conflict resolution. I am results-driven, passionate, and dynamic, working to make sure that each achievement not only delivers tangible value but also strengthens the relationship behind it.",
        "My cross-sector background allows me to anticipate challenges, align multidisciplinary teams, and design solutions that support both immediate goals and long-term growth. I believe in achieving measurable results while cultivating relationships that turn one successful project into a lasting partnership.",
        "I speak English and Spanish.",
      ],
      es: [
        "Lidero las iniciativas de desarrollo estratégico y experiencia del cliente en GM Attorneys, asegurando que cada solución legal cumpla con los más altos estándares mientras se siente fluida y personal. Mi rol es conectar la planificación estratégica, la excelencia operativa y las relaciones con los clientes, para que los resultados se logren sin comprometer la conexión humana.",
        "Con casi 14 años de experiencia en firmas legales, entornos corporativos y consultoría estratégica, me especializo en negociación y resolución de conflictos. Soy orientada a resultados, apasionada y dinámica, trabajando para asegurar que cada logro no solo entregue valor tangible, sino que también fortalezca la relación detrás de él.",
        "Mi trayectoria intersectorial me permite anticipar desafíos, alinear equipos multidisciplinarios y diseñar soluciones que respalden tanto metas inmediatas como el crecimiento a largo plazo. Creo en alcanzar resultados medibles mientras cultivo relaciones que convierten un proyecto exitoso en una alianza duradera.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "manfred-peters",
    name: "Manfred Peters",
    roleKey: "businessDevelopment",
    titleTag: {
      en: "Business Development & Client Experience",
      es: "Desarrollo de Negocios y Experiencia del Cliente",
    },
    tagKeys: ["connector"],
    image: "/assets/team/Manfred.avif",
    bio: {
      en: [
        "Since joining GM Attorneys in 2018, I have focused on business development and strategic relationship management, connecting the firm with international clients and key players in the luxury real estate sector.",
        "I led the opening of our Nosara office, strengthening our presence in Guanacaste and positioning us closer to the communities we serve. My background combines legal training with an MBA, allowing me to bridge legal expertise with commercial strategy.",
        "I enjoy building partnerships that endure—relationships where trust, professionalism, and mutual benefit define the way forward.",
        "I speak English and Spanish.",
      ],
      es: [
        "Desde que me uní a GM Attorneys en 2018, me he enfocado en el desarrollo de negocios y la gestión estratégica de relaciones, conectando a la firma con clientes internacionales y actores clave en el sector inmobiliario de lujo.",
        "Lideré la apertura de nuestra oficina en Nosara, fortaleciendo nuestra presencia en Guanacaste y posicionándonos más cerca de las comunidades a las que servimos. Mi formación combina la preparación jurídica con un MBA, lo que me permite integrar la experiencia legal con la estrategia comercial.",
        "Disfruto construir alianzas que perduran — relaciones donde la confianza, la profesionalidad y el beneficio mutuo definen el camino a seguir.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "efrain-hidalgo",
    name: "Efraín Hidalgo",
    roleKey: "businessDevelopment",
    titleTag: { en: "Legal & Innovation Lead", es: "Líder Legal y de Innovación" },
    tagKeys: ["solutionOriented"],
    image: "/assets/team/Efrain.avif",
    bio: {
      en: [
        "I am a legal assistant with over a decade of experience providing legal support across a variety of matters. My focus is on delivering work that is accurate, timely, and aligned with the highest professional standards.",
        "Throughout my career, I have developed a deep understanding of Costa Rica's legal framework, which allows me to assist attorneys effectively and anticipate client needs.",
        "I take pride in being a reliable point of support for both the legal team and our clients, ensuring that every detail is handled with care.",
        "I speak English and Spanish.",
      ],
      es: [
        "Soy un asistente legal con más de una década de experiencia brindando apoyo jurídico en una variedad de asuntos. Mi enfoque está en entregar un trabajo preciso, oportuno y alineado con los más altos estándares profesionales.",
        "A lo largo de mi carrera he desarrollado un profundo conocimiento del marco legal costarricense, lo que me permite asistir a los abogados de manera efectiva y anticipar las necesidades de los clientes.",
        "Me enorgullece ser un punto de apoyo confiable tanto para el equipo legal como para nuestros clientes, asegurando que cada detalle sea manejado con cuidado.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "alina-guzman",
    name: "Alina Guzmán",
    roleKey: "businessDevelopment",
    titleTag: {
      en: "Real Estate Specialist & Project Coordinator",
      es: "Especialista en Bienes Raíces y Coordinadora de Proyectos",
    },
    tagKeys: ["orchestrator"],
    image: "/assets/team/Alina.avif",
    bio: {
      en: [
        "With more than seven years of experience as a paralegal at GM Attorneys, I provide strategic support in complex real estate, commercial, corporate, and due diligence matters. My work combines technical expertise, legal precision, and strong interpersonal skills to help drive successful outcomes for clients and multidisciplinary teams.",
        "Holding degrees in Criminology and Law, I bring a strong analytical mindset and a practical understanding of legal and business challenges. I thrive in collaborative environments where attention to detail, organization, and effective communication are essential.",
        "Committed to continuous professional development, I am passionate about strengthening my leadership abilities, enhancing soft skills, and expanding my expertise in corporate and commercial law. My goal is to contribute strategic legal insight while building long-term value for clients and organizations.",
        "I speak English and Spanish.",
      ],
      es: [
        "Con más de siete años de experiencia como asistente legal en GM Attorneys, brindo apoyo estratégico en asuntos complejos inmobiliarios, comerciales, corporativos y de debida diligencia. Mi trabajo combina experiencia técnica, precisión legal y sólidas habilidades interpersonales para impulsar resultados exitosos para clientes y equipos multidisciplinarios.",
        "Con títulos en Criminología y Derecho, aporto una mentalidad analítica sólida y una comprensión práctica de los desafíos legales y empresariales. Me desarrollo mejor en entornos colaborativos donde la atención al detalle, la organización y la comunicación efectiva son esenciales.",
        "Comprometida con el desarrollo profesional continuo, me apasiona fortalecer mis capacidades de liderazgo, mejorar habilidades blandas y expandir mi experiencia en derecho corporativo y comercial. Mi objetivo es aportar una visión legal estratégica mientras construyo valor a largo plazo para clientes y organizaciones.",
        "Hablo inglés y español.",
      ],
    },
  },

  // ── Operations ────────────────────────────────────────────────────────────
  {
    slug: "carmen-rodriguez",
    name: "Carmen Julia Rodríguez",
    roleKey: "assistants",
    titleTag: { en: "Senior Administrative Officer", es: "Oficial Administrativa Senior" },
    tagKeys: ["backbone"],
    image: "/assets/team/Carmen.avif",
    bio: {
      en: [
        "I have been part of the GM family for the past 16 years, serving with commitment and excellence as an Administrative Assistant.",
        "My professional journey with the firm began in late 2009, just as the company was taking its first steps toward expansion. Since then, I have closely accompanied its growth, contributing not only my knowledge but also an unwavering work ethic.",
        "I hold a high school diploma in Accounting and Business Administration, and throughout my career I have been recognized as a responsible, honest, and attentive individual. These qualities have allowed me to positively impact the work environment, maintaining a cordial and respectful relationship with both clients and colleagues. One of my greatest achievements has been providing consistent and thoughtful attention to everyone around me.",
        "Over the years, my presence at GM has become synonymous with stability, efficiency, and trust. Without a doubt, my career reflects the value of perseverance, dedication, and a job well done.",
        "I speak English and Spanish.",
      ],
      es: [
        "He sido parte de la familia GM durante los últimos 16 años, sirviendo con compromiso y excelencia como Asistente Administrativa.",
        "Mi trayectoria profesional con la firma comenzó a finales de 2009, justo cuando la empresa daba sus primeros pasos hacia la expansión. Desde entonces, he acompañado de cerca su crecimiento, aportando no solo mis conocimientos sino también una ética de trabajo inquebrantable.",
        "Cuento con un diploma de secundaria en Contabilidad y Administración de Empresas, y a lo largo de mi carrera he sido reconocida como una persona responsable, honesta y atenta. Estas cualidades me han permitido impactar positivamente el ambiente laboral, manteniendo una relación cordial y respetuosa tanto con clientes como con colegas. Uno de mis mayores logros ha sido brindar atención consistente y cuidadosa a todos a mi alrededor.",
        "Con los años, mi presencia en GM se ha convertido en sinónimo de estabilidad, eficiencia y confianza. Sin duda, mi carrera refleja el valor de la perseverancia, la dedicación y el trabajo bien hecho.",
        "Hablo inglés y español.",
      ],
    },
  },
  {
    slug: "fiorella-rodriguez",
    name: "Fiorella Rodríguez",
    roleKey: "assistants",
    titleTag: { en: "Office Manager", es: "Gerente de Oficina" },
    tagKeys: ["forwardThinking"],
    image: "/assets/team/Fiorella.avif",
    bio: { en: [], es: [] },
  },
  {
    slug: "valeria-ramirez",
    name: "Valeria Ramírez",
    roleKey: "assistants",
    titleTag: { en: "Accountant Department", es: "Departamento Contable" },
    tagKeys: ["collaborative"],
    image: "/assets/team/Valeria.avif",
    bio: { en: [], es: [] },
  },
  {
    slug: "isabela-juarez",
    name: "Isabela Juárez",
    roleKey: "assistants",
    titleTag: { en: "Administrative Assistant", es: "Asistente Administrativa" },
    tagKeys: ["consistent"],
    image: "/assets/team/Isabela.avif",
    bio: { en: [], es: [] },
  },
  {
    slug: "allison-canales",
    name: "Allison Canales",
    roleKey: "assistants",
    titleTag: { en: "Front Desk Executive", es: "Ejecutiva de Recepción" },
    tagKeys: ["adaptable"],
    image: "/assets/team/Allison.avif",
    bio: { en: [], es: [] },
  },
  {
    slug: "grettel-araya",
    name: "Grettel Araya",
    roleKey: "assistants",
    titleTag: { en: "Administrative Assistant", es: "Asistente Administrativa" },
    tagKeys: ["facilitator"],
    image: "/assets/team/Grettel.avif",
    bio: { en: [], es: [] },
  },
  {
    slug: "valeska-ruiz",
    name: "Valeska Ruiz",
    roleKey: "assistants",
    titleTag: { en: "Administrative Assistant", es: "Asistente Administrativa" },
    tagKeys: ["steadfast"],
    image: "/assets/team/Valezka.avif",
    bio: { en: [], es: [] },
  },

  {
    slug: "marianne-zumbado",
    name: "Marianne Zumbado",
    roleKey: "assistants",
    titleTag: { en: "Front Desk Executive", es: "Ejecutiva de Recepción" },
    tagKeys: ["harmonizer"],
    image: "/assets/team/Marianne.avif",
    bio: { en: [], es: [] },
  },

  // ── Senior Counsel ────────────────────────────────────────────────────────
  {
    slug: "alvaro-fernandez-silva",
    name: "Álvaro Fernández Silva",
    roleKey: "seniorCounsel",
    titleTag: { en: "Senior Counsel", es: "Asesor Senior" },
    tagKeys: ["formerSupremeCourtJustice", "litigator"],
    hidden: true,
    image: "/assets/team/placeholder.avif",
    bio: {
      en: [
        "Álvaro Fernández Silva is a well-known trial Attorney, legal advisor and former Supreme Court Judge, who speaks Spanish, Italian and is fluent reading in English, French and Portuguese.",
        "In 1959, he began his studies in Medicine and Political Science in Padova, Italy. However, he decided to study Law at the University of Costa Rica (UCR), and in 1969, he obtained his Law Degree as an honor student. In 1970, he specialized in Administrative Law and Related Sciences with honors, (Suma Cum Laude), degree awarded by the University of Rome, Italy.",
        "Professionally, Attorney Fernandez has a wide experience in the public, private and education sector. He had the high honor to be appointed as a Supreme Court Judge for more than 13 years, serving for both the Second and First Chambers. He also served as a Parliament Advisor and Judge of the Juzgado Civil de Hacienda.",
        "In the education sector, he lectured at the University of Costa Rica and the Universidad Autónoma de Centro América. His private sector experience includes serving as Legal Counsel for KLM Royal Dutch Airlines and Of Counsel for BANDECO (Del Monte). He is a founder of several legal institutions, including the Costa Rican Association of Public Law.",
      ],
      es: [
        "Álvaro Fernández Silva es un reconocido abogado litigante, asesor legal y exmagistrado de la Corte Suprema, que habla español, italiano y lee con fluidez en inglés, francés y portugués.",
        "En 1959, comenzó sus estudios en Medicina y Ciencias Políticas en Padua, Italia. Sin embargo, decidió estudiar Derecho en la Universidad de Costa Rica (UCR), y en 1969 obtuvo su título de Licenciado en Derecho con honores. En 1970 se especializó en Derecho Administrativo y Ciencias Afines con honores (Suma Cum Laude), grado otorgado por la Universidad de Roma, Italia.",
        "Profesionalmente, el abogado Fernández tiene amplia experiencia en el sector público, privado y educativo. Tuvo el alto honor de ser nombrado Magistrado de la Corte Suprema por más de 13 años, sirviendo tanto en la Segunda como en la Primera Sala. También se desempeñó como Asesor Parlamentario y Juez del Juzgado Civil de Hacienda.",
        "En el sector educativo, fue profesor en la Universidad de Costa Rica y la Universidad Autónoma de Centro América. Su experiencia en el sector privado incluye haber sido Asesor Legal de KLM Royal Dutch Airlines y Of Counsel de BANDECO (Del Monte). Es fundador de varias instituciones jurídicas, incluida la Asociación Costarricense de Derecho Público.",
      ],
    },
  },
  {
    slug: "enrique-granados",
    name: "Enrique Granados",
    roleKey: "seniorCounsel",
    titleTag: { en: "Senior Counsel", es: "Asesor Senior" },
    tagKeys: ["publicNotary", "speaksSpanishItalianEnglish"],
    hidden: true,
    image: "/assets/team/placeholder.avif",
    bio: {
      en: [
        "Enrique Granados is an Attorney, Notary Public and also a well known Opera Singer, who speaks Spanish, Italian and English.",
        "In 1959, he began his studies at the University of Costa Rica, graduating from Law School in 1965 and the Conservatory of Music in 1969. In 1973, he specialized in Air and Space Law in Buenos Aires, Argentina.",
        "His public sector career includes roles as General Director of the Immigration Department, Ambassador for the Ministry of Foreign Affairs, and Minister of Culture, Youth and Sports. He has also been a Professor of Law at UACA and received numerous international honors, including being named an Official Knight of the Order of Merit of the Italian Republic.",
        "As an artist, he was the Founder and Artistic Director of the National Lyric Company and has several publications regarding the intersection of Law and Opera.",
      ],
      es: [
        "Enrique Granados es abogado, notario público y también un reconocido cantante de ópera, que habla español, italiano e inglés.",
        "En 1959 inició sus estudios en la Universidad de Costa Rica, graduándose de la Facultad de Derecho en 1965 y del Conservatorio de Música en 1969. En 1973 se especializó en Derecho Aéreo y Espacial en Buenos Aires, Argentina.",
        "Su carrera en el sector público incluye cargos como Director General del Departamento de Migración, Embajador del Ministerio de Relaciones Exteriores y Ministro de Cultura, Juventud y Deportes. También ha sido Profesor de Derecho en la UACA y ha recibido numerosos honores internacionales, incluyendo el nombramiento como Caballero Oficial de la Orden al Mérito de la República Italiana.",
        "Como artista, fue Fundador y Director Artístico de la Compañía Lírica Nacional y cuenta con varias publicaciones sobre la intersección entre el Derecho y la Ópera.",
      ],
    },
  },
];

export const visibleTeam = team.filter((m) => !m.hidden);
