"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BinaryHologram } from "./binary-hologram";
import { CameraRig } from "./camera-rig";

type Tier = "full" | "lite";

// Default export → loaded with next/dynamic({ ssr: false }) from StageLoader
export default function Experience({ tier }: { tier: Tier }) {
  const [dpr, setDpr] = useState(tier === "full" ? 1.5 : 1);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />

      {/* Adjust resolution automatically if needed, keeping post-processing glow intact */}
      <PerformanceMonitor
        onIncline={() => setDpr(tier === "full" ? 1.75 : 1.25)}
        onDecline={() => setDpr(1)}
        flipflops={4}
      />
      <AdaptiveDpr pixelated />

      <Suspense fallback={null}>
        <BinaryHologram count={tier === "full" ? 24000 : 9000} />
        <CameraRig />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.12} luminanceSmoothing={0.35} />
          <Noise opacity={0.02} />
          <Vignette offset={0.3} darkness={0.5} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
