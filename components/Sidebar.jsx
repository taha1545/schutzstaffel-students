"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- important for dynamic active link
import {
    LayoutDashboard,
    Target,
    Calendar,
    Trophy,
    User,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar({ userName = "Agent Cadet", userXp = "0", userImage = null }) {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/goals", label: "Missions", icon: Target },
        { href: "/calendar", label: "Schedule", icon: Calendar },
        { href: "/leaderboard", label: "Rankings", icon: Trophy },
        { href: "/profile", label: "Profile", icon: User },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#0F1923] border-r border-white/10 fixed left-0 top-0 z-50">

            {/* Branding */}
            <div className="p-8 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                <h1 className="text-3xl font-black text-white tracking-tighter text-center italic">
                    schutzstaffel
                    <span className="text-primary block text-[10px] tracking-[0.5em] not-italic font-mono mt-1 opacity-80">
                        ACADEMY
                    </span>
                </h1>
            </div>

            {/* Profile Card */}
            <div className="p-4 mx-4 mt-6 mb-4 bg-white/[0.03] border-l-2 border-primary relative group transition-colors hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 bg-[#1f2326] border border-white/10">
                        {userImage ? (
                            <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="text-primary/60 w-5 h-5" />
                            </div>
                        )}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0F1923] rotate-45 border-b border-white/20" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-white font-bold tracking-tight truncate uppercase text-[13px]">
                            {userName}
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] text-primary font-mono uppercase tracking-widest">
                                LVL 12 // {userXp} XP
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {links.map((link) => {
                    const isActive = pathname === link.href; // dynamic active
                    const Icon = link.icon;

                    return (
                        <Link key={link.href} href={link.href} className="block group">
                            <div
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 transition-all duration-150 relative",
                                    isActive
                                        ? "bg-primary text-white translate-x-1"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-white" />
                                )}
                                <Icon
                                    className={cn(
                                        "w-5 h-5",
                                        isActive ? "text-white" : "group-hover:text-primary transition-colors"
                                    )}
                                />
                                <span className="tracking-[0.2em] uppercase text-[11px] font-black italic">
                                    {link.label}
                                </span>
                                {isActive && (
                                    <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#0F1923] translate-x-1.5 translate-y-1.5 rotate-45" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-primary cursor-pointer transition-all group">
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="tracking-widest uppercase text-[11px] font-bold">Terminate Session</span>
                </div>
            </div>
        </aside>
    );
}
