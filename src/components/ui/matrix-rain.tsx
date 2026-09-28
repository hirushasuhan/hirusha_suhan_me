"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  fps?: number;
  fontSize?: number;
}

export function MatrixRain({ fps = 12, fontSize = 16 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.ceil(window.innerWidth / fontSize);
      // FIX: the old version never recomputed columns after a resize
      drops = Array.from({ length: columns }, (_, i) => drops[i] ?? Math.random() * -40);
    };

    const draw = () => {
      // FIX: fade old glyphs to TRANSPARENT (was: paint black) so the 3D stage shows through
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "#06b6d4";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop); // rAF already pauses in background tabs
      if (t - last < 1000 / fps) return;
      last = t;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let k = 0; k < 60; k++) draw(); // one still frame, no animation
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fps, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-20"
    />
  );
}
