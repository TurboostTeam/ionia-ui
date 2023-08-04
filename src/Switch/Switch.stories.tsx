import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";

import { Switch } from "./Switch";

const meta = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Switch",
  },
};

export const Checked: Story = {
  args: {
    label: "Switch",
    checked: true,
    onChange: () => {},
  },
};

export const Description: Story = {
  args: {
    label: "Switch",
    helpText: "This is a description",
  },
};

export const Controlled: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      helpText="This is a description"
      label="Switch"
      onChange={(value) => {
        console.log("checked =", value);
        setChecked(value);
      }}
    />
  );
};
