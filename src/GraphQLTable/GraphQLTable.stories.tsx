import { type Meta } from "@storybook/react";
import { type FC, useRef } from "react";

import { Button } from "../Button";
import { CheckboxGroup } from "../CheckboxGroup";
import { DateRangePicker } from "../DateRangePicker";
import { DateSinglePicker } from "../DateSinglePicker";
import { Input } from "../Input";
import { type TableColumnProps } from "../Table";
import { type ActionType, GraphQLTable } from "./GraphQLTable";

const meta = {
  title: "Advanced 高级/GraphQLTable",
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
        filters={[
          {
            label: "编号",
            field: "user.id",
            pinned: true,
            render: ({ field }) => <Input {...field} value={field.value} />,
          },
          {
            label: "状态",
            field: "status",
            pinned: true,
            render: ({ field: { value, onChange } }) => (
              <CheckboxGroup
                options={[
                  {
                    label: "等待中",
                    value: "waiting",
                  },
                  {
                    label: "进行中",
                    value: "progress",
                  },
                  {
                    label: "已完成",
                    value: "completed",
                  },
                  {
                    label: "已失败",
                    value: "failed",
                  },
                ]}
                value={value}
                onChange={onChange}
              />
            ),
          },
          {
            label: "评论时间",
            field: "commentedAt",
            pinned: true,
            render: ({ field: { value, onChange } }) => {
              return <DateSinglePicker date={value} onChange={onChange} />;
            },
          },
          {
            label: "创建时间",
            field: "createdAt",
            pinned: true,
            render: ({ field: { value, onChange } }) => {
              return <DateRangePicker range={value} onChange={onChange} />;
            },
          },
        ]}
        footer={<div>summary</div>}
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
