"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(null);
    const [countdown, setCountdown] = useState(8);
    const timerRef = useRef(null);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setVisible(true);
    }, []);

    useEffect(() => {
        if (!visible) return;

        timerRef.current = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(timerRef.current);
                    handleDismiss("refused");
                    return 0;
                }
                return c - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [visible]);

    const handleDismiss = (action) => {
        clearInterval(timerRef.current);
        localStorage.setItem("cookie-consent", action);
        setDismissed(action);
        setTimeout(() => setVisible(false), 1200);
    };

    const progressPct = ((8 - countdown) / 8) * 100;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 90, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "circOut" }}
                    className="bg-background fixed bottom-0 left-0 right-0 z-50 border-foreground"
                    style={{
                        borderTop: "1px solid #1a1a1f",
                    }}
                >
                    {/* scanline */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute left-0 right-0 h-[2px]"
                            style={{
                                background:
                                    "linear-gradient(to right, transparent, rgba(255,60,60,0.35), transparent)",
                                animation: "scanline 3s linear infinite",
                            }}
                        />
                    </div>

                    {/* corners */}
                    <div
                        className="absolute top-0 left-0 w-3 h-3"
                        style={{
                            borderTop: "1px solid rgba(220,30,30,.35)",
                            borderLeft: "1px solid rgba(220,30,30,.35)",
                        }}
                    />
                    <div
                        className="absolute top-0 right-0 w-3 h-3"
                        style={{
                            borderTop: "1px solid rgba(220,30,30,.35)",
                            borderRight: "1px solid rgba(220,30,30,.35)",
                        }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">

                        {/* header */}
                        <div className="flex items-center gap-4 mb-5">
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1 text-[10px] tracking-widest uppercase"
                                style={{
                                    background: "rgba(220,30,30,0.12)",
                                    border: "1px solid rgba(220,30,30,0.3)",
                                    color: "#ff3c3c",
                                    animation: "pulse 2s ease-in-out infinite",
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        background: "#ff3c3c",
                                        animation: "blink 1s step-end infinite",
                                    }}
                                />
                                System Alert
                            </span>

                            <span
                                className="text-[11px] tracking-[.2em] uppercase"
                                style={{ color: "rgba(255,255,255,.35)" }}
                            >
                                Protocol 2.0 — Authorization Required
                            </span>

                            <span
                                className="ml-auto text-[10px] tracking-widest font-mono"
                                style={{ color: "rgba(255,255,255,.2)" }}
                            >
                                SES#A-7741
                            </span>
                        </div>

                        {/* body */}
                        <AnimatePresence mode="wait">
                            {!dismissed ? (
                                <motion.div
                                    key="prompt"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    className="flex flex-wrap items-start gap-6"
                                >
                                    <div className="flex-1 min-w-[260px]">

                                        <p
                                            className="text-[11px] tracking-widest mb-2"
                                            style={{ color: "#ff3c3c" }}
                                        >
                                            &gt; INCOMING DIRECTIVE
                                        </p>

                                        <p
                                            className="text-[14px] font-mono leading-relaxed"
                                            style={{ color: "rgba(255,255,255,.65)" }}
                                        >
                                            This system deploys tracking protocols
                                            to monitor agent activity and enhance
                                            operational performance.
                                        </p>

                                        <div
                                            className="flex gap-6 mt-3 text-[10px] tracking-widest uppercase"
                                            style={{ color: "rgba(255,255,255,.22)" }}
                                        >
                                            {[
                                                ["Tracker", "Cookies"],
                                                ["Clearance", "Required"],
                                                ["Expiry", "365 Cycles"],
                                            ].map(([k, v]) => (
                                                <span key={k}>
                                                    {k}:{" "}
                                                    <span style={{ color: "rgba(255,255,255,.45)" }}>
                                                        {v}
                                                    </span>
                                                </span>
                                            ))}
                                        </div>

                                    </div>

                                    <div className="flex gap-3 items-center flex-shrink-0">

                                        <TacticalButton
                                            onClick={() => handleDismiss("refused")}
                                        >
                                            [ REFUSE ]
                                        </TacticalButton>

                                        <TacticalButton
                                            accent
                                            onClick={() => handleDismiss("accepted")}
                                        >
                                            [ AUTHORIZE ]
                                        </TacticalButton>

                                    </div>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="result"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[12px] tracking-widest font-mono"
                                    style={{ color: "#ff3c3c" }}
                                >
                                    &gt;{" "}
                                    {dismissed === "accepted"
                                        ? "Authorization confirmed. Tracking protocols engaged."
                                        : "Request denied. Stealth mode activated."}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* progress */}
                        {!dismissed && (
                            <div className="flex items-center gap-4 mt-5">

                                <span
                                    className="text-[10px] tracking-widest uppercase whitespace-nowrap"
                                    style={{ color: "rgba(255,255,255,.25)" }}
                                >
                                    Auto-dismiss in
                                </span>

                                <div
                                    className="flex-1 h-[3px] relative rounded-full"
                                    style={{ background: "rgba(255,255,255,.08)" }}
                                >
                                    <div
                                        className="absolute inset-y-0 left-0 transition-all duration-1000 linear rounded-full"
                                        style={{
                                            width: `${progressPct}%`,
                                            background: "rgba(255,60,60,.75)",
                                            boxShadow: "0 0 10px rgba(255,60,60,.3)",
                                        }}
                                    />
                                </div>

                                <span
                                    className="text-[10px] tracking-widest font-mono"
                                    style={{ color: "rgba(255,255,255,.3)" }}
                                >
                                    {String(countdown).padStart(2, "0")}s
                                </span>

                            </div>
                        )}

                    </div>

                    <style>{`
                        @keyframes scanline {
                            0% { top:-4px }
                            100% { top:100% }
                        }

                        @keyframes blink {
                            0%,100%{opacity:1}
                            50%{opacity:0}
                        }

                        @keyframes pulse {
                            0%,100%{opacity:.6}
                            50%{opacity:1}
                        }
                    `}</style>

                </motion.div>
            )}
        </AnimatePresence>
    );
}

function TacticalButton({ children, onClick, accent = false }) {
    return (
        <button
            onClick={onClick}
            className="relative overflow-hidden px-5 py-2.5 font-mono text-[10px] tracking-[.18em] uppercase transition-all duration-200"
            style={{
                background: accent ? "rgba(220,30,30,0.08)" : "transparent",
                border: `1px solid ${accent ? "rgba(220,30,30,.4)" : "rgba(255,255,255,.15)"
                    }`,
                color: accent ? "#ff3c3c" : "rgba(255,255,255,.45)",
                clipPath:
                    "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
            onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.borderColor = accent
                    ? "rgba(220,30,30,.8)"
                    : "rgba(255,255,255,.35)";
                btn.style.color = accent ? "#ff3c3c" : "white";
                if (accent)
                    btn.style.boxShadow = "0 0 18px rgba(220,30,30,.25)";
            }}
            onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.borderColor = accent
                    ? "rgba(220,30,30,.4)"
                    : "rgba(255,255,255,.15)";
                btn.style.color = accent ? "#ff3c3c" : "rgba(255,255,255,.45)";
                btn.style.boxShadow = "none";
            }}
        >
            {children}
        </button>
    );
}
