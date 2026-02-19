import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


export function StatsCard({ label, value, icon, trend, className }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "bg-[#1c252e] border border-white/10 p-6 clip-path-angle relative overflow-hidden group",
                className
            )}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity scale-150 transform translate-x-2 -translate-y-2">
                {icon}
            </div>

            <div className="relative z-10">
                <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">{label}</h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-white">{value}</span>
                    {trend && (
                        <span className="text-primary text-xs font-mono bg-primary/10 px-1.5 py-0.5 rounded">
                            {trend}
                        </span>
                    )}
                </div>
            </div>

            {/* Decorative Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </motion.div>
    );
}
