"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Github, Linkedin, Code2, Link as IconLink } from "lucide-react";

import { MatrixRain } from "@/components/ui/matrix-rain";

export function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center pt-32 sm:pt-40">
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Background Gradient Blob */}
            <motion.div style={{ y: y1 }} className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]" />
            <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-4xl space-y-4 flex flex-col items-center"
            >
                {/* User Photo - Larger & Modern Gradient Border */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mb-6"
                >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-75 blur animate-spin-slow" />
                    <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-black/50 bg-black sm:h-48 sm:w-48">
                        <img
                            src="/me.png"
                            alt="Hirusha Suhan"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </motion.div>

                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-400 backdrop-blur-md">
                    <span className="mr-2 flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Available for Work
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    <span className="text-cyan-400">Hirusha</span> suhan
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base font-medium leading-relaxed"
                >
                    <span className="text-cyan-400">Frontend Developer</span>, <span className="text-purple-400">Designer</span> & <span className="text-green-400">Tech Researcher</span> crafting premium digital experiences with <span className="text-white">code</span> and <span className="text-white">creativity</span>.
                </motion.p>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <a href="#projects" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full">
                            View My Work
                        </Button>
                    </a>
                    <a
                        href="/Hirusha suhan.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button variant="secondary" size="lg" className="w-full">
                            Download CV
                        </Button>
                    </a>
                    <a href="#contact" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full">
                            Contact Me
                        </Button>
                    </a>
                </div>

                {/* Social Icons - Increased visibility */}
                <div className="mt-4 flex justify-center gap-6 relative z-20">
                    <SocialIcon href="https://github.com/hirushasuhan" icon={Github} label="GitHub" />
                    <SocialIcon href="https://www.linkedin.com/in/hirusha-suhan/" icon={Linkedin} label="LinkedIn" />
                    <SocialIcon href="https://linktr.ee/hirusha.suhan" icon={IconLink} label="Linktree" />
                </div>
            </motion.div>
        </section>
    );
}
