"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Palette, Search, GraduationCap } from "lucide-react";

export function About() {
    const skills = [
        "React / Next.js",
        "TypeScript",
        "Graphic Design",
        "Web Development",
        "Tech Research",
        "C",
        "Java",
        "Python",
    ];

    const features = [
        {
            icon: Code,
            title: "Frontend Development",
            description: "Building responsive, accessible, and performant web applications.",
        },
        {
            icon: Palette,
            title: "Graphic Design",
            description: "Crafting intuitive and aesthetically pleasing designs.",
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
                    <div className="mt-6 max-w-3xl mx-auto space-y-4">
                        <p className="text-lg font-medium text-cyan-400">
                            CS Undergraduate | Aspiring Tech Enthusiast | Web Developer | Python Dev
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Dedicated Industrial Information Technology undergraduate with a passion for exploring the latest tech trends.
                            Skilled in Python, C, JAVA, web development, graphic design and illustration. Committed to applying theoretical knowledge to practical solutions
                            and sharing insights through informative articles.
                        </p>
                    </div>
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
