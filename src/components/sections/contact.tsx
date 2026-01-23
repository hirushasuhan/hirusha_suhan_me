"use client";

import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Github, Linkedin, Mail, Link } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
    return (
        <footer id="contact" className="border-t border-white/10 bg-black py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Let's Connect</h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Interested in working together or just want to say hi?
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 text-lg text-cyan-400 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 w-full sm:w-auto"
                            asChild
                        >
                            <a href="mailto:hirushasuhan@outlook.com">
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                <Mail className="mr-2 h-5 w-5 relative z-10" />
                                <span className="relative z-10">Say Hello</span>
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 text-lg text-cyan-400 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 w-full sm:w-auto"
                            asChild
                        >
                            <a href="https://linktr.ee/hirusha.suhan" target="_blank" rel="noopener noreferrer">
                                <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                <Link className="mr-2 h-5 w-5 relative z-10" />
                                <span className="relative z-10">Linktree</span>
                            </a>
                        </Button>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Hirusha Suhan. All rights reserved.
                        </p>
                        <div className="mt-4 flex gap-4 sm:mt-0">
                            <SocialIcon href="https://github.com/hirushasuhan" icon={Github} label="Github" />
                            <SocialIcon href="https://www.linkedin.com/in/hirusha-suhan/" icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
