# ANIMATION_GUIDE.md — 3D Motion Portfolio

This guide turns the portfolio into a **scroll-driven 3D motion experience**: one persistent WebGL scene sits behind the page, and scrolling moves the camera and objects through it while the HTML content reveals on top. It is written for **React + Vite** (notes for Next.js and vanilla JS are included where they differ).

> Research basis (Sept 2026): the dominant stack in current award-level portfolios is Three.js via React Three Fiber, GSAP + ScrollTrigger for choreography, and Lenis for smooth scroll. GSAP and **all** its plugins (SplitText, MorphSVG, ScrollSmoother, etc.) are now free for commercial use after Webflow's acquisition, installed from the public `gsap` npm package — no Club membership or private registry needed.

---

## 1. Creative direction

**The idea:** the site is not a stack of sections, it is a single 3D world you travel through. Scroll is the timeline.

Rules to keep it feeling premium rather than busy:

1. **One hero object, one world.** A single signature 3D object (a sculpture, a device, a planet, an abstract shape that represents your work) that persists across the whole page and transforms per section. Don't spawn a new 3D gimmick per section.
2. **Scroll drives, time decorates.** Big moves (camera dolly, object rotation, morphs) are tied to scroll progress. Idle motion (slow float, breathing noise) is small and constant.
3. **One orchestrated intro.** A single load sequence (preloader → hero reveal). Avoid giving every section the same fade-up; vary the reveal per section or leave quiet sections still.
4. **Motion answers the user.** Hover, drag, and cursor effects should respond to input and show something changed.
5. **Content first.** Text must be readable at every scroll position. The 3D is the stage, not a wall in front of the content.

Fill this in before building:

| Decision | Your choice |
|---|---|
| Signature 3D object | _e.g. glass crystal / low-poly workspace / particle sphere_ |
| Mood & palette (4–6 hex values) | |
| Display + body typefaces | |
| One "wow" moment (where the boldest motion lives) | _e.g. hero object explodes into project cards_ |

---

## 2. Stack & installation

| Purpose | Package |
|---|---|
| 3D renderer | `three`, `@react-three/fiber` |
| 3D helpers (models, text, environment, `View`, perf tools) | `@react-three/drei` |
| Post-processing (bloom, noise, chromatic aberration) | `@react-three/postprocessing` |
| Scroll choreography, timelines, text splitting | `gsap`, `@gsap/react` |
| Smooth scrolling | `lenis` |
| Damping / easing helpers for the render loop | `maath` |
| Shared state between DOM and 3D | `zustand` |
| Debug sliders (dev only) | `leva` |

```bash
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react lenis maath zustand
npm i -D leva @types/three
```

**Version rule:** React 19 → `@react-three/fiber` v9. React 18 → fiber v8. Don't mix version lines. Note that the old packages `@studio-freight/lenis` and `@studio-freight/react-lenis` are superseded by `lenis` and `lenis/react`.

---

## 3. Architecture

A **fixed, full-screen canvas** sits behind normal scrolling HTML. The DOM scrolls; the 3D scene reads scroll progress and reacts.

```
┌──────────────────────────────────────┐
│  <Canvas>  position: fixed; z: 0     │  ← one WebGL context for the whole site
│    Scene: hero object, lights, env   │
├──────────────────────────────────────┤
│  <main>   position: relative; z: 1   │  ← normal HTML sections, scroll natively
│    Hero / About / Work / Contact     │
└──────────────────────────────────────┘
         ▲                     │
         │ ScrollTrigger       │ writes progress
         └── zustand store ◄───┘ useFrame reads + damps
```

Suggested folders:

```
src/
├── app/            App.jsx, providers (SmoothScroll, GSAP registration)
├── sections/       Hero, About, Work, Contact (DOM content)
├── three/          Experience.jsx, HeroObject.jsx, Lights.jsx, Effects.jsx, shaders/
├── motion/         useScrollProgress.js, reveals.js, SplitHeading.jsx, Magnetic.jsx
├── store/          useStage.js (zustand)
└── public/models/  compressed .glb files
```

```css
/* global.css */
.webgl {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* set to auto on specific sections if the 3D is interactive */
}
main { position: relative; z-index: 1; }
```

