// Converts heavy PNG/JPG files in public/ to WebP next to the originals: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIR = "public";
const MAX_WIDTH = 1600;
const MIN_BYTES = 300 * 1024; // only touch files bigger than 300 KB

for (const name of await readdir(DIR)) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  const src = path.join(DIR, name);
  if ((await stat(src)).size < MIN_BYTES) continue;
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const info = await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
  console.log(`${name} → ${path.basename(out)} (${Math.round(info.size / 1024)} KB)`);
}
