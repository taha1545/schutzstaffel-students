"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";

export function TacticalLayout({
  children,
  showSidebar = true,
  sidebarProps = {}
}) {
  const pageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: -50
    },
    enter: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      x: 50,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      {/* Sidebar */}
      {showSidebar && <Sidebar {...sidebarProps} />}

      {/* Main Content */}
      <main className="lg:w-[calc(100%-256px)] lg:ml-64 pt-2">
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </main>

      {/* Decorative scanlines effect */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="scanlines"
              x="0"
              y="0"
              width="100%"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scanlines)" />
        </svg>
      </div>
    </div>
  );
}
