import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("./preset")],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
