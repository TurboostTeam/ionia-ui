import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta = {
  title: "Base/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: <div className="h-72">卡片内容</div>,
  },
};
