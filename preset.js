/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      zIndex: {
        10: "var(--z-index-10)",
        20: "var(--z-index-20)",
        30: "var(--z-index-30)",
        40: "var(--z-index-40)",
        50: "var(--z-index-50)",
        60: "var(--z-index-60)",
        70: "var(--z-index-70)",
        80: "var(--z-index-80)",
        90: "var(--z-index-90)",
        100: "var(--z-index-100)",
        110: "var(--z-index-110)",
        120: "var(--z-index-120)",
      },

      backgroundColor: {
        // 默认背景颜色，运动于大面积元素（如卡片）。
        default: "var(--bg-default)",
        // 用于突出度最高的元素的背景颜色，如卡片。
        surface: {
          DEFAULT: "var(--bg-surface-default)",
          hover: "var(--bg-surface-hover)",
          active: "var(--bg-surface-active)",
          info: "var(--bg-surface-info)",
          transparent: "var(--bg-surface-transparent)",
          // 主要用于显示小部分内容的背景颜色，如聊天气泡。
          secondary: "var(--bg-surface-secondary)",
          // 用于背景，指示编辑器的重点领域，例如主题编辑器，input。
          emphasis: {
            DEFAULT: "var(--bg-emphasis-default)",
            hover: "var(--bg-emphasis-hover)",
            active: "var(--bg-emphasis-active)",
          },
        },

        facebook: "var(--bg-facebook)",

        // 用于导航栏的背景颜色。
        nav: {
          DEFAULT: "var(--bg-nav-default)",
          // 用于导航栏浅表色
          surface: {
            DEFAULT: "var(--bg-nav-surface-default)",
            hover: "var(--bg-nav-surface-hover)",
            active: "var(--bg-nav-surface-active)",
          },
        },
        // 所包含表面积较小的元素（如按钮）的背景颜色。
        fill: {
          // 主要操作（如主要按钮）的背景颜色。
          primary: {
            DEFAULT: "var(--bg-fill-primary-default)",
            secondary: "var(--bg-fill-primary-secondary)",
            hover: "var(--bg-fill-primary-hover)",
            active: "var(--bg-fill-primary-active)",
            // selected: "",
          },
          // 次要操作（如次要按钮）的背景颜色。
          secondary: {
            DEFAULT: "var(--bg-fill-secondary-default)",
            hover: "var(--bg-fill-secondary-hover)",
            active: "var(--bg-fill-secondary-active)",
            // active: "",
            // selected: "",
          },
          // 警告操作（如警告按钮）的背景颜色。
          destructive: {
            DEFAULT: "var(--bg-fill-destructive-default)",
            hover: "var(--bg-fill-destructive-hover)",
            active: "var(--bg-fill-destructive-active)",
            // selected: "",
          },
          // 禁用状态的背景颜色。
          disabled: "var(--bg-fill-disabled)",
          // 用于表面的背景颜色。
          transparent: {
            DEFAULT: "var(--bg-fill-transparent-default)",
            hover: "var(--bg-fill-transparent-hover)",
          },
        },
      },
      textColor: {
        // 用于填充背景颜色下的文本颜色。
        fill: {
          primary: "var(--text-fill-primary)",
          secondary: "var(--text-fill-secondary)",
          destructive: "var(--text-fill-destructive)",
        },
        // 用于链接文本的颜色。
        link: {
          DEFAULT: "var(--text-link-default)",
          hover: "var(--text-link-hover)",
          active: "var(--text-link-active)",
        },
        // 用于默认文本的颜色。
        default: "var(--text-default)",

        // 用于占位符的文本颜色。
        placeholder: "var(--text-placeholder)",

        facebook: "var(--text-facebook)",

        // 用于主要比如 radio ,checkbox 的 input选中状态下的文本颜色。
        primary: "var(--text-primary)",

        // 用于次要文本的颜色。
        secondary: "var(--text-secondary)",

        // 用于提示的文本颜色。
        destructive: {
          DEFAULT: "var(--text-destructive-default)",
          placeholder: "var(--text-destructive-placeholder)",
        },

        // 用于禁用状态的文本颜色。
        disabled: "var(--text-disabled)",

        // 用于描述性文本的颜色。
        description: "var(--text-description)",

        // 用于导航栏的文本颜色。
        nav: {
          DEFAULT: "var(--text-nav-default)",
          hover: "var(--text-nav-hover)",
          active: "var(--text-nav-active)",
        },
      },

      borderColor: {
        default: "var(--border-default)",
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
      },

      ringColor: {
        // 用于外部阴影的颜色。
        default: {
          DEFAULT: "var(--ring-default)",
          focus: "var(--ring-default-focus)",
        },

        // 用于提示的边框色
        destructive: {
          DEFAULT: "var(--ring-destructive-default)",
          focus: "var(--ring-destructive-focus)",
        },
      },

      borderRadius: {
        // 默认边框半径
        default: "var(--border-radius-default)",
        // 无边框半径
        none: "var(--border-radius-none)",
        // 小边框半径
        sm: "var(--border-radius-sm)",
        // 中等边框半径
        md: "var(--border-radius-md)",
        // 大边框半径
        lg: "var(--border-radius-lg)",
        // 超大边框半径
        xl: "var(--border-radius-xl)",
        // 2倍边框半径
        "2xl": "var(--border-radius-2xl)",
        // 3倍边框半径
        "3xl": "var(--border-radius-3xl)",
        // 完全圆角
        full: "var(--border-radius-full)",
      },

      fontSize: {
        // 小字体
        sm: "var(--font-size-sm)",
        // 基准字体
        base: "var(--font-size-base)",
        // 超大字体
        xl: "var(--font-size-xl)",
        // 2倍超大字体
        "2xl": "var(--font-size-2xl)",
        // 3倍超大字体
        "3xl": "var(--font-size-3xl)",
        // 4倍超大字体
        "4xl": "var(--font-size-4xl)",
        // 5倍超大字体
        "5xl": "var(--font-size-5xl)",
      },

      fontWeight: {
        // 薄字体
        thin: "var( --font-weight-thin)",
        // 超薄字体
        extralight: "var(--font-weight-extralight)",
        // 细字体
        light: "var(--font-weight-light)",
        // 正常字体
        normal: "var(--font-weight-normal)",
        // 中等字体
        medium: "var(--font-weight-medium)",
        // 半粗体
        semibold: "var(--font-weight-semibold)",
        // 粗体
        bold: "var(--font-weight-bold)",
        // 超粗体
        extrabold: "var(--font-weight-extrabold)",
        // 黑体
        black: "var(--font-weight-black)",
      },
    },
  },
  plugins: [
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
