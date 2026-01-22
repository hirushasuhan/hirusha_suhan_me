"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Github, Linkedin, Code2, Link as IconLink } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
            {/* Background Gradient Blob */}
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-4xl space-y-8"
            >
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-400 backdrop-blur-md">
                    <span className="mr-2 flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Available for Work
                </div>

                <h1 className="bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
                    Hirusha Suhan
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
                    Frontend Developer, Designer & Tech Researcher crafting premium digital experiences with code and creativity.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href="#projects">
                        <Button size="lg" className="w-full sm:w-auto">
                            View My Work
                        </Button>
                    </a>
                    <a href="#contact">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Contact Me
                        </Button>
                    </a>
                </div>

                <div className="mt-12 flex justify-center gap-6">
                    <SocialIcon href="https://github.com/hirushasuhan" icon={Github} label="GitHub" />
                    <SocialIcon href="https://www.linkedin.com/in/hirusha-suhan/" icon={Linkedin} label="LinkedIn" />
                    <SocialIcon href="https://linktr.ee/hirusha.suhan" icon={IconLink} label="Linktree" />
                </div>
            </motion.div>
        </section>
    );
}
