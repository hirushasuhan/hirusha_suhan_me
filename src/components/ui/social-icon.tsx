import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SocialIconProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function SocialIcon({ href, icon: Icon, label }: SocialIconProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-cyan-500/20 hover:text-cyan-400 hover:scale-110"
            aria-label={label}
        >
            <Icon className="h-5 w-5" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-all group-hover:scale-100 group-hover:opacity-100">
                {label}
            </span>
        </Link>
    );
}
