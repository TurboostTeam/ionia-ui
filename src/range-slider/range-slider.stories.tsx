import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { RangeSlider } from ".";

export default {
  title: "Form 表单/RangeSlider 范围滑块",
  component: RangeSlider,
} satisfies Meta<typeof RangeSlider>;

export const Default: FC = (args) => {
  return <RangeSlider defaultValue={[0, 0]} {...args} />;
};
