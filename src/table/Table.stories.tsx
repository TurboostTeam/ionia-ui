import { type FC } from "react";

import { Table } from "./Table";

export default { component: Table };

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
