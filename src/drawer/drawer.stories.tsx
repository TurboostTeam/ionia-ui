import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "@/button";

import { Drawer } from "./drawer";
import page from "./Drawer.mdx";

export default {
  title: "Layout 布局/Drawer 抽屉",
  component: Drawer,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Drawer>;

export const Default: FC = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开抽屉
      </Button>
      <Drawer
        footer={
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              取消
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              确定
            </Button>
          </div>
        }
        open={open}
        title="抽屉标题"
        onClose={() => {
          setOpen(false);
        }}
        {...args}
      >
        抽屉
      </Drawer>
    </div>
  );
};
