import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hirushasuhan.github.io/hirusha_suhan_me"),
  title: "Hirusha Suhan | Frontend Developer & Designer",
  description: "Portfolio of Hirusha Suhan - Frontend Developer, Designer & Tech Researcher.",
  icons: {
    icon: "/ICON.png",
    shortcut: "/ICON.png",
    apple: "/ICON.png",
  },
  keywords: [
    "Hirusha Suhan", "Frontend Developer", "Designer", "Tech Researcher", "Portfolio", "Web Developer", "React", "Next.js", "Graphic Design", "Sri Lanka", "Projects", "Contact", "UI/UX", "JavaScript", "TypeScript"
  ],
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Hirusha Suhan | Frontend Developer & Designer",
    description: "Portfolio of Hirusha Suhan - Frontend Developer, Designer & Tech Researcher.",
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
    title: "Hirusha Suhan | Frontend Developer & Designer",
    description: "Portfolio of Hirusha Suhan - Frontend Developer, Designer & Tech Researcher.",
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
  // Region & Publisher metadata
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

import { Navbar } from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-black font-mono text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200",
          jetbrainsMono.variable
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
