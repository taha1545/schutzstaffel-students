
export function InputField({ icon, label, ...props }) {
    return (
        <div>
            <label className="block text-xs uppercase text-gray-400 mb-3 font-mono tracking-wider">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-4 text-primary/50">
                    {icon}
                </div>
                <input
                    {...props}
                    className="w-full bg-[#0F1923] border border-white/10 pl-12 pr-4 py-3 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
            </div>
        </div>
    );
}