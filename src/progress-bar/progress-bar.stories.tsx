import type { Meta } from "@storybook/react";
import React, { type FC } from "react";

import { ProgressBar } from "./progress-bar";
import page from "./ProgressBar.mdx";

export default {
  title: "Layout 布局/ProgressBar 进度条",
  component: ProgressBar,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
    docs: {
      page,
    },
  },
} satisfies Meta<typeof ProgressBar>;

export const Default: FC = () => {
  return (
    <div className="h-72">
      <ProgressBar />
    </div>
  );
};
