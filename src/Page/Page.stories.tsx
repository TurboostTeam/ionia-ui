import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../Button";
import { Card } from "../Card";
import { Page } from "./Page";
import page from "./Page.mdx";

export default {
  title: "Layout 布局/Page 页面",
  component: Page,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Page>;

export const Default: FC = (args) => {
  return (
    <Page
      primaryButton={<Button primary>创建</Button>}
      secondaryButtons={[<Button key="settings">设置</Button>]}
      title="标题"
      {...args}
    >
      <Card className="h-72">页面内容</Card>
    </Page>
  );
};

export const FullWidth: FC = (args) => {
  return (
    <Page
      fullWidth
      primaryButton={<Button primary>创建</Button>}
      secondaryButtons={[<Button key="settings">设置</Button>]}
      title="标题"
      {...args}
    >
      <Card className="h-72">页面内容</Card>
    </Page>
  );
};
