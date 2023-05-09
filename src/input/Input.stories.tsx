import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "Base/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    placeholder: "you@example.com",
  },
};

export const Label: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};

export const HelpText: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "Please enter your email address",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "Please enter your email address",
    error: "Email is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "Please enter your email address",
    disabled: true,
  },
};
