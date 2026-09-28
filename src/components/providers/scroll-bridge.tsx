"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { useStage, SECTIONS, type SectionId } from "@/store/stage";

/** Writes scroll, section and pointer data into the store. Renders nothing. */
export function ScrollBridge() {
  // Lenis gives us smoothed velocity (only when Lenis is active)
  useLenis((lenis) => {
    useStage.setState({ velocity: lenis.velocity });
  });

  useEffect(() => {
    // 1. Page progress — works with or without Lenis (Lenis drives native scroll)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      useStage.setState({ progress: max > 0 ? window.scrollY / max : 0 });
    };

    // 2. Active section — whichever [data-section] crosses the viewport centre
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section as SectionId;
          if (entry.isIntersecting && SECTIONS.includes(id)) useStage.setState({ section: id });
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    // 3. Pointer in normalised device coords (-1 → 1)
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      useStage.setState({
        pointer: {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        },
      });
    };

    const onPointerLeave = () => {
      useStage.setState({ pointer: { x: 99, y: 99 } });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
