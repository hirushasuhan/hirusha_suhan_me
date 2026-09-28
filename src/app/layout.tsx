import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollBridge } from "@/components/providers/scroll-bridge";
import { StageLoader } from "@/components/three/stage-loader";
import { IntroOverlay } from "@/components/motion/intro-overlay";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { MatrixRain } from "@/components/ui/matrix-rain";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = "https://www.hirushasuhan.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hirusha Suhan | Full-Stack Developer & Designer",
    template: "%s | Hirusha Suhan",
  },
  description:
    "Official portfolio of Hirusha Suhan - Full-Stack Developer, UI/UX Designer & Computer Science & Informatics Undergraduate at Uva Wellassa University of Sri Lanka (CSI). Specializing in Next.js, React, Python, Three.js 3D WebGL, DevOps, Web3, and Event Branding.",
  applicationName: "Hirusha Suhan Portfolio",
  authors: [{ name: "Hirusha Suhan", url: SITE_URL }],
  creator: "Hirusha Suhan",
  publisher: "Hirusha Suhan",
  category: "technology",
  keywords: [
    "Hirusha Suhan",
    "Hiru",
    "Hirusha",
    "Hiru Developer",
    "Hirusha Suhan Developer",
    "Hirusha Developer",
    "Full-Stack Developer",
    "Software Engineer",
    "Frontend Developer",
    "Web Developer Sri Lanka",
    "Computer Science and Informatics",
    "CSI Uva Wellassa University",
    "Industrial Information Technology",
    "IIT UWU",
    "Cybersecurity",
    "Cryptography",
    "DevOps",
    "Web3",
    "Three.js Portfolio",
    "3D Hologram Portfolio",
    "Graphic Designer Sri Lanka",
    "Event Branding",
    "Next.js Portfolio",
    "React Developer",
    "TypeScript",
    "Python Developer",
    "Java Developer",
    "Sri Lankan Developer",
    "hirushasuhan.me",
  ],
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/icon-48.png"), sizes: "48x48", type: "image/png" },
      { url: asset("/icon-96.png"), sizes: "96x96", type: "image/png" },
      { url: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: asset("/ICON.png"), sizes: "512x512", type: "image/png" },
    ],
    shortcut: [asset("/favicon.ico")],
    apple: [
      { url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: asset("/site.webmanifest"),
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "profile",
    firstName: "Hirusha",
    lastName: "Suhan",
    username: "hirushasuhan",
    gender: "male",
    title: "Hirusha Suhan | Full-Stack Developer & Designer",
    description:
      "Official portfolio of Hirusha Suhan - Full-Stack Developer, UI/UX Designer & Computer Science & Informatics Undergraduate at Uva Wellassa University of Sri Lanka (CSI).",
    url: `${SITE_URL}/`,
    siteName: "Hirusha Suhan Portfolio",
    images: [
      {
        url: `${SITE_URL}/my%20photo/Man_in_dark_studio_portrait_2K_20260928210937.jpg`,
        width: 1200,
        height: 630,
        alt: "Hirusha Suhan - Full-Stack Developer Portrait",
      },
      {
        url: `${SITE_URL}/ICON.png`,
        width: 512,
        height: 512,
        alt: "Hirusha Suhan Developer Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hirusha Suhan | Full-Stack Developer & Designer",
    description:
      "Official portfolio of Hirusha Suhan - Full-Stack Developer, Designer & Computer Science Undergraduate at Uva Wellassa University of Sri Lanka.",
    creator: "@hirusha_suhan",
    site: "@hirusha_suhan",
    images: [`${SITE_URL}/my%20photo/Man_in_dark_studio_portrait_2K_20260928210937.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "LK",
    "geo.placename": "Badulla, Sri Lanka",
    author: "Hirusha Suhan",
    publisher: "Hirusha Suhan",
    "application-name": "Hirusha Suhan Portfolio",
    "msapplication-TileColor": "#06b6d4",
    "theme-color": "#000000",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Hirusha Suhan",
      alternateName: ["Hiru", "Hirusha", "hirushasuhan", "Hirusha Suhan (Hiru)"],
      givenName: "Hirusha",
      familyName: "Suhan",
      gender: "https://schema.org/Male",
      jobTitle: ["Full-Stack Developer", "Software Engineer", "UI/UX Designer", "Event Branding Designer"],
      description:
        "Hirusha Suhan (also known as Hiru) is a Sri Lankan Full-Stack Software Developer, Designer, and Computer Science & Informatics undergraduate at Uva Wellassa University of Sri Lanka (CSI Department), specializing in Industrial Information Technology (IIT).",
      image: `${SITE_URL}/my%20photo/Man_in_dark_studio_portrait_2K_20260928210937.jpg`,
      url: SITE_URL,
      email: "mailto:hirushasuhan@outlook.com",
      nationality: {
        "@type": "Country",
        name: "Sri Lanka",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Uva Wellassa University of Sri Lanka",
        alternateName: "UWU",
        url: "https://www.uwu.ac.lk/",
        department: {
          "@type": "EducationalOrganization",
          name: "Department of Computer Science and Informatics (CSI)",
          parentOrganization: "Faculty of Applied Sciences",
        },
      },
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "C",
        "Node.js",
        "Tailwind CSS",
        "Three.js",
        "WebGL",
        "Cybersecurity",
        "Cryptography",
        "DevOps",
        "Web3",
        "UI/UX Design",
        "Event Branding & Graphics",
        "Industrial Information Technology (IIT)",
      ],
      sameAs: [
        "https://github.com/hirushasuhan",
        "https://www.linkedin.com/in/hirusha-suhan/",
        "https://x.com/hirusha_suhan",
        "https://linktr.ee/hirusha.suhan",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Hirusha Suhan (Hiru) | Portfolio",
      alternateName: ["Hiru Developer Portfolio", "Hirusha Suhan Official Site", "hirushasuhan.me"],
      description: "Official engineering portfolio of Hirusha Suhan (Hiru) - Full-Stack Developer, Designer & Tech Researcher.",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Hirusha Suhan (Hiru) | Full-Stack Developer, Designer & Software Engineer",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Featured Software & Engineering Projects",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: "Bus Fleet Management System",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: "Real-time bus tracking and fleet logistics management platform.",
          author: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "SoftwareApplication",
          name: "Financial Expense Tracker",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          description: "Full-stack personal finance and expense dashboard with interactive analytics.",
          author: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "SoftwareApplication",
          name: "Visa Consultation Platform",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: "Web portal for client visa consultations and application tracking.",
          author: { "@id": `${SITE_URL}/#person` },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Hirusha Suhan (Hiru)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirusha Suhan (commonly known as Hiru) is a Sri Lankan Full-Stack Software Developer, UI/UX Designer, and Computer Science & Informatics undergraduate at Uva Wellassa University of Sri Lanka, specializing in Industrial Information Technology (IIT).",
          },
        },
        {
          "@type": "Question",
          name: "What technologies does Hirusha Suhan specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirusha specializes in Next.js, React, TypeScript, JavaScript, Python, Java, C, Node.js, Three.js (WebGL 3D graphics), Tailwind CSS, Cybersecurity, Cryptography, DevOps, Web3, and Event Graphic Branding.",
          },
        },
        {
          "@type": "Question",
          name: "What university does Hiru (Hirusha Suhan) attend?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirusha Suhan attends Uva Wellassa University of Sri Lanka, studying in the Department of Computer Science and Informatics (CSI), Faculty of Applied Sciences.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Hirusha Suhan for projects or hire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact Hirusha Suhan directly via email at hirushasuhan@outlook.com or through his GitHub (github.com/hirushasuhan), LinkedIn (linkedin.com/in/hirusha-suhan), and Linktree (linktr.ee/hirusha.suhan).",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href={asset("/icon-48.png")} />
        <link rel="icon" type="image/png" sizes="96x96" href={asset("/icon-96.png")} />
        <link rel="icon" type="image/png" sizes="192x192" href={asset("/icon-192.png")} />
        <link rel="icon" type="image/png" sizes="512x512" href={asset("/ICON.png")} />
        <link rel="apple-touch-icon" sizes="180x180" href={asset("/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/site.webmanifest")} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-black font-mono text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200",
          jetbrainsMono.variable
        )}
      >
        <SmoothScroll>
          <ScrollBridge />
          <StageLoader />
          <MatrixRain />
          <IntroOverlay />
          <ScrollProgress />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
