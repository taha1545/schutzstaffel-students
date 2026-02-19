"use client";

import { StatsCard } from "@/components/StatsCard";
import { TacticalLayout } from "@/components/TacticalLayout";
import { XPBar } from "@/components/XPBar";
import { StreakCounter, NextObjectiveCard } from "@/components/NextObjectiveCard";
import { Trophy, Target, Flame, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  //
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-12"
      >
        {/* Welcome Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <h2 className="text-gray-400 font-mono uppercase tracking-widest text-sm mb-2">
              ▶ AGENT STATUS REPORT
            </h2>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter italic">
              Welcome Back
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-accent font-display text-2xl font-bold">{new Date().toLocaleDateString()}</p>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
              System Online
            </p>
          </div>
        </motion.div>

        {/* Agent Status Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* XP Bar */}
          <div className="lg:col-span-2">
            <div className="bg-[#1c252e] border border-white/10 clip-path-angle p-6">
              <XPBar currentXP={3450} maxXP={5000} level={12} />
            </div>
          </div>

          {/* Streak Counter */}
          <div>
            <StreakCounter currentStreak={5} bestStreak={12} />
          </div>
        </motion.div>

        {/* Next Objective */}
        <motion.div variants={itemVariants}>
          <NextObjectiveCard
            title="Data Structures Mastery"
            description="Complete 3 LeetCode problems on binary trees. Each correct solution is 25 XP."
            difficulty="hard"
            xpReward={100}
            estimatedTime="45 min"
            onStart={() => console.log("Starting mission")}
          />
        </motion.div>

        {/* Performance Stats */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-primary" />
            Performance Metrics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="Missions Complete"
              value={24}
              icon={<Target className="w-10 h-10 text-accent" />}
              trend="+8 this week"
            />
            <StatsCard
              label="Current Streak"
              value={5}
              icon={<Flame className="w-10 h-10 text-orange-500" />}
              trend="Outstanding!"
            />
            <StatsCard
              label="Badges Earned"
              value={8}
              icon={<Trophy className="w-10 h-10 text-yellow-400" />}
              trend="3 Legendary"
            />
            <StatsCard
              label="XP This Month"
              value="12.4K"
              icon={<Zap className="w-10 h-10 text-primary" />}
              trend="+2.3K last week"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-accent" />
            Quick Access
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/goals">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Target className="w-8 h-8 text-accent mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">Missions</p>
              </motion.div>
            </Link>

            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">Profile</p>
              </motion.div>
            </Link>

            <Link href="/leaderboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">Leaderboard</p>
              </motion.div>
            </Link>

            <Link href="/calendar">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Clock className="w-8 h-8 text-accent mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">Calendar</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
