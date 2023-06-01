import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { Table } from "./Table";

const meta = {
  title: "Advanced/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

interface Person {
  payload: {
    a: number;
    b: string[];
  };
  name: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

export const Base: FC = () => {
  return (
    <Table<Person>
      bodyHeight={100}
      columns={[
        {
          header: "Name",
          align: "right",
          accessorKey: "name",
          size: 100,
          footer: () => "123",
        },
        {
          header: "Age",
          accessorKey: "age",
          size: 100,
          footer: () => "123",
        },
        {
          header: "Visits",
          accessorKey: "visits",
          size: 100,
          align: "center",
          footer: () => "123",
        },
        {
          header: "Status asasad",
          size: 100,
          accessorKey: "status",
          footer: () => "123 as d  ",
        },
        {
          header: "Progress",
          accessorKey: "progress",
          footer: () => "123",
        },
        { header: "Payload", accessorKey: "payload.a" },
      ]}
      data={[
        {
          payload: { a: 1, b: ["1", "tanner"] },
          name: "linsley",
          age: 24,
          visits: 100,
          status: "In Relationship",
          progress: 50,
        },
        {
          payload: { a: 2, b: ["2", "tandy"] },
          name: "miller",
          age: 40,
          visits: 40,
          status: "Single",
          progress: 80,
        },
        {
          payload: { a: 3, b: ["3", "joe"] },
          name: "dirte",
          age: 45,
          visits: 20,
          status: "Complicated",
          progress: 10,
        },
      ]}
      onRow={(record) => {
        return {
          onClick: () => {
            console.log(record);
          },
        };
      }}
    />
  );
};
