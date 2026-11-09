import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | Hirusha Suhan",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-md space-y-6">
        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          404 Error
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-mono">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-400 sm:text-base leading-relaxed">
          The page or resource you were looking for doesn&apos;t exist, has been moved, or was removed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link href="/#projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
