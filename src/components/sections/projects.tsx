"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const projects = [
    {
        title: "visa consultation company website project",
        description: "Created a visa consultation website using HTML, CSS, and JavaScript with features like appointment scheduling and visa eligibility checkers, improving client interaction and reducing response time by 40%..",
        tags: ["HTML", "CSS", "JavaScript"],
        links: {
            demo: "https://hirushasuhan.github.io/web-project-Visa-consultation-Company/",
            github: "https://github.com/hirushasuhan/web-project-Visa-consultation-Company"
        },
        color: "from-cyan-500/20 to-blue-600/20"
    },
    {
        title: "bus-management-system",
        description: "A comprehensive Java-based application for the efficient management of public transportation fleets in Sri Lanka.The system demonstrates robust object-oriented principles, business logic, and integration with MySQL databases, providing a complete real-world solution.",
        tags: ["JAVA", "mySql", "OOP"],
        links: {
            demo: "https://www.linkedin.com/posts/hirusha-suhan_java-mysql-oop-activity-7370892577698402306-Oxc5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4q4JYBRak-51f0DiMI7ctLvGcwYVv-jvI",
            github: "https://github.com/hirushasuhan/bus-management-system"
        },
        color: "from-violet-500/20 to-purple-600/20"
    },
    {
        title: "Expense-Tracker",
        description: "The Expense Tracker is a comprehensive Java-based financial management application designed to help you take control of your personal finances. Built with modern Object-Oriented Programming principles, this application provides an intuitive and powerful platform for tracking income, monitoring expenses, and generating detailed financial reports.",
        tags: ["JAVA", "OOP"],
        links: {
            demo: "https://www.linkedin.com/posts/hirusha-suhan_expensetracker-java-oop-activity-7379905967729209345-42fw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4q4JYBRak-51f0DiMI7ctLvGcwYVv-jvI",
            github: "https://github.com/hirushasuhan/Expense-Tracker"
        },
        color: "from-emerald-500/20 to-teal-600/20"
    },
    {
        title: "Other",
        description: "Explore more of my work including experiments, contributions, and upcoming projects on GitHub.",
        tags: ["GitHub", "Open Source"],
        links: {
            demo: "https://github.com/hirushasuhan",
            github: "https://github.com/hirushasuhan"
        },
        color: "from-gray-500/20 to-slate-600/20"
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

                <div className="grid gap-8 md:grid-cols-2">
                    {projects.map((project, index) => {
                        const isOther = project.title === "Other";
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isOther ? (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block h-full"
                                    >
                                        <Card className="h-full flex flex-col overflow-hidden border-white/10 bg-white/5 p-0 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className={`h-48 w-full bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                                                <Github className="h-16 w-16 text-white/20 group-hover:text-white transition-colors" />
                                            </div>

                                            <div className="flex flex-1 flex-col p-6 items-center text-center">
                                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                    {project.title} <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-400">{project.description}</p>
                                            </div>
                                        </Card>
                                    </a>
                                ) : (
                                    <Card className="group h-full flex flex-col overflow-hidden border-white/10 bg-white/5 p-0 hover:border-white/20">
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
                                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                                    </a>
                                                </Button>
                                                <Button size="sm" variant="ghost" className="w-full" asChild>
                                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="mr-2 h-4 w-4" /> Code
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
