import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Form 表单/RadioGroup 单选框组",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Checkbox Group",
    options: [
      { label: "Hidden", value: "hidden" },
      { label: "Optional", value: "optional" },
      { label: "Required", value: "required" },
    ],
  },
};

enum TaskStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const Controlled: FC = () => {
  const [value, onChange] = useState<TaskStatus>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return (
    <RadioGroup
      helpText="This is a description"
      label="Checkbox Group"
      options={[
        { label: "Completed", value: TaskStatus.COMPLETED },
        { label: "Failed", value: TaskStatus.FAILED },
      ]}
      value={value}
      onChange={onChange}
    />
  );
};
