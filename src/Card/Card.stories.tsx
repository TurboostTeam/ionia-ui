import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { DateRangePicker } from "../DateRangePicker";
import { Card } from "./Card";
import page from "./Card.mdx";

export default {
  title: "Layout 布局/Card 卡片",
  component: Card,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Card>;

export const Default: FC = (args) => {
  return <Card title="标题">卡片内的内容</Card>;
};

export const TitleAndActions: FC = (args) => {
  return (
    <Card
      actions={[{ content: "明细" }, { content: "编辑" }]}
      classNames={{ root: "h-72" }}
      extra={<DateRangePicker />}
      title="标题"
    >
      <div className="bg-surface-info">卡片内的内容</div>
      卡片内的内容
    </Card>
  );
};
