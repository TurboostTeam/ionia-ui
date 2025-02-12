import type { Meta } from "@storybook/react";
import { type FC } from "react";
import { BiHome } from "react-icons/bi";

import { Page } from "../../page";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Header } from "../header";
import { Menubar, MenubarMenu, MenubarTrigger } from "../menu-bar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../sidebar";
import { Frame } from ".";

const meta = {
  title: "Atoms 原子组件/Layout 布局/Frame 框架",
  component: Frame,
} satisfies Meta<typeof Frame>;

export default meta;

export const Base: FC = () => {
  return (
    <Frame>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>logo</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiHome />
                  <span>概览</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="w-full">
          <Page fullWidth primaryAction={{ content: "创建" }} title="页面">
            内容
          </Page>
        </div>
      </SidebarProvider>
    </Frame>
  );
};

export const TopNav: FC = () => {
  const items = [
    {
      href: "#/",
      exactMatch: true,
      label: "概览",
      icon: BiHome,
    },
    {
      href: "#/",
      exactMatch: true,
      label: "登录",
      icon: BiHome,
    },
  ];
  return (
    <Frame
      header={
        <Header className="flex items-center justify-between border-b px-4">
          <div className="flex items-center">
            <div className="mr-4">logo</div>
            <Menubar className="border-none">
              {items.map((item) => (
                <MenubarMenu key={item.label}>
                  <MenubarTrigger className="rounded">
                    {item.label}
                  </MenubarTrigger>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          <Avatar className="size-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/6771141?v=4" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Header>
      }
    >
      <Page fullWidth primaryAction={{ content: "创建" }} title="页面">
        内容
      </Page>
    </Frame>
  );
};
