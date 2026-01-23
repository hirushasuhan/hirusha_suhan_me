"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "Designs", href: "#designs" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Consider "at top" if scrollY is less than 100px
            setIsAtTop(window.scrollY < 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isVisible = isAtTop || isHovered || isOpen;

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 font-mono pointer-events-none"
        >
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div
                    className="mx-auto max-w-6xl pointer-events-auto pt-6 px-6"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* 
                      Glass container:
                      - bg-white/5 for subtle glass
                      - backdrop-blur-md for blur
                      - border-white/10 for definition
                    */}
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md transition-all sm:px-8 shadow-lg shadow-black/20">
                        {/* Logo / Brand */}
                        <a href="#" className="relative group text-lg font-bold text-white">
                            <span className="text-cyan-400">&lt;</span>
                            H
                            <span className="text-cyan-400">/&gt;</span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center gap-8 md:flex">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="relative text-sm font-medium text-gray-400 transition-colors hover:text-white"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.name}
                                    {hoveredIndex === index && (
                                        <motion.span
                                            layoutId="navbar-hover"
                                            className="absolute -inset-x-3 -inset-y-2 rounded-lg bg-white/10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-2 rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-md md:hidden shadow-xl"
                            >
                                <div className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-sm font-medium text-gray-300 hover:text-cyan-400"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="text-cyan-500 mr-2">&gt;</span>
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Invisible hover trigger area at the top when hidden */}
            {!isVisible && (
                <div
                    className="absolute top-0 left-0 w-full h-8 pointer-events-auto"
                    onMouseEnter={() => setIsHovered(true)}
                />
            )}
        </nav>
    );
}
