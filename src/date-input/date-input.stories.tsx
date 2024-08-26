import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { DateInput } from "./date-input";

const meta: Meta<typeof DateInput> = {
  title: "Form 表单/DateInput 日期输入框",
  component: DateInput,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      return (
        <Story
          args={{
            ...ctx.args,
            onChange: (value: Date) => {
              ctx.args.onChange?.(value);

              // Check if the component is controlled
              if (ctx.args.value !== undefined) {
                setArgs({ value });
              }
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
    value: new Date(),
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
