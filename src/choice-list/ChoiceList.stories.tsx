import type { Meta, StoryObj } from "@storybook/react";

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
    label: "Choice List",
    choices: [
      { label: "Hidden", value: "hidden" },
      { label: "Optional", value: "optional" },
      { label: "Required", value: "required" },
    ],
  },
};
