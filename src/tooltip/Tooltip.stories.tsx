import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { Badge } from "../badge";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Base/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Base: FC = () => {
  return (
    <div className="ml-64 mt-64">
      <Tooltip
        content="在日常工作中，经常会需要用到一些随机文字，比如设计页面时填充一些演示文字、测试软件时的随机文字等，之前我经常会到网页上随机搜索一些文字，但是操作起来往往比较麻烦"
        direction="top"
      >
        <Badge>tooltip</Badge>
      </Tooltip>
    </div>
  );
};
