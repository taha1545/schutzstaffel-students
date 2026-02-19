"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HexagonalBadge({
  icon: Icon,
  label,
  description,
  isUnlocked = true,
  rarity = "common",
  className,
  index = 0
}) {
  const rarityColors = {
    common: {
      bg: "bg-gray-600/20",
      border: "border-gray-400/50",
      text: "text-gray-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(156,163,175,0.4)]"
    },
    rare: {
      bg: "bg-blue-600/20",
      border: "border-blue-400/50",
      text: "text-blue-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]"
    },
    epic: {
      bg: "bg-purple-600/20",
      border: "border-purple-400/50",
      text: "text-purple-300",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    },
    legendary: {
      bg: "bg-primary/20",
      border: "border-primary/50",
      text: "text-primary",
      glow: "group-hover:shadow-[0_0_20px_rgba(255,70,85,0.6)]"
    }
  };

  const colors = rarityColors[rarity] || rarityColors.common;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.1 }}
      className={cn("group relative", className)}
    >
      {/* Hexagon Container */}
      <div
        className={cn(
          "relative w-24 h-24 flex items-center justify-center",
          "border-2 clip-path-hexagon",
          colors.bg,
          colors.border,
          isUnlocked ? colors.glow : "",
          "transition-all duration-300",
          !isUnlocked && "opacity-40 grayscale"
        )}
      >
        {/* Icon */}
        <div className={cn("text-3xl transition-transform", colors.text, isUnlocked && "group-hover:scale-110")}>
          {Icon && <Icon className="w-8 h-8" />}
        </div>

        {/* Locked overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 clip-path-hexagon flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="text-xs font-bold text-gray-400">LOCKED</span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 pointer-events-none"
      >
        <div className={cn("bg-[#0F1923] border clip-path-angle p-3 whitespace-nowrap text-center", colors.border)}>
          <div className={cn("text-xs font-bold uppercase tracking-wider", colors.text)}>
            {label}
          </div>
          {description && (
            <div className="text-[10px] text-gray-400 mt-1">
              {description}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HexagonalBadgeGrid({ badges = [], className }) {
  return (
    <div className={cn("flex flex-wrap gap-6 justify-center", className)}>
      {badges.map((badge, idx) => (
        <HexagonalBadge key={badge.id} {...badge} index={idx} />
      ))}
    </div>
  );
}
