# ⚡ Hirusha Suhan — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Framer_Motion-12.28-purple?style=flat&logo=framer)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A cyber-themed, modern developer portfolio built for **Hirusha Suhan** — Frontend Developer, Designer & Tech Researcher. Crafted with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

---

## 🌐 Live Preview & Deployment
- **Live Site**: [https://hirushasuhan.github.io/hirusha_suhan_me/](https://hirushasuhan.github.io/hirusha_suhan_me/)
- **Deployment**: Automated via GitHub Pages with GitHub Actions CI/CD (`.github/workflows/deploy.yml`) on `main` and `master` branch pushes.

---

## 🎨 Tech Stack & Architecture

- **Framework**: [Next.js 16.3.6](https://nextjs.org/) (Static HTML Export `output: 'export'`)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss`
- **Typography**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `next/font/google`
- **Animations & Motion**: [Framer Motion v12](https://motion.dev/) + Canvas 2D Matrix Rain
- **Icons**: [Lucide React](https://lucide.dev/)
- **Security & Optimization**: Zero dependency vulnerabilities (`npm audit`), WebP/PNG optimized assets, custom security meta policies.

---

## ✨ Features & Sections

- 🟢 **Matrix Rain Background**: Cyberpunk binary code rain rendered using performant Canvas 2D animations.
- 🛸 **Glassmorphic Floating Navbar**: Auto-hides on downward scroll, springs back on upward scroll or top hover.
- 💻 **Interactive Hero**: Dynamic parallax blobs, custom avatar with spinning gradient borders, and direct CV download.
- 🛠️ **Skills & Tech Stack**: Interactive cards highlighting Frontend Development, Graphic Design, and Tech Research.
- 🚀 **Featured Projects**: Showcase cards with direct GitHub repository links and live interactive demos.
- 🎨 **Design Portfolio**: Infinite marquee carousel showcasing graphic design assets with view-only links.
- 📬 **Connect Terminal**: Direct email action and social icons with tooltip animations.

---

## 🎬 Motion Design System & Animation Flow

The complete architectural research, animation flow diagrams, and copy-paste component recipes are documented in:

👉 **[Read the Motion Design System Guide (ANIMATION_GUIDE.md)](./ANIMATION_GUIDE.md)**

### Key Motion Components Included:
- **Smooth Scroll Engine**: Integration guide with [Lenis](https://lenis.darkroom.engineering/).
- **Cyberpunk Text Scramble / Decryptor**: Terminal text decoding animation on page load.
- **3D Tilt & Cursor Spotlight**: Interactive project cards with perspective hover physics and specular lighting.
- **Magnetic Buttons**: Spring physics attracting interactive buttons to the cursor.
- **Laser Scroll Progress**: Top cyan neon laser tracking reading depth.

---

## 📸 Media & 3D Assets (`public/my photo/`)

High-resolution portrait assets uploaded for 3D interactions, depth displacement, and avatar animations:

| Asset Name | Resolution / Type | Recommended 3D & Motion Use Case |
| :--- | :--- | :--- |
| **`Man_in_dark_studio_portrait_2K_20260928210937.jpg`** | 2K Dark Studio Portrait | **Primary 3D Hero Avatar**: Seamless black background blends natively into the `#000000` canvas. Ideal for Three.js depth-map displacement, 3D holographic tilt, or glowing cyber orbital rings. |
| **`Hirusha_suhan_designTeam.png`** | High-Res Office / Workstation | **About Section / 3D Bento Card**: Perfect for the developer/designer story section or an interactive 3D perspective flip card showing the developer in the workstation environment. |
| **`WhatsApp Image 2026-01-22 at 13.37.10.jpeg`** | Mobile Portrait | Candidate portrait for social preview cards / responsive modal bios. |
| **`WhatsApp Image 2025-04-05 at 20.32.08_6e2966e1.jpg`** | Casual Portrait | Secondary portrait option for alternate themes. |

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js 20+ (recommended LTS)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/hirushasuhan/hirusha_suhan_me.git
cd hirusha_suhan_me
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site in your browser.

### 4. Build & Static Export
```bash
npm run build
```
Generates a static export in the `./out` directory ready for deployment to GitHub Pages or any static host.

### 5. Run Lint Check
```bash
npm run lint
```

---

## 🛡️ Security Posture
- **Audit Status**: 0 vulnerabilities across all dependencies (`npm audit`).
- **Static Export**: Zero server-side attack surface on GitHub Pages.
- **Reverse Tabnabbing Protected**: All external links use `rel="noopener noreferrer"`.
- **Security Headers**: `X-Content-Type-Options: nosniff` and `strict-origin-when-cross-origin` referrer policy enabled.

---

## 👤 Author
**Hirusha Suhan**
- GitHub: [@hirushasuhan](https://github.com/hirushasuhan)
- LinkedIn: [hirusha-suhan](https://www.linkedin.com/in/hirusha-suhan/)
- Twitter / X: [@hirusha_suhan](https://x.com/hirusha_suhan)
- Linktree: [hirusha.suhan](https://linktr.ee/hirusha.suhan)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
