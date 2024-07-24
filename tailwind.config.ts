import { type Config } from "tailwindcss";

export default {
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "var(--primary-color)",
  //       secondary: "var(--secondary-color)",
  //       success: "var(--success-color)",
  //       warning: "var(--warning-color)",
  //       danger: "var(--danger-color)",
  //       info: "var(--info-color)",
  //       light: "var(--light-color)",
  //     },
  //   },
  // },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("./preset")],
} satisfies Config;
