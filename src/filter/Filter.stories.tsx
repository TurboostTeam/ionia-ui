import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";

import { ChoiceList } from "../choice-list";
import { Input } from "../input";
import { Filter } from "./Filter";

const meta = {
  title: "Advanced/Filter",
  component: Filter,
  tags: ["autodocs"],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    searchPlaceholder: "Search",
    filters: [
      {
        label: "编号",
        field: "id",
        pinned: true,
        render: ({ field }) => <Input {...field} value={field.value ?? ""} />,
      },
      {
        label: "状态",
        field: "status",
        pinned: true,
        render: ({ field: { value, onChange } }) => (
          <ChoiceList
            multiple
            choices={[
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
            value={value ?? []}
            onChange={onChange}
          />
        ),
      },
    ],
    onChange: (values) => {
      console.log("values", values);
    },
  },
};

export const Test: FC = () => {
  const [values, setValues] = useState({});

  return (
    <Filter
      filters={[
        {
          label: "编号",
          field: "id",
          pinned: true,
          render: ({ field }) => <Input {...field} value={field.value ?? ""} />,
        },
        {
          label: "状态",
          field: "status",
          pinned: true,
          render: ({ field: { value, onChange } }) => (
            <ChoiceList
              multiple
              choices={[
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
              value={value ?? []}
              onChange={onChange}
            />
          ),
        },
      ]}
      values={values}
      onChange={(newValues) => {
        console.log("newValues", newValues);
        setValues(newValues);
      }}
    />
  );
};
