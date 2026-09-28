import { FAQS } from "@/lib/seo";

// Server component on purpose: the answers are in the static HTML that crawlers
// and AI bots read, and <details> works without JavaScript.
export function Faq() {
    return (
        <section id="faq" className="py-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Quick Answers</h2>
                <p className="mt-4 text-gray-400">
                    Common questions about Hirusha Suhan and his work.
                </p>

                <div className="mt-10 space-y-3">
                    {FAQS.map((item) => (
                        <details
                            key={item.q}
                            className="group rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-lg transition-colors open:border-cyan-500/30 open:bg-white/[0.07] hover:border-white/20"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
                                <h3 className="text-base font-semibold sm:text-lg">{item.q}</h3>
                                <span
                                    aria-hidden="true"
                                    className="shrink-0 text-xl text-cyan-400 transition-transform duration-300 group-open:rotate-45"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
