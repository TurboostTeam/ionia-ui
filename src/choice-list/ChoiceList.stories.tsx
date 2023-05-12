import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { ChoiceList } from "./ChoiceList";

const meta = {
  title: "Base/ChoiceList",
  component: ChoiceList,
  tags: ["autodocs"],
} satisfies Meta<typeof ChoiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: "status",
    label: "Choice List",
    choices: [
      { label: "Hidden", value: "hidden" },
      { label: "Optional", value: "optional" },
      { label: "Required", value: "required" },
    ],
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    name: "status",
    label: "Choice List",
    choices: [
      { label: "Hidden", value: "hidden" },
      { label: "Optional", value: "optional" },
      { label: "Required", value: "required" },
    ],
  },
};

export const Controlled: FC = () => {
  const [value, onChange] = useState<string>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return (
    <ChoiceList
      choices={[
        { label: "Hidden", value: "hidden" },
        { label: "Optional", value: "optional" },
        { label: "Required", value: "required" },
      ]}
      helpText="This is a description"
      label="Choice List"
      name="status"
      value={value}
      onChange={onChange}
    />
  );
};

export const MultipleControlled: FC = () => {
  const [value, onChange] = useState<string[]>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return (
    <ChoiceList
      multiple
      choices={[
        { label: "Hidden", value: "hidden" },
        { label: "Optional", value: "optional" },
        { label: "Required", value: "required" },
      ]}
      helpText="This is a description"
      label="Choice List"
      name="status"
      value={value}
      onChange={onChange}
    />
  );
};
