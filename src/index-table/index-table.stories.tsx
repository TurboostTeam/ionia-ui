import { type Meta } from "@storybook/react";
import { type FC, useRef } from "react";

import { Button } from "@/button";
import { CheckboxGroup } from "@/checkbox-group";
import { DateRangePicker } from "@/date-range-picker";
import { DateTimeInput } from "@/date-time-input";
import { Input } from "@/input";
import { type TableColumnProps } from "@/table";

import { type ActionType, IndexTable } from "./index-table";

const meta = {
  title: "Advanced 高级/IndexTable",
  component: IndexTable,
} satisfies Meta<typeof IndexTable>;

export default meta;

export const Controlled: FC = () => {
  const actionRef = useRef<ActionType>(null);

  const columns: Array<TableColumnProps<any>> = [
    { accessorKey: "name" },
    { accessorKey: "age" },
    { accessorKey: "year", pin: "right", footer: () => "123" },
  ];

  return (
    <div>
      <IndexTable
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
              return <DateTimeInput value={value} onChange={onChange} />;
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
        rowSelection={{
          allowSelectAll: true,
          // single: false,
          bulkActions: (rows, isSelectedAll) => [
            {
              content: "编辑",
              onClick: () => {
                console.log(111, rows, isSelectedAll);
              },
            },
            { content: "删除" },
          ],
          onSelectionChange: (rows) => {
            console.log(rows);
          },
        }}
        search={{ queryPlaceholder: "search" }}
        toolBarRender={() => <div>toolbar</div>}
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
