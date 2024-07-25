/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      zIndex: {
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
      },
      backgroundColor: {
        default: colors.white,
        root: colors.gray[50],
        surface: colors.white,
        primary: colors.indigo[600],
        secondary: colors.white,
        destructive: {
          DEFAULT: colors.red[600],
          link: colors.transparent,
        },
        disabled: colors.gray[200],
        muted: colors.gray[100],
      },
      textColor: {
        default: colors.gray[900],
        primary: colors.white,
        destructive: {
          DEFAULT: colors.white,
          link: colors.red[600],
        },
        link: colors.indigo[600],
        secondary: colors.gray[700],
        disabled: colors.gray[400],
        icon: colors.gray[400],
        description: colors.gray[500],
        muted: colors.gray[600],
        error: colors.red[600],
      },
      boxShadowColor: {
        gray: colors.gray[500],
        red: colors.red[600],
        blue: colors.blue[700],
        yellow: colors.yellow[600],
        green: colors.green[600],
        indigo: colors.indigo[700],
        purple: colors.purple[700],
        pink: colors.pink[700],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
