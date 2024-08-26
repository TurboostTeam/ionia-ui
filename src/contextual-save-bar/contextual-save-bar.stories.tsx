import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "@/card";
import { Frame } from "@/frame";
import { Page } from "@/page";

import { ContextualSaveBar } from "./contextual-save-bar";
import page from "./ContextualSaveBar.mdx";

const meta = {
  title: "Feedback 反馈/ContextualSaveBar 上下文保存栏",
  component: ContextualSaveBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      page,
    },
  },
} satisfies Meta<typeof ContextualSaveBar>;

export default meta;
export const Default: FC = (args) => {
  return (
    <div className="h-full w-full bg-gray-50">
      <Frame>
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

        <Page
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </Frame>
    </div>
  );
};

export const FullWidth: FC = (args) => {
  return (
    <div className="h-full w-full bg-gray-50">
      <Frame>
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
        <Page
          fullWidth
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </Frame>
    </div>
  );
};

export const NoMessage: FC = (args) => {
  return (
    <div className="h-full w-full bg-gray-50">
      <Frame>
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

        <Page
          fullWidth
          backAction={{}}
          primaryAction={{ content: "创建" }}
          secondaryActions={[{ content: "设置" }]}
          title="标题"
        >
          <Card className="h-72">页面内容</Card>
        </Page>
      </Frame>
    </div>
  );
};
