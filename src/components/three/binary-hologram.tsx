"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useStage, type SectionId } from "@/store/stage";
import { asset } from "@/lib/asset";
import { buildShapes } from "./shapes";
import { hologramVertex, hologramFragment } from "./hologram-shaders";
import { KEYFRAMES, KEYFRAMES_MOBILE } from "./keyframes";

const MORPH_SECONDS = 1.6;
const TAU = Math.PI * 2;
const smooth = (m: number) => m * m * (3 - 2 * m);
const fract = (x: number) => x - Math.floor(x);

export function BinaryHologram({ count }: { count: number }) {
  const outer = useRef<THREE.Group>(null); // section pose (position / tilt / scale)
  const inner = useRef<THREE.Group>(null); // idle spin
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const shapes = useRef<Record<SectionId, Float32Array> | null>(null);
  const current = useRef<SectionId | null>(null);
  const mix = useRef(1);
  const isMobile = useThree((s) => s.size.width < 768);

  const buffers = useMemo(() => {
    const random = new Float32Array(count);
    for (let i = 0; i < count; i++) random[i] = fract(Math.sin(i * 91.345) * 47453.5453);
    return { start: new Float32Array(count * 3), end: new Float32Array(count * 3), random };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMix: { value: 1 },
      uVelocity: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) }, // off-screen until the mouse moves
      uSize: { value: 3.2 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 0 },
      uColorA: { value: new THREE.Color("#06b6d4") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
    }),
    [],
  );

  // Build every section shape once (portrait sampling is async)
  useEffect(() => {
    let cancelled = false;
    buildShapes(count, asset("/3d/portrait.webp")).then((s) => {
      if (cancelled) return;
      shapes.current = s;
      current.current = null; // force a morph into the current section
      useStage.setState({ sceneReady: true });
    });
    return () => {
      cancelled = true;
    };
  }, [count]);

  useFrame((state, delta) => {
    const g = geo.current, m = mat.current, s = shapes.current, o = outer.current, inn = inner.current;
    if (!g || !m || !s || !o || !inn) return;

    const { section, velocity, pointer } = useStage.getState();
    const u = m.uniforms;

    // Section changed → freeze where every particle is now, retarget to the new shape
    if (section !== current.current) {
      const startAttr = g.getAttribute("aStart") as THREE.BufferAttribute;
      const endAttr = g.getAttribute("position") as THREE.BufferAttribute;
      const start = startAttr.array as Float32Array;
      const end = endAttr.array as Float32Array;
      const rnd = buffers.random;
      for (let i = 0; i < rnd.length; i++) {
        const t = smooth(Math.min(Math.max(mix.current * 1.4 - rnd[i] * 0.4, 0), 1)); // same as shader
        for (let k = 0; k < 3; k++) {
          const j = i * 3 + k;
          start[j] += (end[j] - start[j]) * t;
        }
      }
      end.set(s[section]);
      startAttr.needsUpdate = true;
      endAttr.needsUpdate = true;
      current.current = section;
      mix.current = 0;
    }

    mix.current = Math.min(1, mix.current + delta / MORPH_SECONDS);
    u.uMix.value = mix.current;
    u.uTime.value += delta;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    easing.damp(u.uVelocity, "value", Math.min(Math.abs(velocity) / 50, 1), 0.2, delta);

    const px = isMobile || Math.abs(pointer.x) > 2 ? 0 : pointer.x;
    const py = isMobile || Math.abs(pointer.y) > 2 ? 0 : pointer.y;
    easing.damp2(u.uPointer.value, isMobile ? [99, 99] : [pointer.x, pointer.y], 0.15, delta);

    // Section pose, damped (this is what makes it feel physical)
    const k = (isMobile ? KEYFRAMES_MOBILE : KEYFRAMES)[section];
    easing.damp3(o.position, k.obj, 0.5, delta);
    easing.damp3(o.scale, [k.scale, k.scale, k.scale], 0.5, delta);
    easing.dampE(o.rotation, [k.tilt + py * 0.12, px * 0.25, 0], 0.4, delta);
    easing.damp(u.uOpacity, "value", k.opacity, 0.4, delta);

    // Idle spin; when spin = 0, settle on the nearest full turn so the portrait faces you
    if (k.spin > 0) inn.rotation.y += k.spin * delta;
    else easing.damp(inn.rotation, "y", Math.round(inn.rotation.y / TAU) * TAU, 0.5, delta);
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        {/* vertices move in the shader, so the CPU bounding sphere is wrong → no culling */}
        <points frustumCulled={false}>
          <bufferGeometry ref={geo}>
            <bufferAttribute attach="attributes-position" args={[buffers.end, 3]} />
            <bufferAttribute attach="attributes-aStart" args={[buffers.start, 3]} />
            <bufferAttribute attach="attributes-aRandom" args={[buffers.random, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={mat}
            vertexShader={hologramVertex}
            fragmentShader={hologramFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
