import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";

const meta = {
  title: "Base/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    data: { defaultValue: [] },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    columns: [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Age",
        field: "age",
      },
    ],
    data: [
      {
        name: "Mehmet",
        age: 6,
      },
      {
        name: "Mehmet",
        age: 6,
      },
      {
        name: "Mehmet",
        age: 6,
      },
    ],
  },
};
