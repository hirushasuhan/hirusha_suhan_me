import type { NextConfig } from "next";

// Set by the GitHub Actions workflow from actions/configure-pages → "/hirusha_suhan_me"
// (empty string locally, and empty if you later add a custom domain)
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // read by src/lib/asset.ts
};

export default nextConfig;
