import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { NumberInput } from "./number-input";

const meta = {
  title: "Form 表单/NumberInput 数字输入框",
  component: NumberInput,
  tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    placeholder: "12.34",
  },
};

export const Label: Story = {
  args: {
    label: "Price",
    placeholder: "12.34",
  },
};

export const HelpText: Story = {
  args: {
    label: "Price",
    placeholder: "12.34",
    helpText: "Please enter a price",
  },
};

export const Error: Story = {
  args: {
    label: "Price",
    placeholder: "12.34",
    helpText: "Please enter a price",
    error: "Price is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Price",
    placeholder: "12.34",
    helpText: "Please enter a price",
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
  const [value, onChange] = useState<number>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return <NumberInput max={100} value={value} onChange={onChange} />;
};
