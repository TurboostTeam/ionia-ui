/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      zIndex: {
        10: "60",
        20: "60",
        30: "60",
        40: "60",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