---

## 4. Smooth scroll + GSAP sync

Lenis must be driven by GSAP's ticker so ScrollTrigger and smooth scroll never drift apart.

```jsx
// app/SmoothScroll.jsx
import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef()

  // Keep ScrollTrigger updated on every Lenis scroll
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  )
}
```

Known Lenis limitations to plan around: no native CSS `scroll-snap` (use `lenis/snap`), wheel smoothing stops over iframes, and scrolling is capped to 60fps on Safari. Add `data-lenis-prevent` to any inner scrollable element (modals, code blocks).

**Vanilla JS equivalent:**

```js
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 5. The scroll → 3D bridge

Never animate 3D objects directly from React state on every scroll event (it re-renders). Instead: **ScrollTrigger writes numbers into a store; `useFrame` reads them and damps toward them.** Damping is what makes the motion feel smooth and physical.

```js
// store/useStage.js
import { create } from 'zustand'

export const useStage = create(() => ({
  progress: 0,      // 0 → 1 over the whole page
  section: 0,       // index of the active section
  pointer: { x: 0, y: 0 },
}))
```

```jsx
// motion/useScrollProgress.js
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStage } from '../store/useStage'

export function useScrollProgress() {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: 'main',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => useStage.setState({ progress: self.progress }),
    })

    gsap.utils.toArray('[data-section]').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && useStage.setState({ section: i }),
      })
    })
  })
}
```

```jsx
// three/HeroObject.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { easing } from 'maath'
import { useStage } from '../store/useStage'
import { KEYFRAMES } from './keyframes'

export default function HeroObject() {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/models/hero-transformed.glb')

  useFrame((state, delta) => {
    const { section, pointer } = useStage.getState() // read without re-rendering
    const k = KEYFRAMES[section]

    // Object pose per section, damped
    easing.damp3(ref.current.position, k.objectPos, 0.4, delta)
    easing.dampE(ref.current.rotation, [k.objectRot[0] + pointer.y * 0.15, k.objectRot[1] + pointer.x * 0.25, k.objectRot[2]], 0.4, delta)
    easing.damp3(ref.current.scale, k.scale, 0.4, delta)

    // Camera per section
    easing.damp3(state.camera.position, k.camPos, 0.6, delta)
    state.camera.lookAt(...k.lookAt)

    // Idle float
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.002
  })

  return (
    <group ref={ref} dispose={null}>
      <mesh geometry={nodes.Hero.geometry} material={materials.Main} />
    </group>
  )
}

