import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "../Card";
import { Page } from "../Page";
import { ContextualSaveBar } from "./ContextualSaveBar";
import page from "./ContextualSaveBar.mdx";

export default {
  title: "Layout 布局/ContextualSaveBar 上下文保存条",
  component: ContextualSaveBar,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof ContextualSaveBar>;

export const Default: FC = (args) => {
  return (
    <div className="bg-gray-100">
      <ContextualSaveBar
        discardAction={{
          content: "放弃",
          onAction: () => {
            console.log("放弃");
          },
        }}
        message="保存条"
        saveAction={{
          content: "保存",
          onAction: () => {
            console.log("保存");
          },
        }}
        {...args}
      />
      <div className="mt-14">
        <Page
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </div>
    </div>
  );
};

export const FullWidth: FC = (args) => {
  return (
    <div className="bg-gray-100">
      <ContextualSaveBar
        fullWidth
        discardAction={{
          content: "放弃",
          onAction: () => {
            console.log("放弃");
          },
        }}
        message="保存条"
        saveAction={{
          content: "保存",
          onAction: () => {
            console.log("保存");
          },
        }}
        {...args}
      />
      <div className="mt-14">
        <Page
          fullWidth
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </div>
    </div>
  );
};

export const NoMessage: FC = (args) => {
  return (
    <div className="bg-gray-100">
      <ContextualSaveBar
        fullWidth
        discardAction={{
          content: "放弃",
          onAction: () => {
            console.log("放弃");
          },
        }}
        saveAction={{
          content: "保存",
          onAction: () => {
            console.log("保存");
          },
        }}
        {...args}
      />
      <div className="mt-14">
        <Page
          fullWidth
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </div>
    </div>
  );
};
