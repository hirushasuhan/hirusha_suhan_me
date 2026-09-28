"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { asset } from "@/lib/asset";
import { useStage } from "@/store/stage";

export interface OrbitItem {
  id: number;
  title: string;
  image: string; // public path, e.g. "/design 1.webp"
  link: string;
}

/** CSS-3D cylinder carousel: auto-rotates, speeds up with scroll velocity, drag to spin. */
export function OrbitCarousel({ items }: { items: OrbitItem[] }) {
  const reduce = useReducedMotion();
  const rotation = useMotionValue(0);
  const paused = useRef(false);
  const dragged = useRef(false);
  const step = 360 / items.length;

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const boost = Math.min(Math.abs(useStage.getState().velocity), 40) / 8;
    rotation.set(rotation.get() - delta * 0.008 * (1 + boost));
  });

  const preventClickAfterDrag = (e: MouseEvent) => {
    if (dragged.current) e.preventDefault();
  };

  if (reduce) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {items.map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer"
             className="relative block aspect-square overflow-hidden rounded-xl bg-white/5">
            <Image src={asset(item.image)} alt={item.title} fill sizes="240px" className="object-cover" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative h-[360px] w-full select-none [--r:220px] [perspective:1400px] sm:[--r:300px] md:h-[460px] md:[--r:420px]"
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 cursor-grab touch-pan-y [transform-style:preserve-3d] active:cursor-grabbing"
        style={{ rotateY: rotation }}
        onPanStart={() => { dragged.current = true; }}
        onPan={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.3)}
        onPanEnd={() => { setTimeout(() => { dragged.current = false; }, 50); }}
      >
        {items.map((item, i) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            onClick={preventClickAfterDrag}
            className="group absolute left-0 top-0 block aspect-square w-[200px] overflow-hidden rounded-xl border border-white/10 bg-white/5 [backface-visibility:hidden] md:w-[260px]"
            style={{ transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(var(--r))` }}
          >
            <Image
              src={asset(item.image)}
              alt={item.title}
              fill
              sizes="260px"
              draggable={false}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ExternalLink className="h-5 w-5 text-cyan-400" /> View
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