useGLTF.preload('/models/hero-transformed.glb')
```

Two ways to map scroll to 3D — pick per effect:

| Approach | Use for | How |
|---|---|---|
| **Section keyframes + damping** (above) | Big pose changes between sections | `section` index → keyframe table → `easing.damp*` |
| **Continuous scrub** | Effects that must track scroll exactly (morph, dissolve, rotation along a path) | Use `progress` (or a per-section ScrollTrigger's `self.progress`) directly, e.g. `uniforms.uProgress.value = progress` |

---

## 6. Section choreography

Define the whole journey as data so tuning never means hunting through components.

```js
// three/keyframes.js
export const KEYFRAMES = [
  // 0 Hero: object centered, large, camera close
  { camPos: [0, 0, 5],    lookAt: [0, 0, 0],  objectPos: [0, 0, 0],     objectRot: [0, 0, 0],      scale: [1.2, 1.2, 1.2] },
  // 1 About: object slides right so text sits left
  { camPos: [-1, 0.5, 6], lookAt: [0, 0, 0],  objectPos: [1.8, 0, 0],   objectRot: [0.3, 1.2, 0],  scale: [0.9, 0.9, 0.9] },
  // 2 Work: camera orbits around, object recedes
  { camPos: [3, 1, 7],    lookAt: [0, 0, -1], objectPos: [0, -0.5, -2], objectRot: [0, 2.6, 0.2],  scale: [0.7, 0.7, 0.7] },
  // 3 Contact: object returns, faces the viewer
  { camPos: [0, 0, 4.5],  lookAt: [0, 0, 0],  objectPos: [0, 0.2, 0],   objectRot: [0, 6.28, 0],   scale: [1, 1, 1] },
]
```

| Section | DOM motion | 3D motion | Notes |
|---|---|---|---|
| **Preloader** | Counter 0–100 from `useProgress`, then wipe | Scene hidden until assets load | Keep under ~2s on good connections |
| **Hero** | Headline lines rise from masks, staggered | Object scales in + rotates from back, light sweeps across | The one orchestrated intro moment |
| **About** | Paragraph reveals line by line on scroll | Object moves aside, slow reaction to cursor | Keep text column clear of the object |
| **Work** | Project titles slide/scrub, images reveal with clip-path | Object recedes; project previews become 3D planes (see §8) | Your "wow" moment likely lives here |
| **Skills / Services** | Marquee or pinned horizontal scroll | Particles or object material shifts color | Optional section |
| **Contact** | Big CTA, magnetic button | Object returns to center, completes rotation loop | Closes the journey visually |

For a pinned "chapter" (content stays while the 3D performs), pin the section and scrub:

```jsx
useGSAP(() => {
  gsap.timeline({
    scrollTrigger: { trigger: '#work', start: 'top top', end: '+=200%', pin: true, scrub: 1 },
  })
    .from('.work-title', { yPercent: 100, stagger: 0.1 })
    .to('.work-track', { xPercent: -66, ease: 'none' })
}, { scope: container })
```

---

## 7. Scene setup, lighting & look

```jsx
// three/Experience.jsx
import { Canvas } from '@react-three/fiber'
import { Environment, PerformanceMonitor, useProgress, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense, useState } from 'react'
import HeroObject from './HeroObject'

export default function Experience() {
  const [dpr, setDpr] = useState(1.5)
  return (
    <Canvas
      className="webgl"
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.5} />
        <HeroObject />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.6} luminanceThreshold={0.8} mipmapBlur />
          <Noise opacity={0.03} />
          <Vignette darkness={0.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
```

Look-and-feel options, from least to most effort:

- **Glass / crystal:** drei `MeshTransmissionMaterial` over an `Environment` — high visual payoff, heavy on GPU; lower `samples` and `resolution` on mobile.
- **Matcap or toon:** cheap, stylised, looks great with strong typography.
- **Particles / points:** a `THREE.Points` cloud that morphs between shapes (sample points from two meshes, lerp in a shader with `uProgress`).
- **Custom GLSL backdrop:** a full-screen noise/gradient shader that reacts to cursor and scroll. Distinctive and light if written carefully.

Pointer input (feeds the damping in §5):

```js
window.addEventListener('pointermove', (e) => {
  useStage.setState({ pointer: { x: (e.clientX / innerWidth) * 2 - 1, y: -(e.clientY / innerHeight) * 2 + 1 } })
})
```

---

## 8. Project showcase in 3D

Two proven patterns:

**A. Tracked DOM → WebGL planes (drei `View` or a scroll-rig).** Keep project cards as real HTML (for accessibility and SEO) and render a WebGL plane exactly over each card's image, so you can apply shader effects (wave distortion on hover, RGB shift on scroll velocity, curl on reveal). drei's `View` component renders multiple scenes inside the one canvas, each tracked to a DOM element. `r3f-scroll-rig` by 14islands is a specialised alternative built for syncing meshes with DOM elements under Lenis.

**B. 3D gallery in the world.** Projects are planes or objects placed along a path inside the scene; the pinned Work section scrolls the camera along a `CatmullRomCurve3`:

```js
const curve = new THREE.CatmullRomCurve3(points)
useFrame(() => {
  const t = useStage.getState().workProgress // 0–1 from the pinned ScrollTrigger
  curve.getPointAt(t, camera.position)
  camera.lookAt(curve.getPointAt(Math.min(t + 0.02, 1)))
})
```

Hover distortion shader uniform pattern:

```glsl
// fragment
uniform sampler2D uTex; uniform float uHover; uniform float uTime; varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  uv.x += sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
  float r = texture2D(uTex, uv + vec2(0.005 * uHover, 0.0)).r;
  vec2 gb = texture2D(uTex, uv).gb;
  gl_FragColor = vec4(r, gb, 1.0);
}
```

Animate `uHover` 0 → 1 with `gsap.to(material.uniforms.uHover, { value: 1, duration: 0.6 })`.

---

## 9. Text & DOM motion

**Split headings** with the rewritten SplitText (smaller, built-in screen-reader handling, native masking):

```jsx
// motion/SplitHeading.jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(SplitText)

