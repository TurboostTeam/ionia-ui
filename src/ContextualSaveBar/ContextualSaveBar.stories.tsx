import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Page } from "../Page";
import { ContextualSaveBar } from "./ContextualSaveBar";

const meta = {
  title: "Layout 布局/ContextualSaveBar 上下文保存条",
  component: ContextualSaveBar,
} satisfies Meta<typeof ContextualSaveBar>;

export default meta;
export const Controlled: FC = () => {
  return (
    <div className="h-64">
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
      />
      <div className="mt-16">
        <Page title="页面" />
      </div>
    </div>
  );
};
