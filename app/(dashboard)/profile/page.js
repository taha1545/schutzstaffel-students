"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HexagonalBadgeGrid } from "@/components/HexagonalBadge";
import { XPBar } from "@/components/XPBar";
import { Trophy, Zap, Pencil, User } from "lucide-react";
import { dashboard, userBadges } from "@/services/dashboradServices";
import { updateUser } from "@/services/authServices";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import ProfileUpdateCard from "@/components/ProfileUpdateCard";


const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function ProfilePage() {
  //
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  // 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dash = await dashboard();
        setDashboardData(dash.data);
        //
        if (user?.id) {
          const badgesRes = await userBadges(user.id);
          setBadges(badgesRes.userBadges.map(b => b.badge));
        }
      } catch (err) {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  const userImage = user?.imagePath
    ? `${BASE_URL}/${user.imagePath}`
    : null;
  const userName = user?.fullName;

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!dashboardData) return <div className="min-h-screen flex items-center justify-center text-red-400">No data found</div>;

  const { xpPoints, level, currentStreak, progressMetrics } = dashboardData;
  const completedBadges = badges;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      {editOpen && (
        <ProfileUpdateCard
          user={user}
          onClose={() => setEditOpen(false)}
          onUpdated={() => window.location.reload()}
        />
      )}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto space-y-12">

        {/* Top Profile Section */}
        <motion.div variants={itemVariants} className="relative flex flex-col md:flex-row items-center gap-8 bg-[#1c252e] border border-white/10 clip-path-angle p-6">
          <button onClick={() => setEditOpen(true)}
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-primary text-black font-bold text-xs 
            rounded-md hover:scale-105 transition">
            <Pencil className="w-4 h-4" /> Edit Profile
          </button>

          <div className="flex items-center gap-6">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={44}
                height={44}
                className="w-24 h-24 rounded-full border-2 border-primary object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-primary object-cover flex justify-center items-center ">
                <User className="text-primary/60 w-5 h-5 " />
              </div>
            )}
            <div className="space-y-1">
              <h2 className="text-3xl font-display font-black text-white">{user?.fullName || "Unknown"}</h2>
              <p className="text-gray-400 font-mono text-sm">Grade: {user?.grade || "-"}</p>
              <p className="text-gray-400 font-mono text-sm">{user?.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm font-mono text-gray-400">Level: <span className="text-primary font-bold">{level}</span></p>
                <p className="text-sm font-mono text-gray-400">XP: <span className="text-accent font-bold">{xpPoints.toLocaleString()}</span></p>
              </div>
              <p className="text-sm font-mono text-gray-400">Current Streak: <span className="text-orange-500 font-bold">{currentStreak} days</span></p>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: XP + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* XP Stats */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-[#1c252e] border border-white/10 clip-path-angle p-8 space-y-8"
          >
            <h3 className="text-xl font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" /> Experience Stats
            </h3>

            {/* XP Overview */}
            <div className="space-y-3">
              <p className="text-sm font-mono text-gray-400 uppercase">
                Current XP & Level
              </p>

              <XPBar currentXP={xpPoints} maxXP={5000} level={level} />

              <div className="flex justify-between text-xs font-mono text-gray-400 mt-2">
                <span>{xpPoints.toLocaleString()} XP</span>
                <span>
                  {Math.max(5000 - xpPoints, 0).toLocaleString()} XP to next level
                </span>
              </div>
            </div>

            {/* Extra Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">
                  Current Level
                </p>
                <p className="text-2xl font-display font-black text-primary">
                  {level}
                </p>
              </div>

              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">
                  Total XP
                </p>
                <p className="text-2xl font-display font-black text-accent">
                  {xpPoints.toLocaleString()}
                </p>
              </div>

              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">
                  Completion Rate
                </p>
                <p className="text-2xl font-display font-black text-green-400">
                  {progressMetrics.overallPercentage}%
                </p>
              </div>
            </div>
          </motion.div>


          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="bg-[#1c252e] border border-white/10 clip-path-angle p-8 h-fit sticky top-20 space-y-4">
            <h3 className="text-lg font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" /> Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">Missions Complete</p>
                <p className="text-2xl font-display font-black text-primary">{progressMetrics.completedTasks}/{progressMetrics.totalAssignedTasks}</p>
              </div>
              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">Current Streak</p>
                <p className="text-2xl font-display font-black text-orange-500">{currentStreak} days</p>
              </div>
              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">Badges Earned</p>
                <p className="text-2xl font-display font-black text-yellow-400">{completedBadges.length}</p>
              </div>
              <div className="bg-[#0F1923] border border-white/10 p-4 rounded-md">
                <p className="text-xs text-gray-500 font-mono uppercase mb-1">Overall Progress</p>
                <p className="text-2xl font-display font-black text-accent">{dashboardData.progressMetrics.overallPercentage}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-3">
            <span className="w-1 h-10 bg-primary" /> Badges Earned
          </h3>
          <p className="text-gray-400 font-mono text-sm">
            Unlock badges by completing objectives. All currently unlocked badges are shown.
          </p>
          {badges && (
            <HexagonalBadgeGrid badges={badges} className="py-8" />
          )
          }
        </motion.div>
      </motion.div>
    </div>
  );
}