export default function SplitHeading({ as: Tag = 'h2', children, scrub = false }) {
  const ref = useRef()
  useGSAP(() => {
    SplitText.create(ref.current, {
      type: 'lines,words',
      mask: 'lines',
      autoSplit: true, // re-splits on resize / font load
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', scrub },
        }),
    })
  }, { scope: ref })
  return <Tag ref={ref}>{children}</Tag>
}
```

**Other DOM effects** worth using (pick a few, not all):

- Image reveal with `clip-path: inset(100% 0 0 0)` → `inset(0)`.
- Velocity skew: read `self.getVelocity()` in a ScrollTrigger and apply a small `skewY` with `gsap.quickTo`.
- Infinite marquee for skills/clients, speed boosted by scroll velocity.
- Number counters for stats (only if you have meaningful numbers).

**Magnetic button:**

```jsx
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef()
  useGSAP(() => {
    const x = gsap.quickTo(ref.current, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' })
    const y = gsap.quickTo(ref.current, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' })
    const move = (e) => {
      const r = ref.current.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * strength)
      y((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => { x(0); y(0) }
    ref.current.addEventListener('pointermove', move)
    ref.current.addEventListener('pointerleave', leave)
    return () => { ref.current?.removeEventListener('pointermove', move); ref.current?.removeEventListener('pointerleave', leave) }
  }, { scope: ref })
  return <span ref={ref} style={{ display: 'inline-block' }}>{children}</span>
}
```

A custom cursor is optional; if you add one, hide it on touch devices and keep the native cursor for text inputs.

---

## 10. Preloader & page transitions

```jsx
import { useProgress } from '@react-three/drei'
const { progress, active } = useProgress()
// animate a counter to `progress`; when !active → play intro timeline, then ScrollTrigger.refresh()
```

- Lock scroll during the intro: `lenis.stop()` → `lenis.start()` when done.
- Call `ScrollTrigger.refresh()` after fonts (`document.fonts.ready`) and models finish loading, otherwise trigger positions are wrong.
- For multi-page sites (case-study pages), use the View Transitions API or a GSAP overlay wipe; keep the canvas mounted in the root layout so the 3D doesn't reload between routes.

---

## 11. Performance budget

| Metric | Target |
|---|---|
| Hero model (compressed .glb) | < 1.5 MB, ideally < 800 KB |
| Total 3D assets on first load | < 3 MB |
| Draw calls | < 100 |
| Frame rate | 60fps desktop, stable 30+ on mid-range phones |
| LCP | < 2.5s (HTML headline should be the LCP element, not the canvas) |

Asset pipeline:

```bash
# Draco-compress + resize textures + WebP, and generate a JSX component
npx gltfjsx public/models/hero.glb --transform --types --shadows
```

The `--transform` flag typically shrinks models 70–90% via Draco geometry compression, 1024px texture resizing, and WebP conversion. For heavier texture sets, look at KTX2 via `gltf-transform`.

Runtime rules:

- **One canvas for the whole site.** Multiple canvases = multiple WebGL contexts.
- **Stop rendering when idle.** Use `frameloop="demand"` with `invalidate()` for scenes that come to rest, or switch to `frameloop="never"` when the canvas is scrolled out of relevance. R3F's docs note that the constant 60fps loop is what drains batteries most.
- **Never `setState` inside `useFrame`.** Mutate refs; read the store with `getState()`.
- **Reuse** geometries and materials; use `<Instances>` for repeated objects.
- **Warm up** heavy sections: compile shaders and upload textures before they scroll into view (`gl.compile(scene, camera)`) to avoid a first-scroll hitch.
- **Adaptive quality:** `PerformanceMonitor` + `AdaptiveDpr` (see §7); drop post-processing and transmission on decline.
- **Animate transforms and opacity only** in the DOM (no `top/left/width` animations).
- Lazy-load the whole `Experience` with `React.lazy` so the HTML paints first.

---

## 12. Accessibility & reduced motion

Wrap all motion in `gsap.matchMedia()` so reduced-motion users get a calm, complete site:

```js
const mm = gsap.matchMedia()
mm.add(
  { full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' },
  ({ conditions }) => {
    if (conditions.reduced) {
      gsap.set('.reveal', { clearProps: 'all' })
      return // no scrub, no pin, no split
    }
    // full motion timelines here
  }
)
```

- Reduced motion: disable Lenis smoothing, snap 3D to section keyframes without damping travel (or show a static render image), keep the idle float off.
- The canvas is decorative: `aria-hidden="true"` on its wrapper. All real content (projects, contact) lives in HTML.
- Keyboard focus must be visible and never hidden behind the canvas; test tabbing through every section.
- Maintain text contrast over the 3D background (add a subtle gradient scrim behind text if the object passes under it).

---

## 13. Mobile strategy

- Detect capability, not just width: low `navigator.hardwareConcurrency`, `PerformanceMonitor` decline, or `(pointer: coarse)`.
- Mobile tier: DPR 1, no post-processing, simpler material, fewer particles, no custom cursor, no hover shaders (use tap states).
- Reposition keyframes for portrait: object above or behind text instead of beside it (keep a `KEYFRAMES_MOBILE` table).
- Avoid long pinned sections on phones; they fight the address bar. Use `ScrollTrigger.config({ ignoreMobileResize: true })`.
- Test on a real mid-range Android device, not only desktop DevTools emulation.

---

## 14. Build roadmap

- [ ] **Phase 1 — Foundation:** install stack, `SmoothScroll` provider, fixed canvas, zustand store, section `data-section` markers.
- [ ] **Phase 2 — Hero object:** model or procedural shape, lighting, environment, pointer parallax, idle float.
- [ ] **Phase 3 — Journey:** keyframes table, section tracking, damped camera/object transitions across all sections.
- [ ] **Phase 4 — Text & DOM:** SplitText headings, image reveals, magnetic CTA, one marquee or pinned horizontal section.
- [ ] **Phase 5 — Work showcase:** tracked WebGL planes or 3D gallery path, hover shader.
- [ ] **Phase 6 — Intro:** preloader with `useProgress`, orchestrated hero timeline, `ScrollTrigger.refresh()` after load.
- [ ] **Phase 7 — Polish:** post-processing, color grading, easing tuning with Leva.
- [ ] **Phase 8 — Hardening:** asset compression, adaptive quality, reduced-motion path, mobile keyframes, Lighthouse and real-device testing.

---

## 15. Debugging checklist

- Triggers fire at wrong positions → call `ScrollTrigger.refresh()` after images, fonts, and models load; check for elements changing height after load.
- Jittery 3D on scroll → make sure Lenis runs on `gsap.ticker` (not its own rAF) and 3D reads values in `useFrame` with damping.
- Animations run twice in dev → React StrictMode double-invokes effects; `useGSAP` handles cleanup, so avoid raw `useEffect` for GSAP.
- Add `markers: true` to ScrollTriggers while tuning; use `<Perf />` from `r3f-perf` or `<Stats />` from drei to watch FPS and draw calls.
- Next.js: every component that touches `window`, GSAP, Lenis, or `<Canvas>` needs `'use client'`; load `Experience` with `dynamic(() => import(...), { ssr: false })`.

---

## 16. References

- GSAP docs (ScrollTrigger, SplitText, React guide with `useGSAP`): https://gsap.com/docs
- Lenis (incl. `lenis/react`): https://github.com/darkroomengineering/lenis
- React Three Fiber — scaling performance: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- drei components (`View`, `PerformanceMonitor`, `MeshTransmissionMaterial`, `useProgress`): https://github.com/pmndrs/drei
- Codrops case study on coordinating GSAP, Three.js, Lenis and Web Audio (Trionn, July 2026): https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/
- Example open-source portfolios using this stack: https://github.com/HxnDev/Portfolio, https://github.com/samyyy2423/portfolio
