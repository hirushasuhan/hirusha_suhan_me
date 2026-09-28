"use client";

import dynamic from "next/dynamic";
import { useQualityTier } from "@/hooks/use-quality-tier";

// ssr:false is only allowed inside a Client Component in the App Router.
// This also keeps three.js (~600 KB) out of the first-load bundle.
const Experience = dynamic(() => import("./experience"), { ssr: false });

export function StageLoader() {
  const tier = useQualityTier();
  if (tier === null || tier === "static") return null; // static tier = today's 2D site

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Experience tier={tier} />
    </div>
  );
}
