---
name: portfolio-release-seo
description: >-
  Audits, synchronizes, and releases Next.js developer portfolios with advanced
  SEO/AEO/GEO standards, strict SemVer tagging, build verification, and safe
  deployment workflows.
---

# Portfolio Release & SEO Manager

## Overview

This skill guides the end-to-end lifecycle for maintaining, optimizing, and releasing a modern Next.js developer portfolio. It ensures the site adheres to cutting-edge SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) standards, maintains 100% parity between visible frontend content and JSON-LD schemas, performs pre-flight build checks, and executes safe, tagged Git releases.

## Dependencies

- **Node.js & Next.js** (App Router with Turbopack)
- **Git** (CLI with remote configured)
- Standard developer tools: `npm run build`, `git status`, `git diff`, `git push`

## Quick Start

When the user asks to prepare an update, audit the site, or release a new version:

1. **Audit & Sync:** Verify that `src/lib/seo.ts` (JSON-LD + FAQs) matches `src/components/sections/faq.tsx` and on-page copy.
2. **Review Tone:** Ensure all descriptions highlight engineering capabilities, architectures, and institutional affiliations rather than simple project lists.
3. **Verify Build:** Run `npm run build` to confirm zero TypeScript or bundling errors.
4. **SemVer & Tag:** Bump version in `package.json`, stage changes, commit with structured release notes, and create an annotated tag `vX.Y.Z`.
5. **Safety Gate:** Summarize changes and ask for explicit user confirmation before running `git push origin <branch> --follow-tags`.

---

## Workflow

### 1. SEO, AEO & GEO Synchronization Audit
- **JSON-LD Schema & FAQ Parity:** Google's structured data guidelines strictly require that schema data (especially `FAQPage`) matches visible frontend content. Any change to `FAQS` in `src/lib/seo.ts` must be mirrored or consumed directly by `src/components/sections/faq.tsx`.
- **Dynamic Route Handlers:** Ensure Next.js App Router dynamic route handlers exist and function properly:
  - `src/app/robots.ts` (defines user agents, allow/disallow paths, sitemap link).
  - `src/app/sitemap.ts` (generates valid XML sitemap with last-modified timestamps and priorities).
- **LLM Context (`public/llms.txt`):** Ensure `llms.txt` accurately specifies developer aliases, core technologies, links, and project descriptions for AI crawlers (Perplexity, ChatGPT, Claude).
- **Favicons & OpenGraph Assets:** Verify metadata icons in `layout.tsx` reference `icon-512.png`, `apple-touch-icon.png`, and `og-image.jpg` with high-resolution assets to prevent search engines from showing default hosting provider logos.

### 2. Copywriting & Capability Standards
- **Professional Persona:** Frame technical experience around capabilities, engineering architectures, and domains (e.g. full-stack platforms, low-level systems, 3D WebGL experiences, RESTful APIs, relational databases).
- **Avoid Self-Referential Phrasing:** Never refer to the portfolio itself in third-person answers (e.g. avoid *"This portfolio itself uses..."*). Present technologies (Three.js, WebGL, Framer Motion) as core capabilities of the engineer.
- **Institutional Affiliations:** Accurately represent university chapters and organizations (e.g., *IEEE Computer Society Uva Wellassa University Student Branch Chapter*).

### 3. Pre-Flight Build Verification
Always run the Next.js production build before staging any release:
```bash
npm run build
```
- **Error Handling:** If minor TypeScript or ESLint issues are detected, attempt automatic resolution. If deep architectural errors occur, halt execution immediately and present diagnostic details to the user.
- **Route Validation:** Ensure all routes (e.g., `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`) prerender successfully.

### 4. SemVer Release & Tagging
1. **Determine SemVer Increment:**
   - `patch` (e.g. `1.1.0` -> `1.1.1`): Bug fixes, copy edits, SEO refinements.
   - `minor` (e.g. `1.1.0` -> `1.2.0`): New sections, major features, design overhauls.
   - `major` (e.g. `1.0.0` -> `2.0.0`): Complete redesign or breaking architectural rewrites.
2. **Update `package.json`:** Set the `"version"` field accordingly.
3. **Stage & Commit:**
   ```bash
   git add -A
   git commit -m "Release vX.Y.Z: <Clear summary of changes>"
   ```
4. **Create Annotated Tag:**
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z: <Release highlights>"
   ```

### 5. Deployment Safety Gate
> [!IMPORTANT]
> **NEVER push to remote repository without explicit user approval.**
1. Display the staged commit message, the tag (`vX.Y.Z`), and a summary of all modified/created files.
2. Request confirmation from the user (e.g., *"Are you ready to push vX.Y.Z to GitHub?"*).
3. Upon receiving user confirmation, execute:
   ```bash
   git push origin <branch> --follow-tags
   ```
4. Run `git status` to verify the working tree is clean and up to date with remote tracking.

---

## Common Mistakes

1. **Unsynchronized FAQ & Schema:** Updating the visible FAQ text without updating the JSON-LD schema (or vice versa), which causes Google Search Console structured data penalties.
2. **Pushing Without Confirmation:** Pushing untested code or unconfirmed tags directly to `master`/`main`, triggering accidental Vercel / GitHub Actions builds.
3. **Omitting `--follow-tags`:** Running `git push origin master` without `--follow-tags`, resulting in commits being pushed while the release tag remains only on the local machine.
4. **Casual / Project-Dumping Bio Copy:** Listing every minor school assignment instead of presenting high-impact software engineering competencies and architectural strengths.
