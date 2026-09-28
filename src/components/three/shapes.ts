import * as THREE from "three";
import type { SectionId } from "@/store/stage";

// Deterministic 0–1 noise (pure → safe with the React Compiler lint rules)
const rand = (i: number, seed = 0) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const TAU = Math.PI * 2;

/** About → "network globe": Fibonacci sphere shell + a few orbit bands */
function globe(count: number, r = 1.6) {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const band = rand(i, 1) < 0.2; // 20% of points form latitude rings
    let x: number, y: number, z: number;
    if (band) {
      const lat = (Math.floor(rand(i, 2) * 5) / 4 - 0.5) * 1.6;
      const a = rand(i, 3) * TAU;
      x = Math.cos(a) * Math.cos(lat); y = Math.sin(lat); z = Math.sin(a) * Math.cos(lat);
    } else {
      y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      x = Math.cos(theta) * radius; z = Math.sin(theta) * radius;
    }
    const k = r * (1 + (rand(i, 4) - 0.5) * 0.04);
    out.set([x * k, y * k, z * k], i * 3);
  }
  return out;
}

/** Projects → "data terrain": a wavy grid floor under the project cards */
function terrain(count: number, w = 10, d = 6) {
  const out = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt((count * w) / d));
  for (let i = 0; i < count; i++) {
    const x = ((i % cols) / cols - 0.5) * w;
    const z = (Math.floor(i / cols) / (count / cols) - 0.5) * d;
    const y = Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.35;
    out.set([x, y, z], i * 3);
  }
  return out;
}

/** Designs → "orbit ring": a thick particle ring around the 3D carousel */
function ring(count: number, r = 2.6) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = rand(i, 5) * TAU;
    const spread = (rand(i, 6) + rand(i, 7) - 1) * 0.35; // soft triangular falloff
    const rr = r + spread;
    out.set([Math.cos(a) * rr, (rand(i, 8) - 0.5) * 0.12, Math.sin(a) * rr], i * 3);
  }
  return out;
}

/** Contact → "signal": concentric broadcast rings facing the viewer */
function signal(count: number) {
  const out = new Float32Array(count * 3);
  const radii = [0.5, 1, 1.5, 2, 2.5];
  for (let i = 0; i < count; i++) {
    const r = radii[i % radii.length] + (rand(i, 9) - 0.5) * 0.06;
    const a = rand(i, 10) * TAU;
    out.set([Math.cos(a) * r, Math.sin(a) * r, (rand(i, 11) - 0.5) * 0.1], i * 3);
  }
  return out;
}

/**
 * Hero → "binary hologram" of the portrait.
 * Bright pixels become particles; brightness doubles as fake depth (z).
 * Uses THREE.ImageLoader so the load is tracked by THREE.DefaultLoadingManager.
 */
export async function samplePortrait(url: string, count: number, height = 3.4, depth = 0.8) {
  const img = await new THREE.ImageLoader().loadAsync(url);
  const W = 200;
  const H = Math.round((W * img.height) / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return globe(count);
  ctx.drawImage(img, 0, 0, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);

  const lum = new Float32Array(W * H);
  const candidates: number[] = [];
  for (let i = 0; i < W * H; i++) {
    const l = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
    lum[i] = l;
    if (l > 0.18) candidates.push(i); // the (normalised) dark studio background drops out here
  }
  if (candidates.length === 0) return globe(count);

  const out = new Float32Array(count * 3);
  const width = (height * W) / H;
  let n = 0;
  for (let guard = 0; n < count && guard < count * 30; guard++) {
    const idx = candidates[(Math.random() * candidates.length) | 0];
    const l = lum[idx];
    if (Math.random() > l * 1.3) continue; // brighter → denser
    const px = idx % W;
    const py = (idx / W) | 0;
    out[n * 3] = ((px + Math.random()) / W - 0.5) * width;
    out[n * 3 + 1] = -((py + Math.random()) / H - 0.5) * height;
    out[n * 3 + 2] = (l - 0.5) * depth;
    n++;
  }
  for (let i = n; i < count; i++) out.copyWithin(i * 3, (i % Math.max(n, 1)) * 3, (i % Math.max(n, 1)) * 3 + 3);
  return out;
}

export async function buildShapes(count: number, portraitUrl: string) {
  const shapes: Record<SectionId, Float32Array> = {
    hero: await samplePortrait(portraitUrl, count).catch(() => globe(count)),
    about: globe(count),
    projects: terrain(count),
    designs: ring(count),
    contact: signal(count),
  };
  return shapes;
}
