import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    destructive: true,
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    as: "a",
    children: "Button",
    href: "#",
  },
};

export const Block: Story = {
  args: {
    children: "Button",
    className: "w-full",
  },
};
