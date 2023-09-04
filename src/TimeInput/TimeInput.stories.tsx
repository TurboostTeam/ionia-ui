import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { TimeInput } from "./TimeInput";

const meta: Meta<typeof TimeInput> = {
  title: "Form 表单/TimeInput 时间输入框",
  component: TimeInput,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      return (
        <Story
          args={{
            ...ctx.args,
            onChange: (value: Date) => {
              ctx.args.onChange?.(value);
              setArgs({ value });
            },
          }}
        />
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "请输入日期",
  },
};

export const Min: Story = {
  args: {
    min: new Date(),
    placeholder: "请输入日期",
  },
};

export const Label: Story = {
  args: {
    value: new Date(),
    label: "开始日期",
    placeholder: "请输入日期",
  },
};

export const HelpText: Story = {
  args: {
    value: new Date(),
    label: "开始日期",
    placeholder: "请输入日期",
    helpText: "请输入一个日期",
  },
};

export const Error: Story = {
  args: {
    value: new Date(),
    label: "开始日期",
    placeholder: "请输入日期",
    helpText: "请输入一个日期",
    error: "必须填写开始日期",
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(),
    label: "开始日期",
    placeholder: "请输入日期",
    helpText: "请输入一个日期",
    disabled: true,
  },
};
