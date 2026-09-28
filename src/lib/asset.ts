// Prefixes public/ paths with the GitHub Pages base path.
// next/image, <a href>, fetch() and three.js loaders do NOT add basePath for you.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return encodeURI(`${BASE_PATH}${clean}`); // handles "my photo/..." and "Hirusha suhan.pdf"
}
