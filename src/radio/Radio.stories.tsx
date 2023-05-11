import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "./Radio";

const meta = {
  title: "Base/Radio",
  component: Radio,
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Radio",
  },
};

export const Checked: Story = {
  args: {
    label: "Radio",
    checked: true,
    onChange: () => {},
  },
};

export const Description: Story = {
  args: {
    label: "Radio",
    helpText: "This is a description",
  },
};
