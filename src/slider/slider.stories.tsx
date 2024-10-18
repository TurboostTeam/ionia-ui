import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Slider } from ".";

export default {
  title: "Form 表单/Slider 滑块",
  component: Slider,
} satisfies Meta<typeof Slider>;

export const Default: FC = (args) => {
  return <Slider {...args} />;
};
