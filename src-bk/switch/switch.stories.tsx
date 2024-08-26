import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Switch } from "./Switch";
import page from "./Switch.mdx";

export default {
  title: "Form 表单/Switch 开关",
  component: Switch,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Switch>;

export const Default: FC = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(value) => {
        console.log("checked =", value);
        setChecked(value);
      }}
      {...args}
    />
  );
};

export const Small: FC = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      size="sm"
      onChange={(value) => {
        console.log("checked =", value);
        setChecked(value);
      }}
      {...args}
    />
  );
};

export const Large: FC = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      size="lg"
      onChange={(value) => {
        console.log("checked =", value);
        setChecked(value);
      }}
      {...args}
    />
  );
};

export const WithLabel: FC = (args) => {
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
      {...args}
    />
  );
};
