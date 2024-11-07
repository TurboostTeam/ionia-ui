import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from ".";

const meta = {
  title: "Atoms 原子组件/Base 基础/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Base: FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip Content</TooltipContent>
    </Tooltip>
  );
};
