import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { type TableColumnProps } from "../table";
import { GraphQLTable } from "./GraphQLTable";

const meta = {
  title: "Advanced/GraphQLTable",
  component: GraphQLTable,
  tags: ["autodocs"],
} satisfies Meta<typeof GraphQLTable>;

export default meta;

export const Controlled: FC = () => {
  const columns: Array<TableColumnProps<any>> = [
    { accessorKey: "name" },
    { accessorKey: "age" },
    { accessorKey: "year", footer: () => "123" },
  ];

  return (
    <GraphQLTable
      loading
      columns={columns}
      edges={[
        { node: { name: "1", age: 1, year: 2023 }, cursor: "1" },
        { node: { name: "2", age: 2, year: 2023 }, cursor: "2" },
        { node: { name: "3", age: 3, year: 2023 }, cursor: "3" },
        { node: { name: "4", age: 4, year: 2023 }, cursor: "4" },
      ]}
      emptyStateDescription="没有找到相关记录"
      emptyStateTitle="暂无数据"
    />
  );
};
