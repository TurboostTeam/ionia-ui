import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../Button";
import { Popover } from "./Popover";
import page from "./Popover.mdx";

export default {
  title: "Layout 布局/Popover 弹出窗口",
  component: Popover,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Popover>;

export const Default: FC = (args) => {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-60">
      <Popover activator={<Button>打开弹出窗口</Button>} {...args}>
        <div className="p-4">内容</div>
      </Popover>
    </div>
  );
};
