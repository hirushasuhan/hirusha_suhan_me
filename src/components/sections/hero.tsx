"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Github, Linkedin, Link as IconLink, Twitter } from "lucide-react";
import { useStage } from "@/store/stage";
import { useQualityTier } from "@/hooks/use-quality-tier";
import { TextScramble } from "@/components/motion/text-scramble";
import { Magnetic } from "@/components/motion/magnetic";
import { asset } from "@/lib/asset";

export function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const introDone = useStage((s) => s.introDone);
    const tier = useQualityTier();
    const show3D = tier === "full" || tier === "lite";

    return (
        <section data-section="hero" className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-4 pt-16 pb-16 lg:flex-row lg:items-center lg:justify-center lg:py-0">
            {/* Background Gradient Blob */}
            <motion.div style={{ y: y1 }} className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]" />
            <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={introDone ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center space-y-6 text-center lg:items-start lg:text-left"
            >
                {/* Mobile Headroom Clearance: Keeps 3D Hologram head and face clearly visible at top with details underneath */}
                <div className="h-56 sm:h-64 w-full shrink-0 lg:hidden pointer-events-none" aria-hidden="true" />

                {/* Round avatar only when there is no hologram (static tier / reduced motion) */}
                {!show3D && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative mb-2"
                    >
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-75 blur animate-spin-slow" />
                        <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-black/50 bg-black sm:h-48 sm:w-48">
                            <Image
                                src={asset("/me.webp")}
                                alt="Hirusha Suhan"
                                width={192}
                                height={192}
                                priority
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </motion.div>
                )}

                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-400 backdrop-blur-md">
                    <span className="mr-2 flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Available for Work
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    <TextScramble text="Hirusha" play={introDone} className="text-cyan-400" />{" "}
                    <TextScramble text="Suhan" play={introDone} speed={45} />
                </h1>

                <p className="max-w-2xl text-sm text-gray-300 sm:text-base font-medium leading-relaxed">
                    <span className="text-cyan-400">Full-Stack Developer</span>, <span className="text-purple-400">Designer</span> & <span className="text-green-400">Tech Enthusiast</span> crafting premium digital experiences with <span className="text-white">code</span> and <span className="text-white">creativity</span>.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                    <Magnetic>
                        <a href="#projects" className="w-full sm:w-auto block">
                            <Button size="lg" className="w-full">
                                View My Work
                            </Button>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href={asset("/Hirusha suhan.pdf")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto block"
                        >
                            <Button variant="secondary" size="lg" className="w-full">
                                Download CV
                            </Button>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="#contact" className="w-full sm:w-auto block">
                            <Button variant="outline" size="lg" className="w-full">
                                Contact Me
                            </Button>
                        </a>
                    </Magnetic>
                </div>

                {/* Social Icons */}
                <div className="mt-4 flex justify-center gap-6 relative z-20 lg:justify-start">
                    <Magnetic strength={0.25}><SocialIcon href="https://github.com/hirushasuhan" icon={Github} label="GitHub" /></Magnetic>
                    <Magnetic strength={0.25}><SocialIcon href="https://www.linkedin.com/in/hirusha-suhan/" icon={Linkedin} label="LinkedIn" /></Magnetic>
                    <Magnetic strength={0.25}><SocialIcon href="https://x.com/hirusha_suhan" icon={Twitter} label="Twitter / X" /></Magnetic>
                    <Magnetic strength={0.25}><SocialIcon href="https://linktr.ee/hirusha.suhan" icon={IconLink} label="Linktree" /></Magnetic>
                </div>
            </motion.div>
        </section>
    );
}
