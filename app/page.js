"use client";

import { useState } from "react";
import { ValorantButton } from "@/components/ValorantButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Landing() {
  // 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const changeAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background relative overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Left Hero Section */}
      <div className="relative lg:w-3/5 h-[50vh] lg:h-screen bg-black overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000" />

        <div className="absolute bottom-12 left-12 z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black italic uppercase text-white leading-none tracking-tight"
          >
            schutzstaffel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">
              Academy
            </span>
          </motion.h1>

          <p className="mt-6 text-gray-400 font-mono text-lg max-w-md border-l-2 border-primary pl-4">
            Gamified task management for elite students. Compete, achieve, dominate.
          </p>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="lg:w-2/5 flex items-center justify-center p-8 lg:p-16 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-sm space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-white text-4xl font-black uppercase tracking-widest italic">
              Initialize Access
            </h2>
            <div className="h-1 w-20 bg-primary mt-3" />
            <p className="text-gray-500 font-mono text-sm mt-4">
              ▶ Authentication required.
            </p>
          </motion.div>

          {/* Conditional Rendering */}
          {isLoggedIn ? (
            <motion.div variants={itemVariants}>
              <Link href="/dashboard">
                <ValorantButton fullWidth size="lg" className="h-16 text-lg">
                  ACCESS DASHBOARD
                </ValorantButton>
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <Link href="/auth">
                  <ValorantButton fullWidth size="lg" className="h-16 text-lg">
                    CREDENTIALS LOGIN
                  </ValorantButton>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link href="/auth/signup">
                  <ValorantButton
                    fullWidth
                    size="lg"
                    variant="secondary"
                    className="h-16 text-lg"
                  >
                    SIGN UP
                  </ValorantButton>
                </Link>
              </motion.div>
            </>
          )}

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between text-xs font-mono text-gray-600 uppercase pt-8 border-t border-white/10"
          >
            <span>System v2.0.4</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Online
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
