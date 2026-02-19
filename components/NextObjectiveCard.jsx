"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ValorantButton } from "./ValorantButton";
import { Flame, Zap, Target } from "lucide-react";

export function NextObjectiveCard({
  title,
  description,
  difficulty = "normal",
  xpReward = 100,
  estimatedTime = "15 min",
  onStart,
  className
}) {
  const difficultyGradients = {
    easy: "from-green-500 to-green-600",
    normal: "from-blue-500 to-blue-600",
    hard: "from-orange-500 to-orange-600",
    tactical: "from-primary to-red-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative overflow-hidden bg-[#1c252e] border border-white/10",
        "clip-path-angle p-8 cursor-pointer group",
        className
      )}
    >
      {/* Animated Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity",
          `bg-gradient-to-br ${difficultyGradients[difficulty]}`
        )}
      />

      {/* Top Border Glow */}
      <motion.div
        animate={{
          scaleX: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
      />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent">
                NEXT OBJECTIVE
              </span>
            </div>
            <h2 className="font-display text-3xl uppercase text-white tracking-wider">
              {title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 font-mono text-sm leading-relaxed">
          {description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div>
            <span className="block text-xs text-gray-500 font-mono uppercase mb-1">
              Difficulty
            </span>
            <span className={cn("text-sm font-bold uppercase px-2 py-1 border rounded", 
              difficulty === "tactical" ? "border-primary text-primary" : "border-yellow-400/50 text-yellow-300"
            )}>
              {difficulty}
            </span>
          </div>

          <div>
            <span className="block text-xs text-gray-500 font-mono uppercase mb-1">
              Reward
            </span>
            <span className="flex items-center gap-1 text-accent font-bold">
              <Zap className="w-4 h-4" />
              {xpReward} XP
            </span>
          </div>

          <div>
            <span className="block text-xs text-gray-500 font-mono uppercase mb-1">
              Est. Time
            </span>
            <span className="text-sm font-mono text-gray-300">
              {estimatedTime}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          whileHover={{ x: 4 }}
          className="pt-4"
        >
          <ValorantButton
            fullWidth
            onClick={onStart}
            className="group/btn"
          >
            <span className="flex items-center gap-2">
              <span>START MISSION</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="group-hover/btn:visible"
              >
                →
              </motion.span>
            </span>
          </ValorantButton>
        </motion.div>
      </div>

      {/* Corner accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-2 right-2 w-2 h-2 bg-primary"
      />
    </motion.div>
  );
}

export function StreakCounter({
  currentStreak = 0,
  bestStreak = 0,
  className
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="font-display text-sm uppercase text-gray-400 tracking-widest">
        Current Streak
      </h3>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="relative"
      >
        <div className="bg-[#1c252e] border-2 border-primary clip-path-angle p-6 text-center relative overflow-hidden">
          {/* Flame background animation */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-5xl font-display font-black text-primary">
                {currentStreak}
              </span>
              <Flame className="w-6 h-6 text-orange-500" />
            </div>

            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Days Active
            </p>

            {bestStreak > 0 && (
              <p className="text-[10px] text-accent font-mono mt-2">
                Best: {bestStreak} days
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
