"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Grid as GridIcon,
  X,
  Sparkles,
} from "lucide-react";
import { asset } from "@/lib/asset";
import { TiltCard } from "@/components/motion/tilt-card";

export interface DesignProject {
  id: number;
  title: string;
  subtitle: string;
  organization: string;
  category: string;
  image: string;
  link: string;
  aspect?: string;
}

interface DesignShowcaseProps {
  designs: DesignProject[];
}

export function DesignShowcase({ designs }: DesignShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduce = useReducedMotion();

  const activeDesign = designs[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : designs.length - 1));
  }, [designs.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < designs.length - 1 ? prev + 1 : 0));
  }, [designs.length]);

  // Auto-rotate loop (cycles slowly through designs; pauses on hover or lightbox)
  useEffect(() => {
    if (reduce || viewMode !== "deck" || isHovered || lightboxIndex !== null) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < designs.length - 1 ? prev + 1 : 0));
    }, 3200);

    return () => clearInterval(interval);
  }, [reduce, viewMode, isHovered, lightboxIndex, designs.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : designs.length - 1) : null
          );
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null ? (prev < designs.length - 1 ? prev + 1 : 0) : null
          );
        }
      } else if (viewMode === "deck") {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, viewMode, handlePrev, handleNext, designs.length]);

  return (
    <div className="w-full">
      {/* View Switcher Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>3D SHOWCASE</span>
          </div>

          {viewMode === "deck" && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] border backdrop-blur-md transition-all ${
                isHovered
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isHovered ? "bg-amber-400" : "bg-cyan-400 animate-ping"
                }`}
              />
              {isHovered ? "PAUSED (HOVER)" : "AUTO-ROTATING"}
            </span>
          )}
        </div>

        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setViewMode("deck")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "deck"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            3D Stage
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "grid"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <GridIcon className="h-3.5 w-3.5" />
            Grid View
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: 3D INTERACTIVE STAGE DECK */}
      {viewMode === "deck" && (
        <div
          className="relative select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Main 3D Card Stage */}
          <div className="relative mx-auto flex h-[400px] w-full max-w-4xl items-center justify-center [perspective:1200px] sm:h-[460px] md:h-[500px]">
            {designs.map((design, index) => {
              // Continuous circular offset relative to active card (-2, -1, 0, 1, 2)
              const total = designs.length;
              let circularOffset = index - activeIndex;
              while (circularOffset > total / 2) circularOffset -= total;
              while (circularOffset < -total / 2) circularOffset += total;

              const absOffset = Math.abs(circularOffset);
              const isActive = circularOffset === 0;
              const isFrontNeighbor = absOffset === 1;

              // 3D positioning calculation on a smooth circular orbit
              const xTranslation = circularOffset * 220;
              const zTranslation = isActive ? 0 : isFrontNeighbor ? -130 : -320;
              const rotateY = circularOffset * -18;
              const scale = isActive ? 1 : isFrontNeighbor ? 0.86 : 0.65;
              const opacity = isActive ? 1 : isFrontNeighbor ? 0.75 : 0;
              const zIndex = isActive ? 30 : isFrontNeighbor ? 20 : 5;

              return (
                <motion.div
                  key={design.id}
                  onClick={() => {
                    if (isActive) {
                      setLightboxIndex(index);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  animate={
                    reduce
                      ? { opacity: isActive ? 1 : 0.4 }
                      : {
                          x: xTranslation,
                          z: zTranslation,
                          rotateY: rotateY,
                          scale: scale,
                          opacity: opacity,
                          y: isActive && !isHovered ? [0, -6, 0] : 0,
                        }
                  }
                  transition={{
                    x: { type: "spring", stiffness: 260, damping: 24 },
                    z: { type: "spring", stiffness: 260, damping: 24 },
                    rotateY: { type: "spring", stiffness: 260, damping: 24 },
                    scale: { type: "spring", stiffness: 260, damping: 24 },
                    opacity: { duration: 0.35 },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                    pointerEvents: opacity === 0 ? "none" : "auto",
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer transition-shadow duration-300 ${
                    isActive
                      ? "ring-2 ring-cyan-500/80 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.4)]"
                      : "hover:ring-1 hover:ring-white/40 shadow-2xl"
                  } overflow-hidden rounded-2xl border border-white/15 bg-black/80 aspect-square w-[280px] sm:w-[340px] md:w-[380px]`}
                >
                  <Image
                    src={asset(design.image)}
                    alt={design.title}
                    fill
                    sizes="(max-width: 768px) 280px, 380px"
                    priority={isActive}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Active Card Badges & Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity duration-300">
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full border border-cyan-500/40 bg-black/60 px-3 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
                        {design.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                      <div className="max-w-[75%]">
                        <p className="text-xs text-cyan-400 font-mono line-clamp-1">{design.organization}</p>
                        <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1">{design.title}</h4>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex(index);
                        }}
                        className="rounded-full bg-cyan-500/20 p-2.5 text-cyan-300 backdrop-blur-md transition-all hover:bg-cyan-500 hover:text-black hover:scale-110"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls: Arrows & Metadata Card */}
          <div className="mt-6 flex flex-col items-center gap-6">
            {/* Active Project Details Card */}
            <motion.div
              key={activeDesign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                  {activeDesign.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-mono text-gray-400">
                  {activeDesign.organization}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">{activeDesign.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{activeDesign.subtitle}</p>

              <div className="mt-5 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeIndex)}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-6 py-2.5 text-xs font-semibold text-cyan-300 backdrop-blur-md transition-all hover:bg-cyan-500 hover:text-black hover:scale-105"
                >
                  <Maximize2 className="h-4 w-4" />
                  View High-Res Artwork
                </button>
              </div>
            </motion.div>

            {/* Navigation Arrows & Counter */}
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Design"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <span className="font-mono text-xs tracking-wider text-gray-400">
                <span className="text-cyan-400 font-semibold">{activeIndex + 1}</span>
                <span className="mx-1 text-gray-600">/</span>
                <span>{designs.length}</span>
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Design"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: BENTO GRID WITH 3D TILT */}
      {viewMode === "grid" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((design, index) => (
            <TiltCard key={design.id} maxTilt={8} className="h-full">
              <div
                onClick={() => setLightboxIndex(index)}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer transition-all hover:border-cyan-500/50"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                  <Image
                    src={asset(design.image)}
                    alt={design.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute top-3 left-3 rounded-full border border-cyan-500/40 bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
                    {design.category}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-bold text-black shadow-lg shadow-cyan-500/30">
                      <Maximize2 className="h-3.5 w-3.5" /> View Project
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-mono text-cyan-400">{design.organization}</p>
                  <h4 className="mt-1 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {design.title}
                  </h4>
                  <p className="mt-1 flex-1 text-sm text-gray-400">{design.subtitle}</p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <span className="font-mono text-cyan-400/80">View Fullscreen Artwork</span>
                    <Maximize2 className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/95 shadow-2xl md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Lightbox Image Preview */}
              <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[300px] sm:min-h-[420px]">
                <Image
                  src={asset(designs[lightboxIndex].image)}
                  alt={designs[lightboxIndex].title}
                  fill
                  priority
                  className="object-contain p-2"
                />
              </div>

              {/* Lightbox Sidebar Info */}
              <div className="flex w-full flex-col justify-between border-t border-white/10 p-6 md:w-[320px] md:border-t-0 md:border-l">
                <div>
                  <span className="inline-block rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                    {designs[lightboxIndex].category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-white">
                    {designs[lightboxIndex].title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-cyan-400">
                    {designs[lightboxIndex].organization}
                  </p>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                    {designs[lightboxIndex].subtitle}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>
                      {lightboxIndex + 1} of {designs.length}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex((prev) =>
                            prev !== null ? (prev > 0 ? prev - 1 : designs.length - 1) : null
                          )
                        }
                        className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex((prev) =>
                            prev !== null ? (prev < designs.length - 1 ? prev + 1 : 0) : null
                          )
                        }
                        className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
