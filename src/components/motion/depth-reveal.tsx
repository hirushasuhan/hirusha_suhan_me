"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll-linked 3D entrance: the element rises out of the Z axis and
 * "stands up" (rotateX 28° → 0°) as it scrolls into view. Scrubbed, not triggered,
 * so scrolling back up reverses it.
 */
export function DepthReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const rotateX = useTransform(p, [0, 1], [28, 0]);
  const z = useTransform(p, [0, 1], [-240, 0]);
  const y = useTransform(p, [0, 1], [80, 0]);
  const opacity = useTransform(p, [0, 0.6], [0, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        className="h-full"
        style={reduce ? undefined : { rotateX, z, y, opacity, transformOrigin: "50% 100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
