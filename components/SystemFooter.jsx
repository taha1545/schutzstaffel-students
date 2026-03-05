

export function SystemFooter() {
    return (
        <footer className="flex justify-between items-end text-[10px] font-mono text-gray-600 uppercase pt-12 border-t border-white/5">
            <div className="space-y-1">
                <p>Terminal: SH-04</p>
                <p>Build: v2.0.4-PRO</p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                    <span className="text-white/40">Network Stable</span>
                </div>
                <p>© 2026 Schutzstaffel Labs</p>
            </div>
        </footer>
    );
}