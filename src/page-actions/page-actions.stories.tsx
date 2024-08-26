import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { PageActions } from "./page-actions";
import page from "./page-actions.mdx";

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
    <div className="bg-gray-50 p-10">
      <PageActions
        primaryAction={{ content: "保存" }}
        secondaryActions={[{ content: "删除", variant: "destructive" }]}
        {...args}
      />
    </div>
  );
};
