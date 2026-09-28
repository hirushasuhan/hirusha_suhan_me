"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Terminal, QrCode, LucideIcon } from "lucide-react";
import Image from "next/image";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { asset } from "@/lib/asset";

interface ProjectItem {
    title: string;
    description: string;
    tags: string[];
    links: {
        demo?: string;
        fallbackDemo?: string;
        github: string;
    };
    color: string;
    image?: string;
    icon?: LucideIcon;
}

const projects: ProjectItem[] = [
    {
        title: "Serandib Grand — Luxury Hotel Reservation System",
        description: "A full-stack hotel reservation platform deployed on Wasmer Edge via WCGI. Features role-based access control (Admin, Manager, Front Desk, Guest), real-time room availability, reservations, and customer invoicing.",
        tags: ["PHP 8", "MySQL", "Wasmer Edge", "WCGI", "Full-Stack"],
        links: {
            demo: "https://serandib-grand.wasmer.app",
            github: "https://github.com/hirushasuhan/serandib_grand"
        },
        color: "from-amber-500/20 to-orange-600/20",
        image: "/serandib-grand.jpg"
    },
    {
        title: "UniAlloc — University Resource & Workload System",
        description: "A role-based academic resource allocation platform engineered for university Dean's Offices. Features real-time lecturer workload tracking, hierarchical delegation, overload alerts, and student supervisor project routing.",
        tags: ["TypeScript", "Next.js", "Tailwind CSS", "MySQL", "Role-Based Auth"],
        links: {
            demo: "https://www.unialloc.app/login",
            fallbackDemo: "https://uniallocsystem.vercel.app/",
            github: "https://github.com/hirushasuhan/UniAlloc_host"
        },
        color: "from-indigo-500/20 to-purple-600/20",
        image: "/unialloc.jpg"
    },
    {
        title: "Visa Consultation Platform",
        description: "Created a full-featured visa consultation website with appointment scheduling and automated eligibility checkers, improving client interaction and response times.",
        tags: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        links: {
            demo: "https://hirushasuhan.github.io/web-project-Visa-consultation-Company/index.html",
            github: "https://github.com/hirushasuhan/web-project-Visa-consultation-Company"
        },
        color: "from-cyan-500/20 to-blue-600/20",
        image: "/visa consultation.webp"
    },
    {
        title: "Bus Fleet Management System",
        description: "A comprehensive Java-based system for the management of public transportation fleets in Sri Lanka. Engineered with robust OOP design patterns, relational MySQL data models, and automated scheduling logic.",
        tags: ["Java", "MySQL", "OOP", "Relational DB"],
        links: {
            github: "https://github.com/hirushasuhan/bus-management-system"
        },
        color: "from-violet-500/20 to-purple-600/20",
        image: "/bus-management-system.webp"
    },
    {
        title: "Financial Expense Tracker",
        description: "A desktop personal finance management application developed in Java. Built with modern Object-Oriented principles for tracking income streams, monitoring expense trends, and generating automated financial summaries.",
        tags: ["Java", "OOP", "FinTech", "Data Handling"],
        links: {
            github: "https://github.com/hirushasuhan/Expense-_Tracker"
        },
        color: "from-emerald-500/20 to-teal-600/20",
        image: "/Expense-Tracker.webp"
    },
    {
        title: "Console Banking System",
        description: "A console-based banking management system engineered in C. Implements administrative workflows, customer account creation, secure deposit and withdrawal transaction processing, and persistent file records.",
        tags: ["C", "Systems Programming", "File I/O", "Data Structures"],
        links: {
            github: "https://github.com/hirushasuhan/Banking-system-C"
        },
        color: "from-rose-500/20 to-red-600/20",
        icon: Terminal
    },
    {
        title: "Bulk Mail & Dynamic QR Ticket Generator",
        description: "An automated event ticketing pipeline in JavaScript. Generates personalized dynamic QR code tickets and executes automated bulk email dispatching to streamline event check-in and attendee management.",
        tags: ["JavaScript", "Automation", "QR Code", "Email Dispatch"],
        links: {
            github: "https://github.com/hirushasuhan/bulk-mail-and-auto-qr-and-ticket-generate-system"
        },
        color: "from-blue-500/20 to-indigo-600/20",
        icon: QrCode
    },
    {
        title: "Explore More on GitHub",
        description: "Discover additional open-source projects, university assignments, experiments, and upcoming repositories on GitHub.",
        tags: ["GitHub", "Open Source", "Repositories"],
        links: {
            github: "https://github.com/hirushasuhan"
        },
        color: "from-gray-500/20 to-slate-600/20"
    },
];

export function Projects() {
    const handleDemoClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        primaryUrl?: string,
        fallbackUrl?: string
    ) => {
        if (!primaryUrl || !fallbackUrl) return;

        e.preventDefault();

        const newTab = window.open("about:blank", "_blank");
        if (newTab) {
            try {
                newTab.opener = null;
                newTab.document.title = "Connecting to Demo...";
                newTab.document.body.style.cssText =
                    "background:#090d16;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0;";
                newTab.document.body.innerHTML = `
                    <div style="width:36px;height:36px;border:3px solid rgba(6,182,212,0.2);border-top-color:#06b6d4;border-radius:50%;animation:s 0.8s linear infinite;margin-bottom:16px;"></div>
                    <div style="font-size:14px;color:#94a3b8;">Connecting to live demo...</div>
                    <style>@keyframes s{to{transform:rotate(360deg)}}</style>
                `;
            } catch {
                // Ignore cross-origin / document write restrictions if any
            }
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        fetch(primaryUrl, { mode: "no-cors", signal: controller.signal })
            .then(() => {
                clearTimeout(timeoutId);
                if (newTab) {
                    newTab.location.href = primaryUrl;
                } else {
                    window.open(primaryUrl, "_blank");
                }
            })
            .catch(() => {
                clearTimeout(timeoutId);
                if (newTab) {
                    newTab.location.href = fallbackUrl;
                } else {
                    window.open(fallbackUrl, "_blank");
                }
            });
    };

    return (
        <section id="projects" data-section="projects" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>
                    <p className="mt-4 text-gray-400">A selection of my recent software and web engineering work.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2">
                    {projects.map((project) => {
                        const isOther = project.title === "Explore More on GitHub";
                        return (
                            <DepthReveal key={project.title} className="h-full">
                                <TiltCard maxTilt={6}>
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
                                            <div className={`relative h-48 w-full bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                                                {project.image ? (
                                                    <Image
                                                        src={asset(project.image)}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : project.icon ? (
                                                    <project.icon className="h-16 w-16 text-cyan-400/50 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300" />
                                                ) : (
                                                    <Github className="h-16 w-16 text-white/20 group-hover:text-white transition-colors" />
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col p-6">
                                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                                <p className="mt-2 flex-1 text-sm text-gray-400">{project.description}</p>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="text-xs font-medium text-cyan-400">#{tag}</span>
                                                    ))}
                                                </div>

                                                <div className="mt-6 flex gap-3">
                                                    {project.links.demo && (
                                                        <Button size="sm" variant="outline" className="w-full" asChild>
                                                            <a
                                                                href={project.links.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => handleDemoClick(e, project.links.demo, project.links.fallbackDemo)}
                                                            >
                                                                <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button size="sm" variant="ghost" className="w-full" asChild>
                                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                                            <Github className="mr-2 h-4 w-4" /> Code
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    )}
                                </TiltCard>
                            </DepthReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
