import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#F36B4A",
          50: "#FEF1EC",
          100: "#FDE2D9",
          200: "#FAC3B2",
          300: "#F7A38A",
          400: "#F58566",
          500: "#F36B4A",
          600: "#E04E2B",
          700: "#B93B1D",
          800: "#8F2E17",
          900: "#5E1F10",
        },
        tangerine: {
          DEFAULT: "#FFAD66",
          50: "#FFF5EC",
          100: "#FFEAD6",
          200: "#FFD6B0",
          300: "#FFC28B",
          400: "#FFAD66",
          500: "#FF9533",
          600: "#E57A14",
        },
        charcoal: {
          DEFAULT: "#202124",
          50: "#F4F4F5",
          100: "#E6E6E8",
          200: "#C9C9CD",
          300: "#A2A3A8",
          400: "#76777D",
          500: "#55565C",
          600: "#3C3D42",
          700: "#2D2E32",
          800: "#26272A",
          900: "#202124",
          950: "#17181A",
        },
        cream: {
          DEFAULT: "#FFF7F1",
          50: "#FFFCFA",
          100: "#FFF7F1",
          200: "#FBEDE2",
        },
        sand: {
          DEFAULT: "#E8E4DE",
          50: "#F6F4F1",
          100: "#EFECE7",
          200: "#E8E4DE",
          300: "#D6D0C7",
          400: "#B9B1A5",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(32,33,36,0.04), 0 4px 16px -4px rgba(32,33,36,0.06)",
        lift: "0 2px 4px rgba(32,33,36,0.04), 0 16px 40px -12px rgba(32,33,36,0.16)",
        glow: "0 10px 30px -10px rgba(243,107,74,0.55)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F36B4A 0%, #FFAD66 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
        "fade-up": "fade-up 0.4s ease-out both",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.32s cubic-bezier(0.22,1,0.36,1)",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
