import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useEffect, useState } from "react";

import { Select } from "./Select";

const meta = {
  title: "Form 表单/Select 选择器",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Select",
    value: "hidden",
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
  const [value, onChange] = useState<string>();

  useEffect(() => {
    console.log("value change:", value);
  }, [value]);

  return (
    <Select
      helpText="This is a description"
      label="Select"
      options={[
        {
          label: <span className="text-green-600">Completed</span>,
          value: TaskStatus.COMPLETED,
        },
        {
          label: <span className="text-red-600">Failed</span>,
          value: TaskStatus.FAILED,
        },
      ]}
      placeholder="Please"
      value={value}
      onChange={onChange}
    />
  );
};
