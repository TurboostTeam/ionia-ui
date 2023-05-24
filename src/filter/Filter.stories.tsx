import { type Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { CheckboxGroup } from "../checkbox-group";
import { DateSinglePicker } from "../date-single-picker";
import { Input } from "../input";
import { Filter } from "./Filter";

const meta = {
  title: "Advanced/Filter",
  component: Filter,
  tags: ["autodocs"],
} satisfies Meta<typeof Filter>;

export default meta;

interface Task {
  status: string;
  user: { id: string };
  commentedAt: Date;
}

export const Controlled: FC = () => {
  const [values, setValues] = useState({
    "user.id": "123",
    status: ["waiting"],
    commentedAt: new Date(2023, 5, 21),
  });

  return (
    <Filter<Task>
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
      ]}
      queryPlaceholder="搜索"
      values={values}
      onChange={(newValues) => {
        console.log("newValues:", newValues);
        setValues(newValues);
      }}
    />
  );
};
