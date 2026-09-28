"use client";

import type { ReactNode, PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 180, damping: 18, mass: 0.4 };

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees
  glow?: string; // spotlight colour
}

/** 3D hover tilt + cursor spotlight. No React re-renders: everything is motion values. */
export function TiltCard({ children, className, maxTilt = 8, glow = "rgba(6,182,212,0.18)" }: TiltCardProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5); // 0 → 1 across the card
  const py = useMotionValue(0.5);
  const hover = useSpring(0, SPRING);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, ${glow}, transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // no tilt on touch
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        onPointerMove={onMove}
        onPointerEnter={() => hover.set(1)}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative h-full rounded-xl will-change-transform", className)}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background: spotlight, opacity: hover }}
        />
        {children}
      </motion.div>
    </div>
  );
}
