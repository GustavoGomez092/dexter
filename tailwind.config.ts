import type { Config } from "tailwindcss"
const { nextui } = require("@nextui-org/react")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "dexter", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#1c9877",
            secondary: "#111827",
            accent: "#1fb2a6",
            neutral: "#111827",
            text: '#1B1E23',
            base: "#1B1E23",
            info: "#3abff8",
            success: "#1c9877",
            warning: "#fbbd23",
            error: "#f87272",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: "#1c9877",
            secondary: "#111827",
            accent: "#1fb2a6",
            neutral: "#111827",
            text: '#c9d1d9',
            base: "#1B1E23",
            info: "#3abff8",
            success: "#1c9877",
            warning: "#fbbd23",
            error: "#f87272",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}
export default config
