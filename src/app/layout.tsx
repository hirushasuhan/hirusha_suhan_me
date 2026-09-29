import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { SITE_URL, SITE_NAME, TITLE, DESCRIPTION, OG_IMAGE, buildJsonLd } from "@/lib/seo";
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

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  // Google ignores meta keywords; Bing and some AI crawlers still read them.
  keywords: [
    "Hirusha Suhan",
    "Hiru",
    "Hirusha",
    "Hiru developer",
    "Hirusha Suhan developer",
    "Full-Stack Developer Sri Lanka",
    "Software Engineer Sri Lanka",
    "Web Developer Sri Lanka",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "Graphic Designer Sri Lanka",
    "Uva Wellassa University",
    "Computer Science and Informatics",
    "Three.js portfolio",
    "hirushasuhan.me",
  ],
  // Favicon set: crawled by Googlebot-Favicons. Google wants a square icon whose
  // size is a multiple of 48px, at a stable URL, linked from the home page.
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/icon-48.png"), sizes: "48x48", type: "image/png" },
      { url: asset("/icon-96.png"), sizes: "96x96", type: "image/png" },
      { url: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    shortcut: asset("/favicon.ico"),
    apple: [{ url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  manifest: asset("/site.webmanifest"),
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "profile",
    firstName: "Hirusha",
    lastName: "Suhan",
    username: "hirushasuhan",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: `${SITE_NAME} Portfolio`,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hirusha Suhan — Full-Stack Developer & Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@hirusha_suhan",
    site: "@hirusha_suhan",
    images: [{ url: OG_IMAGE, alt: "Hirusha Suhan — Full-Stack Developer & Designer" }],
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
  // Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in Vercel → Environment Variables
  // (only the token string, not the whole tag). Omitted from the HTML when unset.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION || "BC62B9DB55CF01F2AC402703F2035573" },
  },
  other: { "geo.region": "LK", "geo.placename": "Sri Lanka" },
};

// "<" is escaped so the JSON can never close the <script> tag.
const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Security headers (nosniff, X-Frame-Options…) cannot be set with <meta>; they live in vercel.json */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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
