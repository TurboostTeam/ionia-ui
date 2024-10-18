import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Slider, SliderRange, SliderThumb, SliderTrack } from ".";

export default {
  title: "Atoms 原子组件/Form 表单/Slider 滑块",
  component: Slider,
} satisfies Meta<typeof Slider>;

export const Default: FC = () => {
  return (
    <Slider>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};
