"use client";

import { useSyncExternalStore } from "react";
import type { QualityTier } from "@/store/stage";

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function detectTier(): QualityTier {
  if (typeof window === "undefined") return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return "static";

  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl2");
  if (!gl) return "static";
  gl.getExtension("WEBGL_lose_context")?.loseContext(); // free the probe context

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4; // Chromium only; others default to 4
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (coarse || cores <= 4 || memory <= 4) return "lite";
  return "full";
}

let cached: QualityTier | null = null;

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => {
    cached = null;
    onChange();
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

const getSnapshot = () => (cached ??= detectTier());
const getServerSnapshot = () => null; // static export: no tier at build time

/** null during SSR/first paint, then "full" | "lite" | "static". */
export function useQualityTier() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
