import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "../Card";
import { Page } from "../Page";
import { PageActions } from "./PageActions";
import page from "./PageActions.mdx";

export default {
  title: "Layout 布局/PageActions 页面操作",
  component: PageActions,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof PageActions>;

export const Default: FC = (args) => {
  return (
    <div className="bg-gray-50">
      <Page
        backAction={{}}
        secondaryActions={[{ content: "设置" }]}
        title="标题"
      >
        <Card className="h-72">页面内容</Card>
        <PageActions
          primaryAction={{ content: "保存" }}
          secondaryActions={[{ content: "删除", destructive: true }]}
          {...args}
        />
      </Page>
    </div>
  );
};

export const FullWidth: FC = (args) => {
  return (
    <div className="bg-gray-100">
      <Page
        fullWidth
        primaryAction={{ content: "创建" }}
        secondaryActions={[{ content: "设置" }]}
        title="标题"
      >
        <Card className="h-72">页面内容</Card>
        <PageActions
          primaryAction={{ content: "保存" }}
          secondaryActions={[{ content: "删除", destructive: true }]}
          {...args}
        />
      </Page>
    </div>
  );
};
