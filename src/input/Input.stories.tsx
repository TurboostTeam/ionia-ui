import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { Input } from "./Input";

const meta = {
  title: "Form/Input",
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
    helpText: "Please enter your email address",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helpText: "Please enter your email address",
    error: "Email is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helpText: "Please enter your email address",
    disabled: true,
  },
};

export const Prefix: Story = {
  args: {
    label: "Price",
    prefix: "$",
  },
};

export const Suffix: Story = {
  args: {
    label: "Price",
    suffix: "USD",
  },
};

export const Controlled: FC = () => {
  const [value, onChange] = useState<string>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return <Input value={value} onChange={onChange} />;
};
