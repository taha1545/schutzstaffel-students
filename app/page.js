"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SystemBackgroundGrid } from "@/components/SystemBackgroundGrid";
import { SystemFooter } from "@/components/SystemFooter";
import { ValorantButton } from "@/components/ValorantButton";
import { DecryptionLoader } from "@/components/SkeletonLoader";
import { useAuth } from "@/hooks/useAuth";
import { checkServer } from "@/services/server";
import { Suspense } from "react";
import TokenHandler from "@/components/TokenHandler";
import { CookieConsent } from "@/components/CookieConsent";




const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  //
  const { loading, isAuthenticated } = useAuth();

  const [statusMessage, setStatusMessage] = useState(
    "ESTABLISHING CONNECTION..."
  );
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    const init = async () => {
      if (isAuthenticated) {
        setStatusMessage("ACCESS GRANTED.");
        setIsChecking(false);
      } else {
        try {
          setStatusMessage("INITIALIZING SYSTEM SCAN...");
          await checkServer();
          setIsChecking(false);
        } catch (error) {
          setStatusMessage("SERVER OFFLINE. RETRYING...");
          setTimeout(init, 5000);
        }
      }
    };

    init();
  }, [loading, isAuthenticated]);

  const isLoggedIn = isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background relative overflow-hidden">
      <Suspense fallback={null}>
        <TokenHandler />
      </Suspense>
      <SystemBackgroundGrid />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isChecking && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "circOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          >
            <DecryptionLoader text={statusMessage} speed="fast" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative lg:w-3/5 h-[45vh] lg:h-screen bg-black overflow-hidden z-10">
        <div className="absolute inset-0 bg-linear-to-r from-primary/25 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-110" />
        <div className="absolute bottom-16 left-8 lg:left-16 z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={!isChecking ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white leading-[0.85] tracking-tighter">
              schutzstaffel <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600">
                Academy
              </span>
            </h1>
            <p className="mt-8 text-gray-400 font-mono text-sm md:text-base max-w-sm border-l-2 border-primary pl-6 py-1">
              PROTOCOL 2.0: Unified task management for tactical academic superiority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="lg:w-2/5 flex items-center justify-center p-8 lg:p-20 relative z-20">
        {!isChecking && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md space-y-10"
          >
            <header className="space-y-2">
              <h2 className="text-white text-3xl font-black uppercase tracking-widest italic">
                {isLoggedIn ? "Access Authorized" : "Initialize Entry"}
              </h2>

              <div className="h-0.5 w-full bg-white/5 relative">
                <div className="absolute h-full w-1/4 bg-primary left-0" />
              </div>

              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                {isLoggedIn
                  ? "Agent Profile Synchronized"
                  : "Credentials Required"}
              </p>
            </header>

            <div className="space-y-4">
              {isLoggedIn ? (
                <motion.div variants={itemVariants}>
                  <Link href="/dashboard" className="block">
                    <ValorantButton
                      fullWidth
                      size="lg"
                      className="h-20 text-xl tracking-widest"
                    >
                      ENTER COMMAND CENTER
                    </ValorantButton>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants}>
                    <Link href="/auth" className="block">
                      <ValorantButton
                        fullWidth
                        size="lg"
                        className="h-16 text-lg"
                      >
                        IDENTIFY (LOGIN)
                      </ValorantButton>
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Link href="/auth/signup" className="block">
                      <ValorantButton
                        fullWidth
                        size="lg"
                        variant="secondary"
                        className="h-16 text-lg"
                      >
                        RECRUIT (SIGN UP)
                      </ValorantButton>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            <SystemFooter />
          </motion.div>
        )}
      </section>
    </div>
  );
}
