"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { XPBar } from "@/components/XPBar";
import {
  StreakCounter,
  NextObjectiveCard,
} from "@/components/NextObjectiveCard";
import { Trophy, Target, Flame, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { dashboard as getDashboard } from "@/services/dashboradServices";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  //
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        setData(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  //
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        Failed to load dashboard
      </div>
    );
  }
  //
  const {
    goals = [],
    badges = [],
    level = 1,
    xpPoints = 0,
    currentStreak = 0,
    progressMetrics = {},
  } = data;
  const nextGoal = goals.find((goal) => goal.progressPercentage < 100);
  //
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
            <p className="text-accent font-display text-2xl font-bold">
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
              System Online
            </p>
          </div>
        </motion.div>

        {/* XP & Streak */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <span className="text-sm font-mono uppercase tracking-wide text-gray-400 mb-2 block">
              ▶ CURRENT PROGRESS
            </span>
            <div className="bg-[#1c252e] border border-white/10 clip-path-angle p-6">
              <XPBar
                currentXP={xpPoints}
                maxXP={level * 1000}
                level={level}
              />
            </div>
          </div>

          <div>
            <StreakCounter
              currentStreak={currentStreak}
            />
          </div>
        </motion.div>

        {/* Next Objective */}
        {nextGoal && (
          <motion.div variants={itemVariants}>
            <NextObjectiveCard
              title={nextGoal.name}
              description={nextGoal.description}
              difficulty="medium"
              xpReward={100}
              estimatedTime={`${nextGoal.duration} months`}
              onStart={() => console.log("Starting mission")}
            />
          </motion.div>
        )}

        {/* Performance Stats */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-primary" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Missions Completed */}
            <StatsCard
              label="Missions Completed"
              value={progressMetrics.completedTasks || 0}
              icon={<Target className="w-10 h-10 text-accent" />}
              trend={`${progressMetrics.totalAssignedTasks || 0} total tasks`}
            />
            {/* Total Goals */}
            <StatsCard
              label="Total Goals"
              value={goals.length}
              icon={<Flame className="w-10 h-10 text-orange-500" />}
              trend="Active Missions"
            />
            {/* Badges Earned */}
            <StatsCard
              label="Badges Earned"
              value={badges.length}
              icon={<Trophy className="w-10 h-10 text-yellow-400" />}
              trend="Achievements unlocked"
            />
            {/* Overall Progress */}
            <StatsCard
              label="Overall Progress"
              value={`${progressMetrics.overallPercentage || 0}%`}
              icon={<Zap className="w-10 h-10 text-primary" />}
              trend="Completion Rate"
            />
          </div>
        </motion.div>


        {/* Quick Access */}
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
                <p className="font-display font-bold uppercase text-sm text-white">
                  Missions
                </p>
              </motion.div>
            </Link>

            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">
                  Profile
                </p>
              </motion.div>
            </Link>

            <Link href="/leaderboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">
                  Leaderboard
                </p>
              </motion.div>
            </Link>

            <Link href="/calendar">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 cursor-pointer hover:border-primary transition-colors group text-center"
              >
                <Clock className="w-8 h-8 text-accent mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="font-display font-bold uppercase text-sm text-white">
                  Calendar
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
