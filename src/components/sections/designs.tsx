"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as LinkIcon, ExternalLink } from "lucide-react";

// Initial designs configuration
// Update 'link' with the actual URL you want to redirect to
const designs = [
    {
        id: 1,
        title: "Design 1",
        image: "/design 1.png",
        link: "https://www.canva.com/design/DAGvArUJ0gE/UUNyLvYeeD-vGskwYklznw/view?utm_content=DAGvArUJ0gE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc8d0062db7", // Replace with actual link
    },
    {
        id: 2,
        title: "Design 2",
        image: "/design 2.png",
        link: "https://www.canva.com/design/DAGqVsBi6lI/7lsizbk2NE4MdHQB_o4w6Q/edit?utm_content=DAGqVsBi6lI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", // Replace with actual link
    },
    {
        id: 3,
        title: "Design 3",
        image: "/design 3.png",
        link: "https://www.canva.com/design/DAG5gpM9zPE/1dpqcPEml6qFlWLhETRRPw/view?utm_content=DAG5gpM9zPE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcea41b8850", // Replace with actual link
    },
    {
        id: 4,
        title: "Design 4",
        image: "/design 4.jpg",
        link: "https://www.facebook.com/share/p/1DpXEj9Mgd/", // Replace with actual link
    },
    {
        id: 5,
        title: "Design 5",
        image: "/design 5.png",
        link: "https://www.canva.com/design/DAG6brk-O8c/DtwRFlTDRDLT5FVLqUB2Yw/edit?utm_content=DAG6brk-O8c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", // Replace with actual link
    },
];

export function Designs() {
    return (
        <section id="designs" className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Design Portfolio</h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        A curated collection of my designs, illustrations, flyers and graphic experiments.
                    </p>
                </motion.div>

                {/* Infinite Marquee Container */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {/* Duplicate designs twice to ensure seamless loop on large screens */}
                        {[...designs, ...designs].map((design, index) => (
                            <div
                                key={`${design.id}-${index}`}
                                className="group relative flex-none w-[300px] aspect-square overflow-hidden rounded-xl bg-white/5"
                            >
                                <a
                                    href={design.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full w-full"
                                >
                                    <Image
                                        src={design.image}
                                        alt={design.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex flex-col items-center gap-2 text-white">
                                            <ExternalLink className="h-8 w-8 text-cyan-400" />
                                            <span className="font-medium">View Project</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
