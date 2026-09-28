"use client";

import { motion } from "framer-motion";
import { DesignShowcase, type DesignProject } from "@/components/motion/design-showcase";

const designProjects: DesignProject[] = [
    {
        id: 1,
        title: "UvaXtreme v2 Teaser",
        subtitle: "Official launch announcement for the IEEEXtreme 19.0 programming competition.",
        organization: "IEEE Computer Society • UWU Student Branch",
        category: "Event Branding",
        image: "/designs/design-1.webp",
        link: "https://www.canva.com/design/DAGvArUJ0gE/UUNyLvYeeD-vGskwYklznw/view?utm_content=DAGvArUJ0gE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc8d0062db7",
    },
    {
        id: 2,
        title: "Hope for Tomorrow",
        subtitle: "Social welfare campaign artwork supporting underprivileged children's education.",
        organization: "Faculty of Applied Sciences Student Union",
        category: "Social Impact",
        image: "/designs/design-2.webp",
        link: "https://www.canva.com/design/DAGqVsBi6lI/7lsizbk2NE4MdHQB_o4w6Q/view?utm_content=DAGqVsBi6lI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
        id: 3,
        title: "Maze Master 2026",
        subtitle: "Futuristic robotic competition flyer announcing the university logic & robotics kickoff.",
        organization: "IEEE Robotics & Automation Society",
        category: "Competition Flyer",
        image: "/designs/design-3.webp",
        link: "https://www.canva.com/design/DAG5gpM9zPE/1dpqcPEml6qFlWLhETRRPw/view?utm_content=DAG5gpM9zPE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcea41b8850",
    },
    {
        id: 4,
        title: "Community Outreach Celebration",
        subtitle: "Commemorative project visual acknowledging delegation and volunteer contributions.",
        organization: "Faculty Students' Union • UWU",
        category: "Community & Editorial",
        image: "/designs/design-4.webp",
        link: "https://www.facebook.com/share/p/1DpXEj9Mgd/",
    },
    {
        id: 5,
        title: "Organizing Committee Roster",
        subtitle: "Public visibility and program management team recognition poster for UvaXtreme v2.",
        organization: "IEEE Computer Society & Student Branch",
        category: "Team Recognition",
        image: "/designs/design-5.webp",
        link: "https://www.canva.com/design/DAG6brk-O8c/DtwRFlTDRDLT5FVLqUB2Yw/view?utm_content=DAG6brk-O8c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
        id: 6,
        title: "IEEE SLSYWC'26 Gala Night",
        subtitle: "An iconic celebration night flyer for the 15th anniversary congress.",
        organization: "IEEE Sri Lanka Section • SLSAC",
        category: "Event Branding",
        image: "/designs/slsywc-gala-night.webp",
        link: "https://www.facebook.com/IEEESLSAC",
    },
    {
        id: 7,
        title: "SLSYWC'26 Date Reveal",
        subtitle: "Official date announcement visual (18, 19, 20 September 2026).",
        organization: "IEEE Sri Lanka Section Congress",
        category: "Announcement",
        image: "/designs/slsywc-date-reveal.webp",
        link: "https://www.facebook.com/IEEESLSAC",
    },
    {
        id: 8,
        title: "Chapter Stalls — SLSYWC'26",
        subtitle: "Showcase, connect, and explore the global network of IEEE societies.",
        organization: "IEEE Sri Lanka Section",
        category: "Event Flyer",
        image: "/designs/slsywc-chapter-stalls.webp",
        link: "https://www.facebook.com/IEEESLSAC",
    },
    {
        id: 9,
        title: "Best Congress Memories",
        subtitle: "15 Years of unforgettable moments and delegate engagement campaign.",
        organization: "IEEE SLSAC • Congress 2026",
        category: "Social Campaign",
        image: "/designs/slsywc-memories.webp",
        link: "https://www.facebook.com/IEEESLSAC",
    },
    {
        id: 10,
        title: "Aluth Dinak TV Broadcast",
        subtitle: "Rupavahini National Television feature interview on IEEE SLSYWC'26.",
        organization: "Rupavahini TV • IEEE Sri Lanka Section",
        category: "Media & Broadcast",
        image: "/designs/slsywc-aluth-dinak.webp",
        link: "https://youtu.be/Cib9flngzNI",
    },
    {
        id: 11,
        title: "Congress 2026 Organizing Committee",
        subtitle: "Executive & sub-committee recognition board (Public Visibility Member: Hirusha Suhan).",
        organization: "IEEE Sri Lanka Section Congress",
        category: "Committee Board",
        image: "/designs/slsywc-committee.webp",
        link: "https://www.facebook.com/IEEESLSAC",
    },
    {
        id: 12,
        title: "Computer Society Junior Committee",
        subtitle: "Official induction notice for junior committee leadership (PV Member: Hirusha Suhan).",
        organization: "IEEE Computer Society Chapter • UWU",
        category: "Leadership Board",
        image: "/designs/cs-junior-committee.webp",
        link: "https://www.linkedin.com/in/hirusha-suhan/",
    },
    {
        id: 13,
        title: "Faculty T-Shirt Collection Notice",
        subtitle: "Official merchandise release and collection announcement for undergraduates.",
        organization: "Faculty of Applied Sciences Students' Union",
        category: "Apparel & Notice",
        image: "/designs/faculty-tshirt-notice.webp",
        link: "https://www.facebook.com/share/p/1DpXEj9Mgd/",
    },
    {
        id: 14,
        title: "IEEEXtreme 24h Competition",
        subtitle: "Call for programmers to represent UWU in the world's largest 24-hour hackathon.",
        organization: "IEEE Student Branch • UWU",
        category: "Hackathon Flyer",
        image: "/designs/ieeextreme-represent.webp",
        link: "https://www.canva.com",
    },
];

export function Designs() {
    return (
        <section id="designs" data-section="designs" className="py-24 px-4 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-mono text-cyan-400 mb-4">
                        <span>EVENT BRANDING &amp; GRAPHICS</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                        Design Portfolio
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Curated collection of event branding, visual identities, robotics competition flyers, and community campaign artworks created for university societies.
                    </p>
                </motion.div>

                <DesignShowcase designs={designProjects} />
            </div>
        </section>
    );
}
