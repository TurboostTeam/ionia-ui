// src/sheet/Sheet.stories.tsx

import { type FC } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

export default {
  title: "Atoms 原子组件/Layout 布局/Drawer 抽屉",
  component: Drawer,
};

export const Default: FC = () => (
  <Drawer>
    <DrawerTrigger>Open Drawer</DrawerTrigger>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
      </DrawerHeader>
      <DrawerDescription>
        This is a description of the sheet content.
      </DrawerDescription>
      <DrawerFooter>
        <button className="btn">Action 1</button>
        <button className="btn">Action 2</button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
