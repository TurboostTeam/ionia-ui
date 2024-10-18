import type { Meta } from "@storybook/react";
import { type FC } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from ".";

const meta = {
  title: "Atoms 原子组件/Layout 布局/Menubar 菜单",
  component: Menubar,
} satisfies Meta<typeof Menubar>;

export default meta;

export const Base: FC = () => {
  return (
    <Menubar className="w-28">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <a href="/">New File</a>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>New Tab</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Redo</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Redo 1</MenubarItem>
              <MenubarItem>Redo 2</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
