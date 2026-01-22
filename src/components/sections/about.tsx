"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Palette, Search, GraduationCap } from "lucide-react";

export function About() {
    const skills = [
        "React / Next.js",
        "Tailwind CSS",
        "TypeScript",
        "UI/UX Design",
        "Figma",
        "Research",
    ];

    const features = [
        {
            icon: Code,
            title: "Frontend Development",
            description: "Building responsive, accessible, and performant web applications.",
        },
        {
            icon: Palette,
            title: "UI/UX Design",
            description: "Crafting intuitive and aesthetically pleasing user interfaces.",
        },
        {
            icon: Search,
            title: "Tech Research",
            description: "Explaining and exploring the latest technologies and trends.",
        },
    ];

    return (
        <section id="about" className="relative py-20 px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">About Me</h2>
                    <p className="mt-4 text-gray-400">My journey in the tech world.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col items-center text-center hover:border-cyan-500/50">
                                <div className="mb-4 rounded-full bg-cyan-500/10 p-3 text-cyan-400">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-xl font-semibold text-white mb-6">Tech Stack</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill) => (
                            <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-cyan-500/50 hover:text-white cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
