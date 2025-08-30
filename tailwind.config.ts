import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx,js,jsx,mdx}",
    "components/**/*.{ts,tsx,js,jsx,mdx}",
    "pages/**/*.{ts,tsx,js,jsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        slate: {
          1: "rgb(var(--slate-1) / <alpha-value>)",
          2: "rgb(var(--slate-2) / <alpha-value>)",
          3: "rgb(var(--slate-3) / <alpha-value>)",
          4: "rgb(var(--slate-4) / <alpha-value>)",
          5: "rgb(var(--slate-5) / <alpha-value>)",
          6: "rgb(var(--slate-6) / <alpha-value>)",
          7: "rgb(var(--slate-7) / <alpha-value>)",
          8: "rgb(var(--slate-8) / <alpha-value>)",
          9: "rgb(var(--slate-9) / <alpha-value>)",
          10: "rgb(var(--slate-10) / <alpha-value>)",
          11: "rgb(var(--slate-11) / <alpha-value>)",
          12: "rgb(var(--slate-12) / <alpha-value>)",
        },
        gray: {
          1: "rgb(var(--gray-1) / <alpha-value>)",
          2: "rgb(var(--gray-2) / <alpha-value>)",
          3: "rgb(var(--gray-3) / <alpha-value>)",
          4: "rgb(var(--gray-4) / <alpha-value>)",
          5: "rgb(var(--gray-5) / <alpha-value>)",
          6: "rgb(var(--gray-6) / <alpha-value>)",
          7: "rgb(var(--gray-7) / <alpha-value>)",
          8: "rgb(var(--gray-8) / <alpha-value>)",
          9: "rgb(var(--gray-9) / <alpha-value>)",
          10: "rgb(var(--gray-10) / <alpha-value>)",
          11: "rgb(var(--gray-11) / <alpha-value>)",
          12: "rgb(var(--gray-12) / <alpha-value>)",
        },
        white: "#ffffff",
        black: "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "1.3", letterSpacing: "-0.3px", fontWeight: "300" }],
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "-0.36px", fontWeight: "300" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.42px" }],
        base: ["1rem", { lineHeight: "1.6", letterSpacing: "-0.48px" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.72px" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.8px" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-1.12px" }],
        "3xl": ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-1.2px" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-1.44px" }],
        "5xl": ["3rem", { letterSpacing: "-1.6px" }],
        "6xl": ["3.75rem", { letterSpacing: "-1.8px" }],
        "7xl": ["4.5rem", { letterSpacing: "-2px" }],
        "8xl": ["6rem", { letterSpacing: "-2.4px" }],
        "9xl": ["8rem", { letterSpacing: "-3.2px" }],
      },
      letterSpacing: {
        tighter: "-0.58px",
        tight: "-0.48px",
      },
      typography: {
        DEFAULT: {
          css: {
            p: { letterSpacing: "-0.48px" },
            code: { letterSpacing: "normal" },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
