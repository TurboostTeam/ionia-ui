import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { type Meta, type StoryObj } from "@storybook/react";

import { EmptyState } from "./empty-state";

const meta = {
  title: "Feedback 反馈/EmptyState 空状态",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    icon: <RectangleStackIcon />,
    title: "No tasks",
    description: "Start by creating a new task",
  },
};
