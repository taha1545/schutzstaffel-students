"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function XPBar({
  currentXP = 0,
  maxXP = 1000,
  level = 1,
  animateGain = false,
  gainAmount = 0,
  className
}) {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="font-display text-sm uppercase tracking-widest text-white">
            LEVEL {level}
          </span>
        </div>
        <span className="font-mono text-xs text-gray-400">
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()}
        </span>
      </div>

      {/* XP Bar Container */}
      <div className="relative h-3 bg-[#1c252e] border border-white/10 clip-path-angle overflow-hidden">
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-red-500 relative"
        >
          {/* Scanning line effect */}
          <motion.div
            animate={{
              left: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>

        {/* Milestone marker */}
        <div className="absolute top-0 right-0 h-full w-1 bg-accent/50" />
      </div>

      {/* XP Gain Notification */}
      {animateGain && gainAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 2 }}
          className="text-center text-accent font-mono text-sm font-bold uppercase tracking-wider"
        >
          +{gainAmount} XP
        </motion.div>
      )}
    </div>
  );
}
