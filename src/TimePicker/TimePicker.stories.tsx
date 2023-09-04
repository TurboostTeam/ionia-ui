import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Form 表单/TimePicker 时间选择器",
  component: TimePicker,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      return (
        <Story
          args={{
            ...ctx.args,
            onChange: (value) => {
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
    min: new Date(),
    // value: new Date(),
  },
};
