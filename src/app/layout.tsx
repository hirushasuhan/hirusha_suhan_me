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

export const metadata: Metadata = {
  metadataBase: new URL("https://hirushasuhan.github.io/hirusha_suhan_me"),
  title: "Hirusha Suhan | Full-Stack Developer & Designer",
  description: "Portfolio of Hirusha Suhan - Computer Science & Informatics Undergraduate, Designer & Tech Enthusiast.",
  icons: {
    icon: asset("/ICON.png"),
    shortcut: asset("/ICON.png"),
    apple: asset("/ICON.png"),
  },
  keywords: [
    "Hirusha Suhan", "Full-Stack Developer", "Designer", "Tech Enthusiast", "Computer Science", "Informatics", "Industrial Information Technology", "Portfolio", "Web Developer", "React", "Next.js", "Graphic Design", "Sri Lanka", "Projects", "Contact", "UI/UX", "JavaScript", "TypeScript", "Java", "Python", "C", "Uva Wellassa University"
  ],
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Hirusha Suhan | Full-Stack Developer & Designer",
    description: "Portfolio of Hirusha Suhan - Computer Science & Informatics Undergraduate, Designer & Tech Enthusiast.",
    url: "https://hirushasuhan.github.io/hirusha_suhan_me/",
    siteName: "Hirusha Suhan Portfolio",
    images: [
      {
        url: "/ICON.png",
        width: 512,
        height: 512,
        alt: "Hirusha Suhan Portfolio Icon"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hirusha Suhan | Full-Stack Developer & Designer",
    description: "Portfolio of Hirusha Suhan - Computer Science & Informatics Undergraduate, Designer & Tech Enthusiast.",
    creator: "@hirusha_suhan",
    images: ["/ICON.png"]
  },
  alternates: {
    canonical: "https://hirushasuhan.github.io/hirusha_suhan_me/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  other: {
    'geo.region': 'LK',
    'geo.placename': 'Sri Lanka',
    'author': 'Hirusha Suhan',
    'publisher': 'Hirusha Suhan',
    'application-name': 'Hirusha Suhan Portfolio',
    'msapplication-TileColor': '#0ff',
    'theme-color': '#000000',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
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
