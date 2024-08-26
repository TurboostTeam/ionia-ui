import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Form 表单/Input 输入框",
  component: Input,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      return (
        <Story
          args={{
            ...ctx.args,
            onChange: (value: string) => {
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
    value: "",
    placeholder: "you@example.com",
  },
};

export const Label: Story = {
  args: {
    value: "",
    label: "Email",
    placeholder: "you@example.com",
  },
};

export const HelpText: Story = {
  args: {
    value: "",
    label: "Email",
    placeholder: "you@example.com",
    helpText: "Please enter your email address",
  },
};

export const Error: Story = {
  args: {
    value: "",
    label: "Email",
    placeholder: "you@example.com",
    helpText: "Please enter your email address",
    error: "Email is required",
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    label: "Email",
    placeholder: "you@example.com",
    helpText: "Please enter your email address",
    disabled: true,
  },
};

export const Prefix: Story = {
  args: {
    value: "",
    label: "Price",
    prefix: "$",
  },
};

export const Suffix: Story = {
  args: {
    value: "",
    label: "Price",
    suffix: "USD",
  },
};
