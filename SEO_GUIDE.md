# SEO, AEO & GEO Guide — hirushasuhan.me

What the code already does, and the off-site steps that decide whether people actually find you.

**Setup:** Next.js 16 static export · hosted on **Vercel** · main URL **https://www.hirushasuhan.me**

---

## 1. What is built into the site

| Layer | Where | What it does |
| :--- | :--- | :--- |
| **SEO** | `src/app/layout.tsx` | Title, description, one canonical URL, Open Graph + Twitter cards (1200×630 image), `theme-color`, robots directives |
| **Structured data** | `src/lib/seo.ts` | JSON-LD graph: `Person` (aliases **Hiru**, **Hirusha**, **hirushasuhan**), `WebSite` (site name), `ProfilePage`, `ItemList` of your 7 projects, `FAQPage` |
| **AEO** (answer engines) | `src/components/sections/faq.tsx` | Six short, self-contained answers in real HTML (no JS needed), identical to the JSON-LD FAQ |
| **GEO** (AI search) | `src/app/robots.ts`, `public/llms.txt` | AI/search crawlers explicitly allowed; `llms.txt` is a plain-text fact sheet about you |
| **Crawling** | `src/app/sitemap.ts`, `src/app/robots.ts` | Generated at build time, so `lastmod` updates on every deploy |
| **Google icon** | `public/favicon.ico`, `icon-48/96/192.png`, `apple-touch-icon.png` | Bold logo-only mark (no tiny text), square, multiples of 48 px |
| **Security headers** | `vercel.json` | `nosniff`, `X-Frame-Options`, `Referrer-Policy` (these cannot be set with `<meta>`) |

**Keep in sync:** the project list inside `src/lib/seo.ts` mirrors `projects.tsx`. When you add a project, add it in both places.

---

## 2. Be realistic about "hiru" and "developer"

- **"hiru" alone** is not winnable. It is a common word in Sri Lanka (Hiru TV, Hiru FM, Hiru News) and those brands dominate it. What works: **"hirusha suhan"**, **"hiru suhan developer"**, **"hirushasuhan"**. The site now tells Google that *Hiru* is an alias of *Hirusha Suhan*.
- **"developer" alone** has millions of results. Realistic targets are long-tail: **"full-stack developer Sri Lanka"**, **"Next.js developer Sri Lanka"**, **"Uva Wellassa developer"**, **"Hirusha Suhan developer"**.
- Nobody can guarantee a ranking. Google decides. The list below is what moves it.

---

## 3. Do these once (this is what actually gets you found)

### A. Vercel
1. **Vercel → Project → Settings → Domains:** make `www.hirushasuhan.me` the primary domain, and set `hirushasuhan.me` to **redirect (308) to `www.hirushasuhan.me`**. Google must see one address only.
2. **Settings → Environment Variables** (used by `layout.tsx`, redeploy after adding):
   - `GOOGLE_SITE_VERIFICATION` = the token from Search Console (see B)
   - `BING_SITE_VERIFICATION` = the token from Bing Webmaster (see C)

### B. Google Search Console (most important)
1. Go to search.google.com/search-console → **Add property → Domain** `hirushasuhan.me` (verify with a DNS TXT record), or **URL prefix** `https://www.hirushasuhan.me/` (verify with the env var above).
2. **Sitemaps → add** `sitemap.xml`.
3. **URL Inspection →** paste `https://www.hirushasuhan.me/` → **Test live URL** → **Request indexing**.
4. Open `https://www.hirushasuhan.me/favicon.ico` in a browser. It must show your logo (200 OK, not a Vercel page).

### C. Bing Webmaster Tools (feeds Copilot and ChatGPT search)
1. bing.com/webmasters → **Import from Google Search Console** (one click).
2. Submit the sitemap. Optional: enable **IndexNow** for instant updates.

### D. Off-site links (the biggest ranking factor for a personal name)
Put `https://www.hirushasuhan.me` in the **website field** of, and use the exact name "Hirusha Suhan" on:
- GitHub profile (website field + a pinned README line)
- LinkedIn (Contact info → Website, and the headline)
- X / Twitter bio
- Linktree
- Your university or IEEE pages that mention you, and any project README (add "Built by [Hirusha Suhan](https://www.hirushasuhan.me)")

Use the same name, photo and one-line bio everywhere. Google matches these profiles to your `sameAs` links to confirm they are one person.

---

## 4. The Google search icon

Google is currently showing an old, cached icon (a triangle from the original Next.js template). The new icons are already in the site. Google refreshes favicons on its own schedule:

1. Deploy, then confirm `https://www.hirushasuhan.me/favicon.ico` shows the new logo.
2. Search Console → URL Inspection → **Request indexing** for the home page.
3. Wait. Favicon updates usually take **a few days to a few weeks**; you cannot force it faster.

Requirements Google checks (all met): one icon linked from the home page, square, at least 8 px and preferably a multiple of 48 px, stable URL, not blocked in robots.txt (`Googlebot-Favicons` is allowed), and the home page is indexable.

---

## 5. Checking your work

| Check | Tool |
| :--- | :--- |
| Structured data valid | search.google.com/test/rich-results → paste the URL |
| Schema.org validity | validator.schema.org |
| Social preview | opengraph.xyz, or paste the link into WhatsApp / LinkedIn |
| Speed / Core Web Vitals | pagespeed.web.dev (test the mobile score) |
| Indexed? | Search `site:hirushasuhan.me` on Google |
| AI answers | Ask ChatGPT / Perplexity / Gemini "Who is Hirusha Suhan?" after a few weeks |

> `llms.txt` is a low-cost bet: no major search engine has confirmed it uses the file, but some AI tools read it. The real GEO signals are the ones above: a crawlable site, clear facts on the page, consistent profiles, and links from other sites.

---

## 6. Optional next steps

- **Sinhala name:** if you also go by a Sinhala spelling of your name, add it to `alternateName` in `src/lib/seo.ts` and mention it once on the page. Sinhala searches then match too.
- **A blog or write-ups:** one honest article per project (what it does, the stack, what you learned) is the strongest way to rank for longer searches, and it feeds AI answers. Add each page to `sitemap.ts`.
- **Project case-study pages:** separate URLs like `/projects/unialloc` can rank on their own.
- **Update `dateModified`:** the sitemap and JSON-LD refresh on every deploy automatically.
