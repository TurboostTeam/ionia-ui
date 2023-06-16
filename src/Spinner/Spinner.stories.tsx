import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta = {
  title: "Base/Spinner",
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
