import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { type Meta, type StoryObj } from "@storybook/react";

import { EmptyState } from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
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
