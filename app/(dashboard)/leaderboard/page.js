"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Crown, Medal } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Agent Phoenix", xp: 18500, level: 25 },
  { rank: 2, name: "Agent Viper", xp: 17200, level: 24 },
  { rank: 3, name: "Agent Sage", xp: 16800, level: 23 },
  { rank: 4, name: "Agent Shadow", xp: 15450, level: 22 },
  { rank: 5, name: "Agent Cypher", xp: 14900, level: 21 },
  { rank: 6, name: "Agent Omen", xp: 13200, level: 20 },
  { rank: 7, name: "Agent Reyna", xp: 12100, level: 19 },
  { rank: 8, name: "Agent Jett", xp: 11500, level: 18 },
  { rank: 9, name: "Agent Harbor", xp: 10800, level: 17 },
  { rank: 10, name: "Agent Breach", xp: 9950, level: 16 }
];

export default function LeaderboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-xl font-display font-black text-primary">#{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-500/30 to-transparent border-yellow-500/50";
    if (rank === 2) return "from-gray-400/20 to-transparent border-gray-400/30";
    if (rank === 3) return "from-orange-600/20 to-transparent border-orange-600/30";
    return "from-primary/10 to-transparent border-primary/20";
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-gray-400 font-mono uppercase tracking-widest text-sm">
            ▶ COMPETITIVE SCOREBOARD
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter">
            Leaderboard
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-2xl">
            Rise through the ranks. Compete with fellow agents. Claim your position at the top.
          </p>
        </motion.div>

        {/* Your Rank Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary/20 to-transparent border-2 border-primary clip-path-angle p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-gray-400 mb-2">Your Rank</p>
              <h2 className="text-4xl font-display font-black text-white mb-2">
                #4 • Agent Shadow
              </h2>
              <p className="text-gray-300 font-mono text-sm">
                15,450 XP • Level 22
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary font-display font-black text-5xl italic">
                4
              </p>
              <p className="text-xs text-gray-400 font-mono uppercase">Position</p>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <motion.div variants={containerVariants} className="space-y-3">
          {LEADERBOARD_DATA.map((player) => (
            <motion.div
              key={player.rank}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className={`border-2 clip-path-angle p-6 relative overflow-hidden transition-all duration-300 cursor-pointer group border-white/10 bg-[#1c252e]`}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Rank */}
                <div className="flex items-center gap-4 min-w-fit">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(player.rank)}
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-gray-500">Rank</p>
                    <p className="text-lg font-display font-black">#{player.rank}</p>
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-display font-bold text-white truncate">
                    {player.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">Level {player.level}</p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="text-xs font-mono uppercase text-gray-500">XP</p>
                  <p className="text-xl font-display font-bold text-primary">
                    {(player.xp / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              {/* Highlight border for top 3 */}
              {player.rank <= 3 && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 right-0 w-8 h-8 border-2 border-current opacity-50"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 text-center"
        >
          <p className="text-gray-400 font-mono text-sm uppercase">
            Leaderboard updates every hour • Last updated: 2 minutes ago
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
