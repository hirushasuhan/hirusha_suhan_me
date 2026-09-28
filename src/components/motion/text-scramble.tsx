"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "01<>/{}[]_#$%&*+=";

interface TextScrambleProps {
  text: string;
  play?: boolean; // start when true (e.g. after the intro)
  speed?: number; // ms per tick
  className?: string;
}

export function TextScramble({ text, play = true, speed = 35, className }: TextScrambleProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text); // real text in the static HTML (SEO / no-JS)

  useEffect(() => {
    if (!play || reduce) return;
    let frame = 0;
    const id = setInterval(() => {
      const resolved = frame / 2; // two ticks per character
      setDisplay(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < resolved ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (resolved >= text.length) clearInterval(id);
      frame++;
    }, speed);
    return () => clearInterval(id);
  }, [text, play, reduce, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
