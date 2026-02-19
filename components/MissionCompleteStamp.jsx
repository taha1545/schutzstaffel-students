"use client";

import React from "react";
import { motion } from "framer-motion";

export function MissionCompleteStamp({ onComplete }) {
  const screenShakeVariants = {
    initial: { x: 0, y: 0 },
    shake: {
      x: [-10, 10, -10, 10, -10, 0],
      y: [-10, 10, -10, 10, -10, 0],
      rotate: [-1, 1, -1, 1, -1, 0]
    }
  };

  const stampVariants = {
    hidden: { scale: 0, rotate: -30, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      rotate: [(-30, 0)],
      opacity: [0, 1, 1]
    },
    exit: {
      scale: 0,
      rotate: 30,
      opacity: 0
    }
  };

  const blastVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: {
      scale: [0, 1.5, 2],
      opacity: [1, 0.5, 0]
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="shake"
      variants={screenShakeVariants}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
    >
      {/* Blast origin points */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          initial="initial"
          animate="animate"
          variants={blastVariants}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          className="absolute w-32 h-32 rounded-full border-2 border-primary"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-64px",
            marginTop: "-64px",
            transform: `rotate(${idx * 120}deg)`
          }}
        />
      ))}

      {/* Main Stamp */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={stampVariants}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,70,85,0.3)",
              "0 0 60px rgba(255,70,85,0.6)",
              "0 0 20px rgba(255,70,85,0.3)"
            ]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute inset-0 rounded-full -z-10"
        />

        {/* Stamp Container */}
        <div className="relative w-48 h-48 bg-[#0F1923] border-4 border-primary transform -rotate-12 flex items-center justify-center clip-path-angle shadow-2xl">
          {/* Inner border */}
          <div className="absolute inset-4 border-2 border-primary/50 flex items-center justify-center clip-path-angle">
            {/* Text */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="text-primary font-display text-4xl font-black uppercase tracking-tightest leading-none italic"
              >
                MISSION
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-accent font-display text-5xl font-black uppercase tracking-tightest leading-none italic"
              >
                COMPLETE
              </motion.div>

              {/* Decorative lines */}
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
              />
            </div>
          </div>

          {/* Corners accent */}
          {[
            "top-0 left-0",
            "top-0 right-0",
            "bottom-0 left-0",
            "bottom-0 right-0"
          ].map((pos, idx) => (
            <motion.div
              key={idx}
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`absolute w-4 h-4 border-2 border-primary ${pos}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Text explosions */}
      {["EXCELLENT!", "ELITE PERFORMANCE!", "+50 XP"].map((text, idx) => (
        <motion.div
          key={idx}
          initial={{
            opacity: 0,
            x: 0,
            y: 0
          }}
          animate={{
            opacity: [1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, -100 - idx * 50]
          }}
          transition={{
            duration: 1.2,
            delay: 0.4 + idx * 0.15
          }}
          className="absolute left-1/2 top-1/2 text-primary font-display font-bold uppercase text-xl tracking-wider"
          style={{ marginLeft: "-50px", marginTop: "-20px" }}
        >
          {text}
        </motion.div>
      ))}
    </motion.div>
  );
}
