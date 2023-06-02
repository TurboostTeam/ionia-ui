import { type Meta } from "@storybook/react";
import { type FC, useRef } from "react";

import { Button } from "../button";
import { type TableColumnProps } from "../table";
import { type ActionType, GraphQLTable } from "./GraphQLTable";

const meta = {
  title: "Advanced/GraphQLTable",
  component: GraphQLTable,
  tags: ["autodocs"],
} satisfies Meta<typeof GraphQLTable>;

export default meta;

export const Controlled: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const columns: Array<TableColumnProps<any>> = [
    { accessorKey: "name" },
    { accessorKey: "age" },
    { accessorKey: "year", footer: () => "123" },
  ];

  return (
    <div>
      <GraphQLTable
        actionRef={actionRef}
        columns={columns}
        edges={[
          { node: { name: "1", age: 1, year: 2023 }, cursor: "1" },
          { node: { name: "2", age: 2, year: 2023 }, cursor: "2" },
          { node: { name: "3", age: 3, year: 2023 }, cursor: "3" },
          { node: { name: "4", age: 4, year: 2023 }, cursor: "4" },
        ]}
        emptyStateDescription="没有找到相关记录"
        emptyStateTitle="暂无数据"
        search={{ placeholder: "search" }}
        onChange={(variables) => {
          console.log(variables);
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        }}
      />

      <Button
        onClick={() => {
          actionRef.current?.reloadAndRest();
        }}
      >
        重置游标
      </Button>
    </div>
  );
};
