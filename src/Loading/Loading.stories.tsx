import type { Meta } from "@storybook/react";
import React, { type FC } from "react";

import { Loading } from "./Loading";

export default {
  title: "Layout 布局/Loading 加载",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Loading>;

export const Default: FC = () => {
  return (
    <div className="h-72">
      <Loading />
    </div>
  );
};
