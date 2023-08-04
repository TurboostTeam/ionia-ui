import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Base 基础/Badge 徽章",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { children: "Badge" },
};

export const Color: Story = {
  args: { children: "Badge", color: "red" },
};

export const Remove: Story = {
  args: {
    children: "Badge",
    color: "red",
    onClick: () => {
      console.log("click");
    },
    onRemove: () => {
      console.log("remove");
    },
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    children: "Badge",
    color: "red",
    onClick: () => {
      console.log("click");
    },
    onRemove: () => {
      console.log("remove");
    },
  },
};
