"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { KeyRound, AlertCircle, Loader2 } from "lucide-react";
import { ValorantButton } from "@/components/ValorantButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login, loginGoogle } from "@/services/authServices";

export default function LoginPage() {
    //
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    //
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!code.trim()) {
            setError("Please enter your unique access code.");
            return;
        }
        //
        try {
            setIsLoading(true);
            const response = await login({ uniqueCode: code });
            if (response?.token) {
                localStorage.setItem("token", response.token);
                router.push("/dashboard");
            } else {
                setError("Login failed. Invalid response from server.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid access code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setError("");
            await loginGoogle();
        } catch (err) {
            setError("Failed to initialize Google login.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black italic uppercase text-white tracking-tight">
                        Agent Login
                    </h1>
                    <p className="text-gray-400 text-sm font-mono mt-4">
                        Access your academy dashboard
                    </p>
                </div>
                <div className="bg-[#1c252e] border border-white/10 p-10 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-transparent" />
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-3 font-mono tracking-wider">
                                Unique Access Code
                            </label>
                            <div className="relative">
                                <KeyRound
                                    size={16}
                                    className="absolute left-4 top-4 text-primary/50"
                                />
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter your unique code"
                                    disabled={isLoading}
                                    className="w-full bg-[#0F1923] border border-white/10 pl-12 pr-4 py-3 text-white text-sm tracking-widest uppercase focus:border-primary focus:ring-1 focus:ring-primary transition disabled:opacity-50"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Your code was provided during enrollment.
                            </p>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20"
                            >
                                <AlertCircle size={16} />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        {/* Login Button */}
                        <ValorantButton
                            fullWidth
                            size="lg"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <Loader2 size={18} className="animate-spin" />
                                    AUTHENTICATING...
                                </span>
                            ) : (
                                "LOGIN WITH CODE"
                            )}
                        </ValorantButton>
                        {/* Divider */}
                        <div className="flex items-center gap-4 py-4">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-gray-500 font-mono">
                                OR CONTINUE WITH
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 border border-white/10 bg-[#0F1923] py-3 text-sm text-white hover:border-primary hover:bg-[#16202a] transition disabled:opacity-50"
                        >
                            <Image
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                                height={20}
                                width={20}
                            />
                            Continue with Google
                        </button>
                    </form>
                </div>
                {/* Signup Link */}
                <p className="text-center text-gray-500 text-sm mt-8 font-mono">
                    New agent?{" "}
                    <Link
                        href="/auth/signup"
                        className="text-accent hover:text-accent/80 underline"
                    >
                        Enroll here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}