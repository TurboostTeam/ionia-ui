import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";

import { ToggleGroup, ToggleGroupItem } from ".";

const meta: Meta<typeof ToggleGroup> = {
  title: "Atoms 原子组件/Base 基础/ToggleGroup 切换组",
};

export default meta;

export const Default: FC = () => {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Single: FC = () => {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Multiple: FC = () => {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Disabled: FC = () => {
  return (
    <ToggleGroup disabled type="single">
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Small: FC = () => {
  return (
    <ToggleGroup size="sm" type="single">
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Large: FC = () => {
  const [value, setValue] = useState<string>("");
  return (
    <ToggleGroup
      size="lg"
      type="single"
      value={value}
      onValueChange={(val: string) => {
        setValue(val);
        console.log(val);
      }}
    >
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Outline: FC = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      variant="outline"
      onValueChange={(val: string[]) => {
        setValue(val);
        console.log(val);
      }}
    >
      <ToggleGroupItem value="bold">
        <LuBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <LuItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <LuUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
