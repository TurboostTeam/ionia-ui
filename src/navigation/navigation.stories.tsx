import type { Meta } from "@storybook/react";
import { type FC } from "react";
import {
  BiBarChart,
  BiChevronRight,
  BiCodeAlt,
  BiConversation,
  BiGitPullRequest,
  BiHome,
  BiHomeAlt,
  BiServer,
  BiUser,
} from "react-icons/bi";

import { NavigationSection } from "@/navigation-section";

import { Navigation } from "./navigation";
import page from "./Navigation.mdx";

export default {
  title: "Layout 布局/Navigation 导航",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Navigation>;

export const Default: FC = (args) => {
  return (
    <div className="h-96">
      <Navigation location={window.location.hash} {...args}>
        <NavigationSection
          action={{
            icon: BiChevronRight,
            onAction: () => {
              console.log("action");
            },
          }}
          items={[
            {
              href: "#/",
              exactMatch: true,
              label: "概览",
              icon: BiHome,
            },
            {
              label: "仓库",
              icon: BiCodeAlt,
              children: [
                {
                  href: "#/home",
                  icon: BiHomeAlt,
                  label: "主页",
                },
                {
                  href: "#/dashboard",
                  icon: BiBarChart,
                  label: "仪表盘",
                },
              ],
            },
            {
              href: "#/issues",
              label: "议题",
              icon: BiConversation,
            },
            {
              href: "#/pull-requests",
              label: "合并请求",
              icon: BiGitPullRequest,
            },
          ]}
          title="导航"
        />
        <NavigationSection
          items={[
            {
              href: "#/members",
              label: "成员",
              icon: BiUser,
            },
            {
              href: "#/deployments",
              label: "部署",
              icon: BiServer,
            },
          ]}
          title="管理"
        />
        <NavigationSection
          action={{
            icon: BiChevronRight,
            onAction: () => {},
          }}
          items={[
            {
              label: "Example App 1",
              badge: "20",
            },
            {
              label: "Example App 2",
            },
          ]}
          title="应用"
        />
      </Navigation>
    </div>
  );
};
