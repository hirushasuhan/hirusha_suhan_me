"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useStage } from "@/store/stage";
import { KEYFRAMES, KEYFRAMES_MOBILE } from "./keyframes";

export function CameraRig() {
  const target = useRef<THREE.Vector3>(null);
  const isMobile = useThree((s) => s.size.width < 768);

  useFrame((state, delta) => {
    target.current ??= new THREE.Vector3();
    const { section, pointer } = useStage.getState();
    const k = (isMobile ? KEYFRAMES_MOBILE : KEYFRAMES)[section];

    const px = isMobile || Math.abs(pointer.x) > 1.2 ? 0 : pointer.x;
    const py = isMobile || Math.abs(pointer.y) > 1.2 ? 0 : pointer.y;

    // Dolly between section cameras + a little pointer parallax
    easing.damp3(
      state.camera.position,
      [k.cam[0] + px * 0.3, k.cam[1] + py * 0.2, k.cam[2]],
      0.8,
      delta,
    );
    easing.damp3(target.current, k.look, 0.8, delta);
    state.camera.lookAt(target.current);
  });

  return null;
}
