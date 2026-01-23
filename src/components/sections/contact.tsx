"use client";

import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Github, Linkedin, Mail } from "lucide-react";
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

                    <div className="mt-8 flex justify-center gap-6">
                        <Button size="lg" className="rounded-full px-8 text-lg" asChild>
                            <a href="mailto:hirushasuhan@outlook.com">
                                <Mail className="mr-2 h-5 w-5" /> Say Hello
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
