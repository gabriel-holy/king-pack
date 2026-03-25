/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#242424",
        "bg-deep": "#1a1a1a",
        surface: "#2e2e2e",
        "surface-2": "#3a3a3a",
        "border-subtle": "#3d3d3d",
        accent: "#4dabf7",
        "accent-hover": "#1a8fd1",
        "text-primary": "#f0f0f0",
        "text-muted": "#888888",
      },
      fontFamily: {
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.6875rem", { lineHeight: "1.4" }],
        sm: ["0.75rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.375rem", { lineHeight: "1.3" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.2" }],
        "4xl": ["2.25rem", { lineHeight: "1.1" }],
        hero: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.1" }],
      },
      letterSpacing: {
        tight: "-0.02em",
        snug: "-0.01em",
        wide: "0.05em",
        wider: "0.08em",
        widest: "0.10em",
      },
      borderRadius: {
        sm: "3px",
        md: "6px",
        lg: "8px",
      },
      maxWidth: {
        content: "1200px",
        text: "680px",
      },
      spacing: {
        18: "72px",
        22: "88px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
