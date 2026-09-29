# SEO, AEO & GEO Checklist for Next.js Developer Portfolios

## 1. Google Search Console & Schema Standards
- **FAQPage Schema (`src/lib/seo.ts`):**
  - Every Q&A pair must match the human-visible text rendered by `src/components/sections/faq.tsx`.
  - Answers must be concise, factual, and informative (optimal for Answer Engine scraping by Perplexity, ChatGPT, and Google AI Overviews).
- **Person & ProfilePage Schema:**
  - `name`: Full professional name and aliases.
  - `jobTitle`: Developer and engineering specializations.
  - `alumniOf`: University and educational credentials.
  - `sameAs`: High-authority social and professional links (LinkedIn, GitHub, X).
  - `knowsAbout`: Core programming languages, software patterns, and technologies.

## 2. Dynamic Route Handlers
- **`robots.ts`:**
  - Allow major crawlers: Googlebot, Bingbot, PerplexityBot, Applebot, GPTBot.
  - Explicitly reference dynamic sitemap URL: `https://www.hirushasuhan.me/sitemap.xml`.
- **`sitemap.ts`:**
  - Dynamic generation of all indexed routes (`/`).
  - Maintain `lastModified`, `changeFrequency: "weekly"`, and `priority: 1.0`.

## 3. Generative Engine Optimization (GEO) & `llms.txt`
- Maintain `public/llms.txt` with markdown headers:
  - Developer identity & background summary.
  - Core technical competencies (Languages, Frameworks, Architecture, DevOps).
  - Key projects with GitHub repository links and live URLs.
  - Authoritative links (Canonical portfolio, GitHub, LinkedIn, X).

## 4. Brand Previews & OpenGraph
- Standard Favicons: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`.
- High-res icons: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.
- Web manifest: `site.webmanifest` with theme colors and icon declarations.
- OpenGraph: `og-image.jpg` (1200x630px) referenced in Next.js `metadata.openGraph`.
