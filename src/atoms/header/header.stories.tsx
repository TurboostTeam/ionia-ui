import { Avatar } from "@radix-ui/react-avatar";
import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { AvatarFallback, AvatarImage } from "../avatar";
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
} from "../menu-bar";
import { Header } from ".";

const meta = {
  title: "Atoms 原子组件/Layout 布局/Header 顶栏",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

const menuItems = [
  {
    name: "File",
    items: [
      { name: "New File", to: "/" },
      { name: "New Tab", to: "/" },
    ],
  },
  {
    name: "Edit",
    items: [
      { name: "Undo", to: "/" },
      {
        name: "Redo",
        items: [
          { name: "Redo 1", to: "/" },
          { name: "Redo 2", to: "/" },
        ],
      },
    ],
  },
];

export const Base: FC = () => {
  return (
    <Header className="flex justify-between">
      <div>logo</div>
      <Menubar className="w-28 border-none">
        {menuItems.map((menuItem) => (
          <MenubarMenu key={menuItem.name}>
            <MenubarTrigger className="rounded">{menuItem.name}</MenubarTrigger>
            <MenubarContent>
              {menuItem.items.map((item, index) => (
                <div key={item.name}>
                  <MenubarItem
                    onSelect={() => {
                      console.log(item.to);
                    }}
                  >
                    {item.name}
                  </MenubarItem>
                  {index < menuItem.items.length - 1 && <MenubarSeparator />}
                  {item.items != null && (
                    <MenubarSub>
                      <MenubarSubTrigger>{item.name}</MenubarSubTrigger>
                      <MenubarSubContent>
                        {item.items.map((children) => (
                          <MenubarItem
                            key={children.name}
                            onSelect={() => {
                              console.log(item.to);
                            }}
                          >
                            {children.name}
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                </div>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
      <Avatar className="w-10">
        <AvatarImage src="https://avatars.githubusercontent.com/u/6771141?v=4" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </Header>
  );
};
