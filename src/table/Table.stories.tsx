import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { Table } from "./Table";

const meta = {
  title: "Advanced/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

interface Task {
  name: string;
  status: string;
}

export const Base: FC = () => {
  return (
    <Table<Task>
      columns={[
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Status",
          field: "status",
        },
      ]}
      data={[
        {
          name: "Mehmet",
          status: "started",
        },
        {
          name: "Mehmet",
          status: "completed",
        },
        {
          name: "Mehmet",
          status: "failed",
        },
      ]}
    />
  );
};
