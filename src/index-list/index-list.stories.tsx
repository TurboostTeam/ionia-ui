import { type Meta } from "@storybook/react";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "../badge";
import { Button } from "../button";
import { CheckboxGroup } from "../checkbox-group";
import { DateRangePicker } from "../date-range-picker";
import { DateTimeInput } from "../date-time-input";
import { type FilterItemProps } from "../filter";
import { type ActionType } from "../index-table";
import { Input } from "../input";
import { type ViewItem } from "../view";
import { IndexList } from "./index-list";
import { type TableColumnProps } from "./list-table";

const meta = {
  title: "Advanced 高级/IndexList 列表",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IndexList>;

export default meta;

export const Base: FC = () => {
  const actionRef = useRef<ActionType<any>>(null);

  const [views, setViews] = useState<ViewItem[]>([
    { key: "1", label: "ALL", canEdit: false },
    { key: "2", label: "DRAFT" },
  ]);
  const [activeViewKey, setActiveViewKey] = useState<string | undefined>("2");

  const columns: Array<TableColumnProps<any>> = useMemo(
    () => [
      {
        accessorKey: "name",
        cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-1 items-center justify-between">
              <div>
                <div className="flex gap-x-4">
                  <Badge color="red">已完成</Badge>
                  <div className="text-sm font-semibold leading-6 text-gray-900">
                    {original.name}
                  </div>
                </div>
                <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {original.description}
                </div>
              </div>
              <Button
                variant="link"
                onClick={() => {
                  console.log("查看");
                }}
              >
                查看
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const filters: Array<FilterItemProps<any>> = useMemo(
    () => [
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
    ],
    [],
  );

  useEffect(() => {
    console.log("挂载触发设置参数");
    actionRef.current?.setFilterValues({
      commentedAt: new Date(),
      createdAt: [new Date(), new Date()],
      status: ["waiting", "progress"],
      query: "123",
      "user.id": "aaa",
    });
  }, []);

  return (
    <div>
      <IndexList
        actionRef={actionRef}
        columns={columns}
        edges={[
          { node: { name: "1", description: "详情" }, cursor: "1" },
          { node: { name: "2", description: "详情" }, cursor: "2" },
          { node: { name: "3", description: "详情" }, cursor: "3" },
          { node: { name: "4", description: "详情" }, cursor: "4" },
        ]}
        emptyStateDescription="没有找到相关记录"
        emptyStateTitle="暂无数据"
        filters={filters}
        footer={
          <div className="flex h-10 items-center px-3 py-2 leading-10">
            4 items
          </div>
        }
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
        viewConfig={{
          items: views,
          activeKey: activeViewKey,
          canAdd: true,
          onActiveChange: (key) => {
            setActiveViewKey(key);
          },
          onAdd: (label) => {
            const newKey = Math.random().toString();

            setViews([...views, { key: newKey, label }]);
            setActiveViewKey(newKey);
          },
          onSaveView: (config) => {
            console.log("视图保存", config);
          },
          onEdit: (key, type, payload) => {
            console.log("视图编辑", key, type, payload);
          },
        }}
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
    </div>
  );
};
