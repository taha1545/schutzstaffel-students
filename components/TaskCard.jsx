"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ValorantButton } from "./ValorantButton";

export function TaskCard({
  id,
  title,
  description,
  difficulty = "normal",
  xpReward = 50,
  isCompleted = false,
  subtasks = [],
  onExecute,
  onComplete,
  className
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedSubtasks, setCompletedSubtasks] = useState(new Set());

  const difficultyColors = {
    easy: "text-green-400 border-green-400/30",
    normal: "text-blue-400 border-blue-400/30",
    hard: "text-orange-400 border-orange-400/30",
    tactical: "text-primary border-primary/30"
  };

  const handleSubtaskToggle = (idx) => {
    const newSet = new Set(completedSubtasks);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCompletedSubtasks(newSet);
  };

  const allSubtasksCompleted = subtasks.length > 0 && completedSubtasks.size === subtasks.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-[#1c252e] border border-white/10 relative overflow-hidden group",
        "clip-path-angle hover:border-white/20 transition-all duration-300",
        isCompleted && "opacity-60",
        className
      )}
    >
      {/* Difficulty Indicator */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity")} />

      <div className="p-6">
        {/* Header */}
        <motion.div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex items-start justify-between gap-4"
          whileHover={{ x: 4 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: isCompleted ? 360 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500" />
                )}
              </motion.div>

              <h3 className="font-display text-lg text-white uppercase tracking-wide">
                {title}
              </h3>
            </div>

            <p className="text-gray-400 text-sm font-mono ml-8">
              {description}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 mt-4 ml-8 text-xs font-mono">
              <span className={cn("px-2 py-1 border rounded", difficultyColors[difficulty])}>
                {difficulty.toUpperCase()}
              </span>
              <span className="text-accent flex items-center gap-1">
                <Zap className="w-3 h-3" />
                +{xpReward} XP
              </span>
            </div>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1"
          >
            <div className="w-5 h-5 border border-primary/50 clip-path-angle" />
          </motion.div>
        </motion.div>

        {/* Subtasks */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-4"
        >
          {subtasks.length > 0 && (
            <div className="ml-8 space-y-2 border-l border-white/10 pl-4 py-4">
              {subtasks.map((subtask, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer group/subtask"
                  whileHover={{ x: 2 }}
                >
                  <input
                    type="checkbox"
                    checked={completedSubtasks.has(idx)}
                    onChange={() => handleSubtaskToggle(idx)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className={cn("text-sm text-gray-300 transition-all", completedSubtasks.has(idx) && "line-through opacity-50")}>
                    {subtask}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6 ml-8">
            {!isCompleted && (
              <ValorantButton
                size="sm"
                onClick={() => {
                  if (allSubtasksCompleted || subtasks.length === 0) {
                    onComplete?.();
                  } else {
                    onExecute?.();
                  }
                }}
                className="flex-1"
              >
                {subtasks.length > 0 ? `EXECUTE (${completedSubtasks.size}/${subtasks.length})` : "EXECUTE"}
              </ValorantButton>
            )}
            {isCompleted && (
              <div className="text-primary font-mono text-xs font-bold uppercase tracking-widest">
                ✓ COMPLETED
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Accent Corner */}
      <motion.div
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 right-0 w-2 h-2 bg-primary opacity-0 transition-opacity"
      />
    </motion.div>
  );
}
