import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Form/Checkbox",
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

export const Controlled: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      helpText="This is a description"
      label="Checkbox"
      onChange={(event) => {
        console.log("checked = ", event.target.checked);
        setChecked(event.target.checked);
      }}
    />
  );
};
