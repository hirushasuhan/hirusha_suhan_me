import type { SectionId } from "@/store/stage";

type Vec3 = [number, number, number];

export interface Keyframe {
  cam: Vec3; // camera position
  look: Vec3; // camera target
  obj: Vec3; // hologram position
  tilt: number; // hologram X rotation (radians)
  spin: number; // idle Y spin (radians / second, 0 = face the viewer)
  scale: number;
  opacity: number; // keep text readable: lower where content is dense
}

// Desktop: text sits LEFT in the hero, hologram RIGHT.
export const KEYFRAMES: Record<SectionId, Keyframe> = {
  hero:     { cam: [0, 0, 6],     look: [0, 0, 0],     obj: [1.8, -0.1, 0], tilt: 0,    spin: 0,    scale: 1,   opacity: 1 },
  about:    { cam: [0, 0.4, 6.5], look: [0, 0, 0],     obj: [0, 0, -2],     tilt: 0.25, spin: 0.15, scale: 1.3, opacity: 0.55 },
  projects: { cam: [0, 1.2, 6],   look: [0, -1, -2],   obj: [0, -2, -1],    tilt: 0,    spin: 0,    scale: 1,   opacity: 0.8 },
  designs:  { cam: [0, 0.6, 6],   look: [0, 0, 0],     obj: [0, 0, -1.5],   tilt: 1.15, spin: 0.25, scale: 1,   opacity: 0.8 },
  contact:  { cam: [0, 0, 5],     look: [0, 0, 0],     obj: [0, 0.2, -0.5], tilt: 0,    spin: 0,    scale: 0.7, opacity: 1 },
};

// Portrait phones: hologram sits prominently at the top, details sit underneath.
export const KEYFRAMES_MOBILE: Record<SectionId, Keyframe> = {
  hero:     { ...KEYFRAMES.hero,     cam: [0, 0, 7.2], look: [0, 0, 0], obj: [0, 0.85, 0], scale: 0.75, opacity: 1 },
  about:    { ...KEYFRAMES.about,    cam: [0, 0.4, 8],  scale: 1,   opacity: 0.4 },
  projects: { ...KEYFRAMES.projects, cam: [0, 1.2, 8],  opacity: 0.4 },
  designs:  { ...KEYFRAMES.designs,  cam: [0, 0.6, 8],  scale: 0.8, opacity: 0.5 },
  contact:  { ...KEYFRAMES.contact,  cam: [0, 0, 7],    scale: 0.6, opacity: 0.8 },
};
