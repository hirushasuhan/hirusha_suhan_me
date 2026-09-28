// Single source of truth for SEO / AEO / GEO data.
// The FAQ below is BOTH rendered on the page (sections/faq.tsx) and emitted as JSON-LD,
// because Google requires structured data to match visible content.

export const SITE_URL = "https://www.hirushasuhan.me";
export const SITE_NAME = "Hirusha Suhan";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200×630
export const PROFILE_IMAGE = `${SITE_URL}/profile.jpg`; // 800×800, face-centred

export const TITLE = "Hirusha Suhan (Hiru) | Full-Stack Developer & Designer";
export const DESCRIPTION =
  "Hirusha Suhan (Hiru) is a Sri Lankan full-stack developer & designer. Explore his Next.js, React, Java and Python projects, 3D web work and event designs.";

export const SAME_AS = [
  "https://github.com/hirushasuhan",
  "https://www.linkedin.com/in/hirusha-suhan/",
  "https://x.com/hirusha_suhan",
  "https://linktr.ee/hirusha.suhan",
];

export const EMAIL = "hirushasuhan@outlook.com";

export interface Faq {
  q: string;
  a: string;
}

// Written as short, self-contained answers: this is the format answer engines
// (Google AI Overviews, ChatGPT, Perplexity, Claude) lift most easily.
export const FAQS: Faq[] = [
  {
    q: "Who is Hirusha Suhan (Hiru)?",
    a: "Hirusha Suhan, also known as Hiru, is a Sri Lankan full-stack developer and designer. He is an undergraduate at Uva Wellassa University of Sri Lanka, in the Department of Computer Science and Informatics (CSI), specializing in Industrial Information Technology (IIT).",
  },
  {
    q: "What does Hirusha Suhan build?",
    a: "He builds full-stack web platforms and object-oriented software: Serandib Grand (a hotel reservation system in PHP and MySQL), UniAlloc (a university workload system in Next.js and TypeScript), a Visa Consultation Platform, a Java Bus Fleet Management System, a Java Financial Expense Tracker, a console banking system in C, and a bulk-mail and QR-ticket generator in JavaScript.",
  },
  {
    q: "Which technologies does Hirusha Suhan use?",
    a: "Next.js, React, TypeScript, JavaScript, Tailwind CSS, Java, Python, C, PHP, SQL and MySQL, plus Git, Docker and CI/CD. This portfolio itself uses Three.js and WebGL for its 3D particle hologram and Framer Motion for animation.",
  },
  {
    q: "Does Hirusha Suhan do graphic design?",
    a: "Yes. He designs event branding, posters and social media visuals, including work for IEEE SLSYWC'26, UvaXtreme v2 (IEEEXtreme 19.0) and university committees. See the Design Portfolio section of this site.",
  },
  {
    q: "What certifications does Hirusha Suhan hold?",
    a: "Pearson Certified Diplomas in IT and in English, an APNIC Academy certification in IPv6 and routing, HackerRank certificates in Java, Python and JavaScript, and University of Moratuwa courses in web design and Python.",
  },
  {
    q: "How can I contact or hire Hirusha Suhan?",
    a: `Email ${EMAIL}, or reach him on LinkedIn (linkedin.com/in/hirusha-suhan), GitHub (github.com/hirushasuhan) or X (@hirusha_suhan). His CV is available for download on the home page.`,
  },
];

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  alternateName: ["Hiru", "Hirusha", "hirushasuhan"],
  givenName: "Hirusha",
  familyName: "Suhan",
  url: `${SITE_URL}/`,
  image: PROFILE_IMAGE,
  email: `mailto:${EMAIL}`,
  jobTitle: "Full-Stack Developer & Designer",
  description:
    "Hirusha Suhan (Hiru) is a Sri Lankan full-stack developer and designer, and a Computer Science & Informatics undergraduate at Uva Wellassa University of Sri Lanka.",
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Uva Wellassa University of Sri Lanka",
    alternateName: "UWU",
    url: "https://www.uwu.ac.lk/",
  },
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Java",
    "Python",
    "C",
    "PHP",
    "MySQL",
    "Three.js",
    "WebGL",
    "UI/UX design",
    "Graphic design",
    "Event branding",
    "IPv6 and routing",
    "Docker and CI/CD",
  ],
  sameAs: SAME_AS,
  mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
};

// Mirrors src/components/sections/projects.tsx (keep the two in sync).
const projects: { name: string; description: string; lang: string[]; repo: string; demo?: string }[] = [
  {
    name: "Serandib Grand — Luxury Hotel Reservation System",
    description:
      "Full-stack hotel reservation platform with role-based access (Admin, Manager, Front Desk, Guest), real-time room availability, reservations and invoicing.",
    lang: ["PHP", "MySQL"],
    repo: "https://github.com/hirushasuhan/serandib_grand",
    demo: "https://serandib-grand.wasmer.app",
  },
  {
    name: "UniAlloc — University Resource & Workload System",
    description:
      "Role-based academic resource allocation platform for university Dean's Offices with lecturer workload tracking and overload alerts.",
    lang: ["TypeScript", "Next.js", "MySQL"],
    repo: "https://github.com/hirushasuhan/UniAlloc_host",
    demo: "https://www.unialloc.app/login",
  },
  {
    name: "Visa Consultation Platform",
    description: "Visa consultation website with appointment scheduling and automated eligibility checkers.",
    lang: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/hirushasuhan/web-project-Visa-consultation-Company",
    demo: "https://hirushasuhan.github.io/web-project-Visa-consultation-Company/index.html",
  },
  {
    name: "Bus Fleet Management System",
    description:
      "Java system for managing public transportation fleets in Sri Lanka, with OOP design patterns, MySQL data models and automated scheduling.",
    lang: ["Java", "MySQL"],
    repo: "https://github.com/hirushasuhan/bus-management-system",
  },
  {
    name: "Financial Expense Tracker",
    description:
      "Desktop personal finance application in Java for tracking income, monitoring expenses and generating summaries.",
    lang: ["Java"],
    repo: "https://github.com/hirushasuhan/Expense-_Tracker",
  },
  {
    name: "Console Banking System",
    description:
      "Console banking management system in C with account creation, deposits, withdrawals and persistent file records.",
    lang: ["C"],
    repo: "https://github.com/hirushasuhan/Banking-system-C",
  },
  {
    name: "Bulk Mail & Dynamic QR Ticket Generator",
    description:
      "JavaScript pipeline that generates personalized QR-code tickets and dispatches bulk email for event check-in.",
    lang: ["JavaScript"],
    repo: "https://github.com/hirushasuhan/bulk-mail-and-auto-qr-and-ticket-generate-system",
  },
];

/** Full JSON-LD @graph. Call at build time (the site is a static export). */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME, // Google "site name": keep short and identical to the brand
        alternateName: ["Hirusha Suhan Portfolio", "hirushasuhan.me"],
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
        dateModified: new Date().toISOString(),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        name: "Projects by Hirusha Suhan",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: p.description,
            programmingLanguage: p.lang,
            codeRepository: p.repo,
            ...(p.demo ? { url: p.demo } : {}),
            author: { "@id": PERSON_ID },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
