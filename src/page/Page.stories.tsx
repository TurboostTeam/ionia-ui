import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Page } from "./Page";

const meta = {
  title: "Base/Page",
  component: Page,
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: "标题",
    primaryButton: <Button primary>主要按钮</Button>,
    secondaryButtons: [<Button key="key">次要按钮</Button>],
    children: <div className="h-20 bg-gray-100">页面内容</div>,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    title: "标题",
    primaryButton: <Button primary>主要按钮</Button>,
    secondaryButtons: [<Button key="key">次要按钮</Button>],
    children: <div className="h-20 bg-gray-100">页面内容</div>,
  },
};
