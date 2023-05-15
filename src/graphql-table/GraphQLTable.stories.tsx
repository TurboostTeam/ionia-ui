import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { GraphQLTable } from "./GraphQLTable";

const meta = {
  title: "Advanced/GraphQLTable",
  component: GraphQLTable,
  tags: ["autodocs"],
} satisfies Meta<typeof GraphQLTable>;

export default meta;

export const Controlled: FC = () => {
  return (
    <GraphQLTable
      loading
      columns={[]}
      edges={[]}
      emptyStateDescription="没有找到相关记录"
      emptyStateTitle="暂无数据"
    />
  );
};
