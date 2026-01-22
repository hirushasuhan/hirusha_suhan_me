import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const variants = {
            primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]",
            secondary: "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_-3px_rgba(124,58,237,0.4)]",
            outline: "border border-white/20 hover:bg-white/10 text-white hover:border-white/40",
            ghost: "hover:bg-white/5 text-gray-300 hover:text-white",
        };

        const sizes = {
            sm: "h-8 px-4 text-xs",
            md: "h-10 px-6 text-sm",
            lg: "h-12 px-8 text-base",
        }

        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
