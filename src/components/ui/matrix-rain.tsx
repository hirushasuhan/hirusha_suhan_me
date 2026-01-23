"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Configuration
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1); // Y position of drops

        // Matrix characters - User specifically asked for "1 0 animation"
        const chars = "10";

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#06b6d4"; // Cyan-500 to match theme
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));

                // x = column index * font size
                // y = drop value * font size
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly after it has crossed the screen
                // Adding randomness to the reset to scatter drops
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment y coordinate
                drops[i]++;
            }
        };

        let lastDrawTime = 0;
        const fps = 10; // Set to 10 for a very slow, readable speed (0 breaks division)
        const frameInterval = 1000 / fps;

        const animate = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(animate);

            const elapsed = timestamp - lastDrawTime;

            if (elapsed > frameInterval) {
                lastDrawTime = timestamp - (elapsed % frameInterval);
                draw();
            }
        };

        // Start animation
        animate(0);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-20"
        />
    );
}
