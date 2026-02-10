/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                electric: {
                    50: '#F0F4FF',
                    100: '#E0EAFF',
                    200: '#C2D6FF',
                    300: '#A3C2FF',
                    400: '#85ADFF',
                    500: '#4D7CFF', // Primary Accent
                    600: '#0052FF', // Deep Electric
                    700: '#0040C7',
                    800: '#003099',
                    900: '#002266',
                },
                surface: {
                    50: '#FAFAFA',
                    100: '#F5F5F7',
                    200: '#E5E5E5',
                    900: '#121212',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'layered-sm': '0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.1)',
                'layered-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
                'layered-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)',
                'glow': '0 0 15px rgba(77, 124, 255, 0.5)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'lift': 'lift 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                lift: {
                    '0%': { transform: 'translateY(0)', boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' },
                    '100%': { transform: 'translateY(-4px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
                }
            }
        },
    },
    plugins: [],
}