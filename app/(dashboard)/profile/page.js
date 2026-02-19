"use client";

import { motion } from "framer-motion";
import { HexagonalBadgeGrid } from "@/components/HexagonalBadge";
import { XPBar } from "@/components/XPBar";
import { Trophy, Zap, Pencil } from "lucide-react";

// Mock data
const BADGES = [
  { id: 1, label: "First Mission", isUnlocked: true },
  { id: 2, label: "Speedrunner", isUnlocked: true },
  { id: 3, label: "Perfectionist", isUnlocked: true },
  { id: 4, label: "Week Warrior", isUnlocked: true },
  { id: 5, label: "Legendary", isUnlocked: true },
  { id: 6, label: "Sharpshooter", isUnlocked: true },
  { id: 7, label: "Team Player", isUnlocked: true },
  { id: 8, label: "Code Master", isUnlocked: true }
];

const QUICK_STATS = [
  { label: "Missions Complete", value: 24, color: "text-primary" },
  { label: "Current Streak", value: "5 days", color: "text-orange-500" },
  { label: "Badges Earned", value: `${BADGES.length}`, color: "text-yellow-400" },
  { label: "Rank Progress", value: "68%", color: "text-accent" }
];

export default function ProfilePage() {
  const currentXP = 3450;
  const currentLevel = 12;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Top Profile Section */}
        <motion.div variants={itemVariants} className="relative flex flex-col md:flex-row items-center gap-8 bg-[#1c252e] border border-white/10 clip-path-angle p-6">

          {/* Edit Profile Button */}
          <button className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-primary text-black font-bold text-xs rounded-md hover:scale-105 transition">
            <Pencil className="w-4 h-4" /> Edit Profile
          </button>

          {/* Profile Info */}
          <div className="flex items-center gap-6">
            <img
              src={`https://i.pravatar.cc/150?img=1`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover"
            />
            <div className="space-y-1">
              <h2 className="text-3xl font-display font-black text-white">Agent Shadow</h2>
              <p className="text-gray-400 font-mono text-sm">Grade: ING-4</p>
              <p className="text-gray-400 font-mono text-sm">shadow@schutzstaffel.SS</p>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm font-mono text-gray-400">Level: <span className="text-primary font-bold">{currentLevel}</span></p>
                <p className="text-sm font-mono text-gray-400">XP: <span className="text-accent font-bold">{currentXP.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Experience Stats + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Experience Stats */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-[#1c252e] border border-white/10 clip-path-angle p-8 space-y-6"
          >
            <h3 className="text-xl font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" /> Experience Stats
            </h3>

            {/* XP Bar */}
            <div className="space-y-3">
              <p className="text-sm font-mono text-gray-400 uppercase">Current XP & Level</p>
              <XPBar currentXP={currentXP} maxXP={5000} level={currentLevel} />
            </div>
          </motion.div>


          {/* Right: Quick Stats */}
          <motion.div variants={itemVariants} className="bg-[#1c252e] border border-white/10 clip-path-angle p-8 h-fit sticky top-20 space-y-4">
            <h3 className="text-lg font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" /> Quick Stats
            </h3>
            <div className="space-y-4">
              {QUICK_STATS.map((stat) => (
                <div key={stat.label} className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                  <p className="text-xs text-gray-500 font-mono uppercase mb-1">{stat.label}</p>
                  <p className={`text-2xl font-display font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Badges */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-3">
            <span className="w-1 h-10 bg-primary" /> Badges Earned
          </h3>
          <p className="text-gray-400 font-mono text-sm">
            Unlock badges by completing objectives. All currently unlocked badges are shown.
          </p>
          <HexagonalBadgeGrid badges={BADGES.filter(b => b.isUnlocked)} className="py-8" />
        </motion.div>
      </motion.div>
    </div>
  );
}
