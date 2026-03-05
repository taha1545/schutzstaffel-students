"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function HexagonalBadge({
  id,
  name,
  description,
  iconPath,
  earnedAt,
  className,
  index = 0
}) {
  const [open, setOpen] = useState(false);

  const imageUrl = iconPath
    ? `${process.env.NEXT_PUBLIC_API_URL}/image/${iconPath}`
    : "/badge-placeholder.png";

  return (
    <>
      {/* BADGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setOpen(true)}
        className={cn(
          "group relative cursor-pointer text-center",
          className
        )}
      >
        {/* Tactical Glow Background */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-60 transition duration-300" />

        {/* Hexagon */}
        <div
          className={cn(
            "relative w-28 h-28 flex items-center justify-center",
            "clip-path-hexagon",
            "bg-card border border-border",
            "transition-all duration-300",
            "group-hover:border-primary group-hover:border-pulse"
          )}
        >
          {/* Inner Accent Ring */}
          <div className="absolute inset-2 clip-path-hexagon border border-accent/40" />

          {/* Image */}
          <img
            src={imageUrl}
            alt={name}
            className="w-14 h-14 object-cover rounded-full border border-primary/40 shadow-md"
          />
        </div>

        {/* Title */}
        <p className="mt-3 text-sm font-display text-foreground tracking-wider group-hover:text-primary transition">
          {name}
        </p>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            {/* Tactical Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="relative w-full max-w-md bg-card border border-border clip-path-angle p-8 text-center scanlines">

                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                {/* Image */}
                <div className="mx-auto w-24 h-24 clip-path-hexagon bg-muted flex items-center justify-center border border-primary pulse-glow">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-display text-primary tactical-glow">
                  {name}
                </h3>

                {/* Description */}
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed font-body">
                  {description || "No description available."}
                </p>

                {/* Earned Date */}
                {earnedAt && (
                  <p className="mt-4 text-xs text-accent font-mono">
                    Earned on {new Date(earnedAt).toLocaleDateString()}
                  </p>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2 bg-primary text-primary-foreground font-display tracking-wider glitch-hover"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function HexagonalBadgeGrid({ badges = [], className }) {
  if (!Array.isArray(badges) || badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-12 justify-center", className)}>
      {badges.map((badge, idx) =>
        badge?.id ? (
          <HexagonalBadge
            key={badge.id}
            id={badge.id}
            name={badge.name}
            description={badge.description}
            iconPath={badge.iconPath}
            earnedAt={badge.earnedAt}
            index={idx}
          />
        ) : null
      )}
    </div>
  );
}
