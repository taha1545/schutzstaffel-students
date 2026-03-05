"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";
import { ranking } from "@/services/dashboradServices";
import { useAuth } from "@/hooks/useAuth";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await ranking();
        if (res.success && res.users) {
          setUsers(res.users);
        }
      } catch (err) {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

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

  const formatXP = (xp) => (xp >= 1000 ? `${(xp / 1000).toFixed(1)}K` : xp);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white">
        Loading leaderboard...
      </div>
    );
  }

  // 
  const userRankIndex = users.findIndex(u => u.id === user?.id);
  const userRank = userRankIndex !== -1 ? userRankIndex + 1 : null;
  const userData = userRankIndex !== -1 ? users[userRankIndex] : null;

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
        {userData && (
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-r from-primary/20 to-transparent border-2 border-primary clip-path-angle p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase text-gray-400 mb-2">Your Rank</p>
                <h2 className="text-4xl font-display font-black text-white mb-2">
                  #{userRank} • {userData.fullName}
                </h2>
                <p className="text-gray-300 font-mono text-sm">
                  {userData.xpPoints} XP • Level {userData.level}
                </p>
              </div>
              <div className="text-right">
                <p className="text-primary font-display font-black text-5xl italic">
                  {userRank}
                </p>
                <p className="text-xs text-gray-400 font-mono uppercase">Position</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div variants={containerVariants} className="space-y-3">
          {users.map((player, index) => (
            <motion.div
              key={player.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className={`border-2 clip-path-angle p-6 relative overflow-hidden transition-all duration-300 cursor-pointer group border-white/10 bg-[#1c252e]`}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Rank */}
                <div className="flex items-center gap-4 min-w-fit">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(index + 1)}
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-gray-500">Rank</p>
                    <p className="text-lg font-display font-black">#{index + 1}</p>
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-display font-bold text-white truncate">
                    {player.fullName}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">Level {player.level}</p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="text-xs font-mono uppercase text-gray-500">XP</p>
                  <p className="text-xl font-display font-bold text-primary">{formatXP(player.xpPoints)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 text-center"
        >
          <p className="text-gray-400 font-mono text-sm uppercase">
            Leaderboard updates every hour
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
