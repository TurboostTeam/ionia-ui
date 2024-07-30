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
        // 默认背景颜色，运动于大面积元素（如卡片）。
        default: colors.gray[50],
        // 用于突出度最高的元素的背景颜色，如卡片。
        surface: {
          DEFAULT: colors.white,
          hover: colors.gray[50],
          active: colors.gray[100],
          transparent: colors.transparent,
          // 用于背景，指示编辑器的重点领域，例如主题编辑器，input。
          emphasis: {
            DEFAULT: colors.white,
            hover: colors.gray[50],
            active: colors.gray[100],
          },
        },
        // 用于导航栏的背景颜色。
        nav: {
          DEFAULT: colors.indigo[600],
          // 用于导航栏浅表色
          surface: {
            DEFAULT: colors.white,
            hover: colors.gray[50],
            active: colors.indigo[50],
          },
        },
        // 所包含表面积较小的元素（如按钮）的背景颜色。
        fill: {
          // 主要操作（如主要按钮）的背景颜色。
          primary: {
            DEFAULT: colors.indigo[600],
            secondary: colors.indigo[50],
            hover: colors.indigo[700],
            active: colors.indigo[400],
            // selected: "",
          },
          // 次要操作（如次要按钮）的背景颜色。
          secondary: {
            DEFAULT: colors.white,
            hover: colors.gray[100],
            active: colors.gray[100],
            // active: "",
            // selected: "",
          },
          // 警告操作（如警告按钮）的背景颜色。
          destructive: {
            DEFAULT: colors.red[600],
            hover: colors.red[400],
            active: colors.red[400],
            // selected: "",
          },
          // 禁用状态的背景颜色。
          disabled: colors.gray[200],
          // 用于表面的背景颜色。
          transparent: {
            DEFAULT: colors.transparent,
            hover: colors.gray[100],
          },
        },
      },
      textColor: {
        link: {
          DEFAULT: colors.indigo[500],
          hover: colors.indigo[400],
          active: colors.indigo[700],
        },
        // 用于默认文本的颜色。
        default: {
          DEFAULT: colors.gray[900],
          placeholder: colors.gray[400],
        },
        // 用于主要文本的颜色。
        primary: {
          DEFAULT: colors.indigo[500],
          // 用于主要按钮等颜色的前景色。
          foreground: colors.white,
        },
        // 用于次要文本的颜色。
        secondary: {
          DEFAULT: colors.white,
          foreground: colors.gray[600],
        },
        // 用于提示的文本颜色。
        destructive: {
          DEFAULT: colors.red[600],
          foreground: colors.white,
          placeholder: colors.red[300],
        },
        // 用于禁用状态的文本颜色。
        disabled: colors.gray[400],

        // 用于导航栏的文本颜色。
        nav: {
          DEFAULT: colors.slate[900],
          hover: colors.indigo[500],
          active: colors.indigo[600],
        },
        description: colors.gray[500],
      },
      borderColor: {
        default: colors.gray[200],
        primary: colors.indigo[600],
        secondary: colors.gray[200],
      },

      ringColor: {
        // 用于外部阴影的颜色。
        default: {
          DEFAULT: colors.gray[300],
          focus: colors.indigo[600],
        },
        // 用于提示的边框色
        destructive: {
          DEFAULT: colors.red[300],
          focus: colors.red[500],
        },
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
