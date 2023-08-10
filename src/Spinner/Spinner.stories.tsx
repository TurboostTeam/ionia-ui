import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Spinner } from "./Spinner";

export default {
  title: "Base 基础/Spinner 加载",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export const Default: FC = (args) => {
  return <Spinner {...args} />;
};
