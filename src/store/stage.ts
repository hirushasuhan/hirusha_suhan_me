import { create } from "zustand";

export const SECTIONS = ["hero", "about", "projects", "designs", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];
export type QualityTier = "full" | "lite" | "static";

interface StageState {
  progress: number; // 0 → 1 over the whole page
  velocity: number; // Lenis scroll velocity (px/frame, signed)
  section: SectionId; // section currently crossing the viewport centre
  pointer: { x: number; y: number }; // -1 → 1, y up
  sceneReady: boolean; // particles built, safe to reveal
  introDone: boolean; // preloader finished → hero choreography may play
}

// Read with useStage.getState() inside useFrame / rAF loops (no re-render).
// Subscribe with useStage((s) => s.x) only in DOM components that must re-render.
export const useStage = create<StageState>(() => ({
  progress: 0,
  velocity: 0,
  section: "hero",
  pointer: { x: 99, y: 99 },
  sceneReady: false,
  introDone: false,
}));
