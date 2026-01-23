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
