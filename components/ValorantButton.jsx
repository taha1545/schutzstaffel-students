"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ValorantButton({
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    children,
    ...props
}) {
    const baseStyles =
        "relative font-display uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center clip-path-angle focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-primary text-white hover:bg-red-600 border border-transparent shadow-[0_4px_14px_0_rgba(255,70,85,0.39)]",
        secondary:
            "bg-secondary text-white hover:bg-secondary/80 border border-transparent",
        outline:
            "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10",
        ghost: "bg-transparent text-white hover:bg-white/10",
    };

    const sizes = {
        sm: "px-4 py-1 text-xs h-8",
        md: "px-6 py-3 text-sm h-12",
        lg: "px-8 py-4 text-base h-14",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {variant === "primary" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-white/20 clip-path-angle" />
            )}
        </motion.button>
    );
}
