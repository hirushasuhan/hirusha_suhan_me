"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

// Placeholder data - user can update this later
const projects = [
    {
        title: "Project One",
        description: "A placeholder for your amazing project. Description goes here.",
        tags: ["Next.js", "Tailwind", "TypeScript"],
        links: {
            demo: "#",
            github: "#"
        },
        color: "from-cyan-500/20 to-blue-600/20"
    },
    {
        title: "Project Two",
        description: "Another great project to showcase your skills.",
        tags: ["React", "Node.js"],
        links: {
            demo: "#",
            github: "#"
        },
        color: "from-violet-500/20 to-purple-600/20"
    },
    {
        title: "Project Three",
        description: "Innovative solution for a complex problem.",
        tags: ["Design", "Research"],
        links: {
            demo: "#",
            github: "#"
        },
        color: "from-emerald-500/20 to-teal-600/20"
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>
                    <p className="mt-4 text-gray-400">A selection of my recent work.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group h-full flex flex-col overflow-hidden border-white/10 bg-white/5 p-0 hover:border-white/20">
                                {/* Placeholder Image Area */}
                                <div className={`h-48 w-full bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500`} />

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    <p className="mt-2 flex-1 text-sm text-gray-400">{project.description}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium text-cyan-400">#{tag}</span>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <Button size="sm" variant="outline" className="w-full" asChild>
                                            <a href={project.links.demo} target="_blank">
                                                <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                            </a>
                                        </Button>
                                        <Button size="sm" variant="ghost" className="w-full" asChild>
                                            <a href={project.links.github} target="_blank">
                                                <Github className="mr-2 h-4 w-4" /> Code
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
