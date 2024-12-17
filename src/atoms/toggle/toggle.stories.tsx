import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";
import { LuBold, LuItalic } from "react-icons/lu";

import { Toggle } from ".";

const meta: Meta<typeof Toggle> = {
  title: "Atoms 原子组件/Base 基础/Toggle 切换",
  component: Toggle,
};

export default meta;

export const Default: FC = () => {
  return (
    <Toggle>
      <LuItalic />
    </Toggle>
  );
};

export const Outline: FC = () => {
  return (
    <Toggle variant="outline">
      <LuBold />
    </Toggle>
  );
};

export const Small: FC = () => {
  return (
    <Toggle size="sm">
      <LuBold />
    </Toggle>
  );
};

export const Large: FC = () => {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle pressed={pressed} size="lg" onPressedChange={setPressed}>
      <LuBold />
    </Toggle>
  );
};

export const Disabled: FC = () => {
  return (
    <Toggle disabled>
      <LuBold />
    </Toggle>
  );
};
