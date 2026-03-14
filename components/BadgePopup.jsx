"use client";

import React from "react";
import { motion } from "framer-motion";

export function BadgePopup({ badge, onComplete }) {

    const imageUrl = badge.iconPath
        ? `${process.env.NEXT_PUBLIC_API_URL}/image/${iconPath}`
        : "/badge-placeholder.png";

    const screenShakeVariants = {
        initial: { x: 0, y: 0 },
        shake: {
            x: [-10, 10, -10, 10, -10, 0],
            y: [-10, 10, -10, 10, -10, 0],
            rotate: [-1, 1, -1, 1, -1, 0],
            transition: { duration: 0.5 }
        }
    };

    const stampVariants = {
        hidden: { scale: 0, rotate: -30, opacity: 0 },
        visible: {
            scale: [0, 1.2, 1],
            rotate: [-30, -12],
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
            scale: [0, 1.5, 2.5],
            opacity: [1, 0.5, 0]
        }
    };

    const glowVariants = {
        animate: {
            boxShadow: [
                "0 0 20px rgba(var(--primary-rgb), 0.3)",
                "0 0 80px rgba(var(--primary-rgb), 0.6)",
                "0 0 20px rgba(var(--primary-rgb), 0.3)"
            ]
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="shake"
            variants={screenShakeVariants}
            onAnimationComplete={onComplete}
            className=" min-h-screen fixed inset-0 pointer-events-none flex items-center justify-center z-50 bg-black/60 backdrop-blur-md"
        >
            {/* Blast origin points */}
            {[0, 1, 2].map((idx) => (
                <motion.div
                    key={idx}
                    initial="initial"
                    animate="animate"
                    variants={blastVariants}
                    transition={{
                        duration: 0.8,
                        delay: idx * 0.1,
                        ease: "easeOut"
                    }}
                    className="absolute w-40 h-40 rounded-full border-4 border-primary"
                    style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-80px",
                        marginTop: "-80px",
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
                transition={{
                    duration: 0.6,
                    ease: "easeOut"
                }}
                className="relative"
            >
                {/* Outer glow */}
                <motion.div
                    animate="animate"
                    variants={glowVariants}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-primary/10 -z-10"
                />

                {/* Stamp Container */}
                <div className="relative w-64 h-64 bg-[#0F1923] border-4 border-primary flex flex-col items-center justify-center shadow-2xl overflow-hidden">

                    <div className="absolute inset-4 border-2 border-primary/50 flex flex-col items-center justify-center p-4">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="text-primary font-display text-2xl font-black uppercase tracking-widest italic mb-2"
                        >
                            NEW BADGE
                        </motion.div>

                        <motion.div
                            animate={{ scale: [0, 1.2, 1], rotate: [-10, 10, 0] }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-24 h-24 my-2 flex items-center justify-center"
                        >
                            {badge.iconPath ? (
                                <img src={imageUrl} alt={badge.name} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-6xl">🏆</span>
                            )}
                        </motion.div>

                        <div className="text-accent font-display text-4xl font-black uppercase italic text-center mt-2 leading-none">
                            {badge.name}
                        </div>

                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4 absolute bottom-4" />
                    </div>

                    {/* Corners */}
                    {["top-0 left-0 border-t-4 border-l-4", "top-0 right-0 border-t-4 border-r-4", "bottom-0 left-0 border-b-4 border-l-4", "bottom-0 right-0 border-b-4 border-r-4"].map((pos, idx) => (
                        <div key={idx} className={`absolute w-6 h-6 border-primary ${pos}`} />
                    ))}
                </div>
            </motion.div>

            {/* Floating Text */}
            {["ACHIEVEMENT UNLOCKED!", "AWESOME!", "+100 XP"].map((text, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: -150 - (idx * 40), x: (idx - 1) * 50 }}
                    transition={{ duration: 1.5, delay: 0.5 + (idx * 0.1) }}
                    className="absolute text-primary font-bold uppercase text-xl text-center w-full"
                >
                    {text}
                </motion.div>
            ))}
        </motion.div>
    );
}