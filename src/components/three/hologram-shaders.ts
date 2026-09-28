// Plain template strings: no GLSL loader needed with Turbopack (Next 16 default).

export const hologramVertex = /* glsl */ `
  uniform float uTime;
  uniform float uMix;       // 0 → 1 morph from aStart to position
  uniform float uVelocity;  // 0 → 1 normalised scroll speed
  uniform vec2  uPointer;   // NDC
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3  aStart;
  attribute float aRandom;

  varying float vRandom;
  varying float vAlpha;

  void main() {
    // staggered, eased morph — MUST match the CPU copy in binary-hologram.tsx
    float m = clamp(uMix * 1.4 - aRandom * 0.4, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    vec3 p = mix(aStart, position, m);

    // particles "rain" downward mid-transition (binary rain callback)
    p.y -= sin(m * 3.14159) * aRandom * 0.8;

    // idle breathing + scatter proportional to scroll speed
    float wave = sin(uTime * 0.9 + aRandom * 6.2831);
    p += normalize(p + 0.0001) * wave * (0.015 + uVelocity * 0.3);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // cursor repulsion in screen space (active only when pointer is on-screen)
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    float activePointer = step(abs(uPointer.x), 1.2) * step(abs(uPointer.y), 1.2);
    vec2 away = ndc - uPointer;
    float push = smoothstep(0.22, 0.0, length(away)) * activePointer;
    mv.xy += normalize(away + 0.0001) * push * 0.35;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.5 + aRandom) * (4.0 / -mv.z);

    vRandom = aRandom;
    vAlpha = 0.75 + push * 0.25;
  }
`;

export const hologramFragment = /* glsl */ `
  uniform vec3  uColorA;   // cyan
  uniform vec3  uColorB;   // violet
  uniform float uOpacity;

  varying float vRandom;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);

    vec3 color = mix(uColorA, uColorB, step(0.82, vRandom)); // ~18% violet
    color += step(0.975, vRandom) * 0.9;                     // rare white sparks

    // Radiant glowing core inside each point particle
    float core = smoothstep(0.25, 0.0, d) * 0.6;
    color += vec3(core);

    gl_FragColor = vec4(color * 1.25, soft * vAlpha * uOpacity);
  }
`;
