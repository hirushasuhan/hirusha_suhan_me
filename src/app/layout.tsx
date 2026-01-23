import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Hirusha Suhan | Frontend Developer & Designer",
  description: "Portfolio of Hirusha Suhan - Frontend Developer, Designer & Tech Researcher.",
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
          "min-h-screen bg-black font-sans text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200",
          anonymousPro.variable
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
