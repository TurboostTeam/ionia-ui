import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta = {
  title: "Base 基础/Spinner 加载",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: "md",
  },
};
