import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "Hirusha Suhan | Frontend Developer & Designer",
    description: "Portfolio of Hirusha Suhan - Frontend Developer, Designer & Tech Researcher.",
    url: "https://your-portfolio-url.com/",
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
    canonical: "https://your-portfolio-url.com/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1
    }
  },
  // GEO & AEO (example, adjust as needed)
  other: {
    'geo.region': 'LK', // Sri Lanka
    'geo.placename': 'Colombo',
    'geo.position': '6.9271;79.8612',
    'ICBM': '6.9271, 79.8612',
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
