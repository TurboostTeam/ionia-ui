import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    placeholder: "Please enter description",
  },
};

export const Label: Story = {
  args: {
    label: "Description",
    placeholder: "Please enter description",
  },
};

export const HelpText: Story = {
  args: {
    label: "Description",
    placeholder: "Please enter description",
    helpText: "Please enter description",
  },
};

export const Error: Story = {
  args: {
    label: "Description",
    placeholder: "Please enter description",
    helpText: "Please enter description",
    error: "Description",
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    placeholder: "Please enter description",
    helpText: "Please enter description",
    disabled: true,
  },
};

export const Controlled: FC = () => {
  const [value, onChange] = useState<string>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return <Textarea value={value} onChange={onChange} />;
};
