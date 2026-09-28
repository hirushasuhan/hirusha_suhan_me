"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>; // native scrolling for reduced-motion users

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // lower = floatier. 0.08–0.12 feels premium without lag
        wheelMultiplier: 0.9,
        anchors: { offset: -96 }, // #projects links land below the floating navbar
      }}
    >
      {children}
    </ReactLenis>
  );
}
