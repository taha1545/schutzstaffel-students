
export function SystemBackgroundGrid() {
    return (
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none">
            <svg width="100%" height="100%">
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
}