import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "@/button";
import { useToast } from "@/toast";

import { Dropdown } from "./dropdown";
import page from "./Dropdown.mdx";

export default {
  title: "Overlay 叠层/Dropdown 下拉菜单",
  component: Dropdown,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Dropdown>;

export const Default: FC = (args) => {
  const toast = useToast();
  return (
    <div className="flex items-center justify-center bg-gray-50 p-60">
      <Dropdown
        activator={<Button>打开弹出窗口</Button>}
        sections={[
          {
            items: [
              {
                content: "帮助中心",
                onAction: () => {
                  toast({ content: "打开帮助中心" });
                },
              },
              {
                content: "更改日志",
                onAction: () => {
                  toast({ content: "打开更改日志" });
                },
              },
            ],
          },
          {
            title: "user@example.com",
            items: [
              {
                content: "管理账户",
                onAction: () => {
                  toast({ content: "打开管理账户" });
                },
              },
              {
                content: "登出",
                onAction: () => {
                  toast({ content: "登出" });
                },
              },
            ],
          },
        ]}
        {...args}
      />
    </div>
  );
};
