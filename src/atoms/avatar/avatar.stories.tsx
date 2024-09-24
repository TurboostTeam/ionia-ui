import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from ".";

const meta = {
  title: "Atoms 原子组件/Base 基础/Avatar 头像",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

export const Base: FC = () => {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/6771141?v=4" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};
