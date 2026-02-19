/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: ".5625rem",
                md: ".375rem",
                sm: ".1875rem",
            },

            colors: {
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",

                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },

                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
                },

                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
                },

                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },

                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },

                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },

                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground:
                        "hsl(var(--destructive-foreground) / <alpha-value>)",
                },

                ring: "hsl(var(--ring) / <alpha-value>)",

                chart: {
                    1: "hsl(var(--chart-1) / <alpha-value>)",
                    2: "hsl(var(--chart-2) / <alpha-value>)",
                    3: "hsl(var(--chart-3) / <alpha-value>)",
                    4: "hsl(var(--chart-4) / <alpha-value>)",
                    5: "hsl(var(--chart-5) / <alpha-value>)",
                },

                status: {
                    online: "rgb(34 197 94)",
                    away: "rgb(245 158 11)",
                    busy: "rgb(239 68 68)",
                    offline: "rgb(156 163 175)",
                },
            },

            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
                display: ["var(--font-display)"],
                body: ["var(--font-body)"],
            },

            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "screen-shake": {
                    "0%, 100%": { transform: "translate(0, 0) rotateZ(0deg)" },
                    "10%": { transform: "translate(-2px, -2px) rotateZ(-0.5deg)" },
                    "20%": { transform: "translate(-2px, 2px) rotateZ(0.5deg)" },
                    "30%": { transform: "translate(2px, 2px) rotateZ(0.5deg)" },
                    "40%": { transform: "translate(2px, -2px) rotateZ(-0.5deg)" },
                    "50%": { transform: "translate(-2px, 2px) rotateZ(-0.5deg)" },
                    "60%": { transform: "translate(-2px, -2px) rotateZ(0.5deg)" },
                    "70%": { transform: "translate(2px, 2px) rotateZ(0.5deg)" },
                    "80%": { transform: "translate(2px, -2px) rotateZ(-0.5deg)" },
                    "90%": { transform: "translate(-2px, -2px) rotateZ(0.5deg)" },
                },
                "pulse-glow": {
                    "0%, 100%": {
                        boxShadow: "0 0 5px rgba(255, 70, 85, 0.3), 0 0 10px rgba(255, 70, 85, 0.1)"
                    },
                    "50%": {
                        boxShadow: "0 0 20px rgba(255, 70, 85, 0.6), 0 0 30px rgba(255, 70, 85, 0.3)"
                    }
                },
                "scan": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" }
                },
                "data-decay": {
                    "0%": {
                        opacity: "1",
                        textShadow: "0 0 0 rgba(0, 245, 255, 0.5)"
                    },
                    "50%": {
                        opacity: "0.8",
                        textShadow: "0 0 10px rgba(0, 245, 255, 0.8)"
                    },
                    "100%": {
                        opacity: "0",
                        textShadow: "0 0 20px rgba(0, 245, 255, 0.2)"
                    }
                },
                "hologram-flicker": {
                    "0%, 100%": { opacity: "1" },
                    "5%": { opacity: "0.8" },
                    "10%": { opacity: "1" },
                    "15%": { opacity: "0.9" },
                    "20%": { opacity: "1" },
                },
                "border-pulse": {
                    "0%, 100%": { borderColor: "rgba(255, 70, 85, 0.3)" },
                    "50%": { borderColor: "rgba(255, 70, 85, 0.8)" }
                },
                "scanlines": {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(4px)" }
                }
            },

            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "screen-shake": "screen-shake 0.5s ease-in-out",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "scan": "scan 2s linear infinite",
                "data-decay": "data-decay 3s ease-out",
                "hologram-flicker": "hologram-flicker 4s ease-in-out infinite",
                "border-pulse": "border-pulse 1.5s ease-in-out infinite",
                "scanlines": "scanlines 0.15s linear infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
