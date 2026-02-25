/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ColorHunt palette: #30364f #acbac4 #e1d9bc #f0f0db
                navy: '#30364f',
                slate2: '#acbac4',
                beige: '#e1d9bc',
                cream: '#f0f0db',
                blue: {
                    300: '#c8d4da',
                    400: '#acbac4',
                    500: '#8ca0ad',
                    600: '#6d8491',
                },
                violet: {
                    300: '#ede8d5',
                    400: '#e1d9bc',
                    500: '#cfc79e',
                    600: '#bdb581',
                },
                bio: {
                    dark: '#30364f',
                    card: '#252a40',
                    border: '#3d4460',
                    muted: '#2a2f47',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'bio-gradient': 'linear-gradient(135deg, #30364f 0%, #252a40 50%, #30364f 100%)',
                'slate-glow': 'radial-gradient(ellipse at center, rgba(172,186,196,0.15) 0%, transparent 70%)',
                'beige-glow': 'radial-gradient(ellipse at center, rgba(225,217,188,0.15) 0%, transparent 70%)',
            },
            boxShadow: {
                'slate': '0 0 20px rgba(172,186,196,0.3), 0 0 60px rgba(172,186,196,0.1)',
                'beige': '0 0 20px rgba(225,217,188,0.3), 0 0 60px rgba(225,217,188,0.1)',
                'slate-sm': '0 0 10px rgba(172,186,196,0.2)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
