// One-off asset prep for the particle hologram: node scripts/make-portrait.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/my photo/Man_in_dark_studio_portrait_2K_20260928210937.jpg"; // 2752×1536
const OUT = "public/3d/portrait.webp";

await mkdir("public/3d", { recursive: true });

await sharp(SRC)
  .extract({ left: 686, top: 0, width: 1380, height: 1536 }) // centre crop around the face
  .resize({ width: 360 })  // particles only need ~200px of detail
  .grayscale()
  .normalise()             // stretch dark skin / hair into a usable brightness range
  .modulate({ brightness: 1.15 })
  .webp({ quality: 80 })
  .toFile(OUT);

console.log("wrote", OUT);

