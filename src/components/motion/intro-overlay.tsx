"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useStage } from "@/store/stage";
import { useQualityTier } from "@/hooks/use-quality-tier";
import { asset } from "@/lib/asset";

const CRITICAL_ASSETS = [
  "/me.webp",
  "/serandib-grand.jpg",
  "/unialloc.jpg",
  "/visa consultation.webp",
  "/bus-management-system.webp",
  "/Expense-Tracker.webp",
  "/3d/portrait.webp",
  "/designs/design-1.webp",
  "/designs/slsywc-gala-night.webp",
  "/designs/slsywc-committee.webp",
  "/designs/ieeextreme-represent.webp",
];

const MAX_WAIT_MS = 3000; // failsafe timeout so the visitor is never blocked
const MIN_DISPLAY_MS = 800; // smooth minimum presentation time

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // never hang on failed asset load
    img.src = src;
  });
}

export function IntroOverlay() {
  const tier = useQualityTier();
  const sceneReady = useStage((s) => s.sceneReady);
  const [done, setDone] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING DECRYPTION PROTOCOL...");
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const startTimeRef = useRef(0);

  const totalAssets = CRITICAL_ASSETS.length + 1; // critical images + system fonts / 3d engine

  const count = useMotionValue(0);
  const label = useTransform(count, (v) => `${Math.round(v).toString().padStart(3, "0")}%`);
  const barWidth = useTransform(count, (v) => `${Math.min(Math.max(v, 0), 100)}%`);

  // Real-time asset preloading engine
  useEffect(() => {
    if (startTimeRef.current === 0) startTimeRef.current = Date.now();
    let mounted = true;
    let loaded = 0;

    const recordLoaded = (name: string) => {
      if (!mounted) return;
      loaded += 1;
      setLoadedCount(loaded);
      setStatusText(`DECODING ASSET: ${name}`);
    };

    // 1. Preload system & web fonts
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => recordLoaded("FONTS & TYPOGRAPHY"))
        .catch(() => recordLoaded("FONTS"));
    } else {
      recordLoaded("FONTS");
    }

    // 2. Preload all essential project and design image assets
    CRITICAL_ASSETS.forEach((path) => {
      preloadImage(asset(path)).then(() => {
        const fileName = path.split("/").pop() || "ASSET";
        recordLoaded(fileName);
      });
    });

    // 3. Failsafe timeout
    const failsafe = setTimeout(() => {
      if (mounted) {
        setStatusText("DECRYPTION COMPLETE // ALL SYSTEMS ONLINE");
        setDone(true);
      }
    }, MAX_WAIT_MS);

    return () => {
      mounted = false;
      clearTimeout(failsafe);
    };
  }, []);

  // Check when all assets are loaded & 3D scene is prepared
  useEffect(() => {
    const assetsReady = loadedCount >= totalAssets;
    const is3DReady = tier === "static" || sceneReady;

    if (assetsReady && is3DReady) {
      const elapsed = Date.now() - startTimeRef.current;
      const waitTime = Math.max(0, MIN_DISPLAY_MS - elapsed);

      const timer = setTimeout(() => {
        setStatusText("DECRYPTION COMPLETE // ACCESS GRANTED");
        setDone(true);
      }, waitTime);

      return () => clearTimeout(timer);
    }
  }, [loadedCount, totalAssets, tier, sceneReady]);

  // Synchronize progress counter and progress bar with real loading progress
  useEffect(() => {
    const target = done
      ? 100
      : Math.min(Math.round((loadedCount / totalAssets) * 92), 92);

    const controls = animate(count, target, {
      duration: done ? 0.35 : 0.6,
      ease: done ? "easeOut" : "linear",
    });

    return () => controls.stop();
  }, [loadedCount, totalAssets, done, count]);

  // Lock and unlock smooth scrolling
  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  return (
    <AnimatePresence onExitComplete={() => useStage.setState({ introDone: true })}>
      {!done && (
        <motion.div
          key="intro"
          className="animate-intro-failsafe fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono select-none px-4"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm">
            {/* Decrypting Status Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <p className="text-[11px] sm:text-xs tracking-[0.35em] text-cyan-400/80 font-semibold uppercase">
                DECRYPTING&nbsp;PORTFOLIO
              </p>
            </div>

            {/* Glowing Cyberpunk Loading Bar (Placed Above Percentage) */}
            <div className="relative w-full h-2 rounded-full bg-white/10 p-[1px] border border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300 relative shadow-[0_0_12px_rgba(6,182,212,0.9)]"
                style={{ width: barWidth }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 blur-[1px] rounded-full" />
              </motion.div>
            </div>

            {/* Monospace Percentage Display */}
            <motion.p className="mt-4 text-4xl sm:text-5xl font-bold tabular-nums text-white tracking-tight">
              {label}
            </motion.p>

            {/* Real-time Decryption / Preloading Status */}
            <p className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-400/60 uppercase text-center line-clamp-1">
              {statusText}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
