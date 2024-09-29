import type { Meta } from "@storybook/react";
import { type FC } from "react";
import { BiHome } from "react-icons/bi";

import { Navigation } from "../../navigation";
import { NavigationSection } from "../../navigation-section";
import { Page } from "../../page";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Header } from "../header";
import { Frame } from ".";

const meta = {
  title: "Atoms 原子组件/Layout 布局/Frame 框架",
  component: Frame,
} satisfies Meta<typeof Frame>;

export default meta;

export const Base: FC = () => {
  return (
    <Frame
      header={
        <Header className="flex items-center justify-between border-b px-4">
          <div>logo</div>
          <Avatar className="size-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/6771141?v=4" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Header>
      }
      navigation={
        <Navigation location={window.location.hash}>
          <NavigationSection
            items={[
              {
                href: "#/",
                exactMatch: true,
                label: "概览",
                icon: BiHome,
              },
            ]}
          />
        </Navigation>
      }
    >
      <Page primaryAction={{ content: "创建" }} title="页面">
        内容
      </Page>
    </Frame>
  );
};
