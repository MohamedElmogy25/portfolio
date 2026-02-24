/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                },
                bio: {
                    dark: '#050505',
                    card: '#0a0a0a',
                    border: '#1a1a1a',
                    muted: '#111111',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'bio-gradient': 'linear-gradient(135deg, #050505 0%, #0a0f0a 50%, #050505 100%)',
                'emerald-glow': 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
                'cyan-glow': 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%)',
            },
            boxShadow: {
                'emerald': '0 0 20px rgba(16,185,129,0.3), 0 0 60px rgba(16,185,129,0.1)',
                'cyan': '0 0 20px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)',
                'emerald-sm': '0 0 10px rgba(16,185,129,0.2)',
                'cyan-sm': '0 0 10px rgba(6,182,212,0.2)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(16,185,129,0.6), 0 0 80px rgba(16,185,129,0.2)' },
                },
            },
        },
    },
    plugins: [],
}
