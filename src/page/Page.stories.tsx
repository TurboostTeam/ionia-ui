import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Card } from "../card";
import { Page } from "./Page";

const meta = {
  title: "Base/Page",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: "标题",
    primaryButton: <Button primary>主要按钮</Button>,
    secondaryButtons: [<Button key="key">次要按钮</Button>],
    children: <Card className="h-72">页面内容</Card>,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    title: "标题",
    primaryButton: <Button primary>主要按钮</Button>,
    secondaryButtons: [<Button key="key">次要按钮</Button>],
    children: <Card className="h-72">页面内容</Card>,
  },
};
