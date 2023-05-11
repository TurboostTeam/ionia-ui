import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Checkbox",
  },
};

export const Checked: Story = {
  args: {
    label: "Checkbox",
    checked: true,
    onChange: () => {},
  },
};

export const Description: Story = {
  args: {
    label: "Checkbox",
    helpText: "This is a description",
  },
};
