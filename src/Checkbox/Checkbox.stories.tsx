import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Checkbox } from "./Checkbox";
import page from "./Checkbox.mdx";

export default {
  title: "Form 表单/Checkbox 多选框",
  component: Checkbox,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Checkbox>;

export const Default: FC = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      label="Checkbox"
      onChange={(event) => {
        console.log("checked = ", event.target.checked);
        setChecked(event.target.checked);
      }}
      {...args}
    />
  );
};

export const Checked: FC = (args) => {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      checked={checked}
      label="Checkbox"
      onChange={(event) => {
        console.log("checked = ", event.target.checked);
        setChecked(event.target.checked);
      }}
      {...args}
    />
  );
};

export const HelpText: FC = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      helpText="Please select"
      label="Checkbox"
      onChange={(event) => {
        console.log("checked = ", event.target.checked);
        setChecked(event.target.checked);
      }}
      {...args}
    />
  );
};

export const Disabled: FC = (args) => {
  return (
    <div>
      <Checkbox disabled checked={false} label="Checkbox" {...args} />
      <Checkbox checked disabled label="Checkbox" {...args} />
    </div>
  );
};
