"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/motion/tilt-card";
import {
    Code,
    Palette,
    Search,
    Terminal,
    Globe,
    Database,
    Network,
    Award
} from "lucide-react";

export function About() {
    const features = [
        {
            icon: Code,
            title: "Full-Stack & Software Engineering",
            description: "Building responsive full-stack platforms and object-oriented systems with Next.js, React, Java, and TypeScript.",
        },
        {
            icon: Palette,
            title: "UI/UX & Graphic Design",
            description: "Crafting intuitive digital experiences, branding assets, event visuals, and publication designs.",
        },
        {
            icon: Search,
            title: "Tech Research & Networking",
            description: "APNIC certified in IPv6 & routing, analyzing infrastructure automation, cloud systems, and technical writing.",
        },
    ];

    const skillCategories = [
        {
            category: "Languages",
            icon: Terminal,
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            skills: ["Java (OOP)", "Python", "TypeScript", "JavaScript (ES6+)", "C / C++", "PHP 8", "SQL", "Bash / Shell"],
        },
        {
            category: "Frontend & Web",
            icon: Globe,
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            skills: ["Next.js (App Router)", "React", "Tailwind CSS", "HTML5 / CSS3", "Wasmer Edge (WCGI)", "REST APIs"],
        },
        {
            category: "Databases & Systems",
            icon: Database,
            color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
            skills: ["MySQL", "Relational Modeling", "ER Diagrams", "Database Design", "Linux (Ubuntu)", "Windows Server"],
        },
        {
            category: "Networking & DevOps",
            icon: Network,
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            skills: ["IPv6 & Routing (APNIC)", "Git & GitHub", "CI/CD Pipelines", "Docker", "Network Security", "Infrastructure Automation"],
        },
        {
            category: "Design & Research",
            icon: Palette,
            color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
            skills: ["UI/UX Design", "Figma", "Canva", "Graphic Design & Posters", "Brand Identity", "Tech Article Writing (The Evaluation)"],
        },
        {
            category: "Certifications & Diplomas",
            icon: Award,
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            skills: [
                "Pearson Certified Diploma in IT",
                "Pearson Certified Diploma in English",
                "HackerRank (Java, Python, JS)",
                "APNIC Academy (IPv6 & Routing)",
                "UoM (Web Design & Python)",
            ],
        },
    ];

    return (
        <section id="about" data-section="about" className="relative py-20 px-4">
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
                            Computer Science &amp; Informatics Undergraduate | Full-Stack Developer | Designer | Tech Enthusiast
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Undergraduate at <span className="text-white font-medium">Uva Wellassa University of Sri Lanka</span> in the Department of Computer Science and Informatics (CSI), specializing in Industrial Information Technology (IIT). 
                            Passionate about combining software engineering, different type of development architectures, and modern technologies to build high-performance digital solutions. 
                            Alongside development, I actively explore networking, cybersecurity, DevOps, web3 systems, cryptography, and game development.
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
                            className="h-full"
                        >
                            <TiltCard maxTilt={8}>
                                <Card className="h-full flex flex-col items-center text-center hover:border-cyan-500/50">
                                    <div className="mb-4 rounded-full bg-cyan-500/10 p-3 text-cyan-400">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white sm:text-3xl">Tech Stack & Skills</h3>
                        <p className="mt-2 text-sm text-gray-400">
                            Verified technical competencies, engineering stacks, and professional accreditations.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {skillCategories.map((group, idx) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="h-full"
                            >
                                <TiltCard maxTilt={6}>
                                    <Card className="h-full border-white/10 bg-white/5 p-6 hover:border-cyan-500/40 transition-all hover:bg-white/[0.08] flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded-lg border ${group.color}`}>
                                                <group.icon className="h-5 w-5" />
                                            </div>
                                            <h4 className="font-semibold text-white text-base">{group.category}</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-500/50 hover:text-white cursor-default"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Card>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
