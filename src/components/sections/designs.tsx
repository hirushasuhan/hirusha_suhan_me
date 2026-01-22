"use client";

import { motion } from "framer-motion";

export function Designs() {
    return (
        <section id="designs" className="py-20 px-4 bg-white/5 mx-4 md:mx-auto max-w-6xl rounded-3xl my-20">
            <div className="container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Design Portfolio</h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        A curated collection of my UI/UX designs, illustrations, and graphic experiments.
                        (Coming into this space soon!)
                    </p>

                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 animate-pulse" />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
