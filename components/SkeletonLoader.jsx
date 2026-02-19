"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkeletonLoader({ className, variant = "card" }) {
  const variants = {
    card: "h-24 rounded-none clip-path-angle",
    bar: "h-4 rounded-none",
    circle: "w-12 h-12 rounded-full",
    text: "h-4 w-full rounded-none",
    title: "h-8 w-3/4 rounded-none clip-path-angle"
  };

  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        backgroundSize: "200% 100%"
      }}
      className={cn(
        "bg-[#1c252e] border border-white/10",
        variants[variant],
        className
      )}
    />
  );
}

export function SkeletonListLoader({ count = 5, itemHeight = "h-20" }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonLoader key={idx} variant="card" className={itemHeight} />
      ))}
    </div>
  );
}

// Tactical "Decryption" loader
export function DecryptionLoader({ text = "DECRYPTING DATA...", speed = "normal" }) {
  const speedMap = {
    slow: 0.05,
    normal: 0.08,
    fast: 0.12
  };

  const chars = text.split("");

  return (
    <div className="text-center space-y-8">
      <div className="inline-block">
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 0.5,
              delay: idx * speedMap[speed],
              repeat: Infinity
            }}
            className="inline-block text-primary font-display text-2xl font-bold tracking-widest"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Loading bar */}
      <div className="h-1 w-64 mx-auto bg-[#1c252e] border border-white/10 clip-path-angle overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </div>
  );
}
