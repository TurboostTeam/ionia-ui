import { type Meta } from "@storybook/react";
import { useQueryState } from "nuqs";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../button";
import { CheckboxGroup } from "../checkbox-group";
import { DateRangePicker } from "../date-range-picker";
import { DateTimeInput } from "../date-time-input";
import { type FilterItemProps } from "../filter";
import { Input } from "../input";
import { type TableColumnProps } from "../table";
import { type ViewItem } from "../view";
import { type ActionType, IndexTable } from "./index-table";

const meta = {
  title: "Advanced 高级/IndexTable",
  component: IndexTable,
} satisfies Meta<typeof IndexTable>;

export default meta;

interface SearchViewItem extends ViewItem {
  search?: Record<string, any>;
}

export const Controlled: FC = () => {
  const [currentView, setCurrentView] = useQueryState("selectedView");

  const actionRef = useRef<ActionType>(null);

  const [viewItems, setViewItems] = useState<SearchViewItem[]>([
    { key: "1", label: "ALL", canEdit: false },
    {
      key: "2",
      label: "DRAFT",
      search: { query: "123", commentedAt: new Date() },
    },
  ]);

  const columns: Array<TableColumnProps<any>> = useMemo(
    () => [
      { accessorKey: "name" },
      { accessorKey: "age" },
      { accessorKey: "year", pin: "right", footer: () => "123" },
    ],
    [],
  );

  const filters: Array<FilterItemProps<any>> = useMemo(
    () => [
      {
        label: "编号",
        field: "user.id",
        render: ({ field }) => <Input {...field} value={field.value} />,
      },
      {
        label: "状态",
        field: "status",
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
        type: Date,
        render: ({ field: { value, onChange } }) => {
          return <DateTimeInput value={value} onChange={onChange} />;
        },
      },
      {
        label: "创建时间",
        field: "createdAt",
        type: Array,
        itemType: Date,
        pinned: true,
        render: ({ field: { value, onChange } }) => {
          return <DateRangePicker range={value} onChange={onChange} />;
        },
      },
    ],
    [],
  );

  useEffect(() => {
    /**
     * 当视图发生变化时，应用视图的过滤项，用 actionRef 的 setFilterValues 方法
     */
    const view = viewItems.find((item) => item.key === currentView);

    if (typeof view !== "undefined") {
      actionRef.current?.setFilterValues(
        typeof view?.search !== "undefined" ? view.search : {},
      );

      console.log("外部应用视图的过滤项", view);
    }
  }, [currentView, viewItems]);

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
        filters={filters}
        footer={<div>summary</div>}
        // orderOptions={[{ label: "编号", value: "user.id" }]}
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
          items: viewItems,
          activeKey: currentView ?? undefined,
          canAdd: true,
          onActiveChange: (key) => {
            void setCurrentView(key);
            /**
             * 1. 路由到新视图
             */
          },
          onAdd: (label, payload) => {
            /**
             * 1. 创建新视图
             * 2. 保存新视图到 viewItems
             * 3. 路由到新视图
             */
            const newKey = `view_${Date.now()}`;

            console.log("创建新视图", { label, payload });

            setViewItems([
              ...viewItems,
              {
                key: newKey,
                label,
                search: payload,
              },
            ]);

            void setCurrentView(newKey);
          },
          onSaveView: (viewKey, config) => {
            /**
             * 1. 保存视图
             * 2. 路由到新视图
             */
            console.log("视图保存", { viewKey, config });

            setViewItems((prev) => {
              return prev.map((item) => {
                if (item.key === viewKey) {
                  return { ...item, ...config };
                }

                return item;
              });
            });

            window.history.pushState(null, "", window.location.pathname);
            void setCurrentView(viewKey);
          },
          onEdit: (key, type, payload) => {
            console.log("视图编辑", key, type, payload);
          },
        }}
        onChange={(variables) => {
          console.log("触发请求 variables", variables);
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log({ record });
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
