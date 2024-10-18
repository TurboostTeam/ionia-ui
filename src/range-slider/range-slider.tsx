import React from "react";

import {
  Slider as SliderRoot,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "../atoms/slider";

export interface RangeSliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderRoot>,
    "value" | "onChange"
  > {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderRoot>,
  RangeSliderProps
>((props, ref) => (
  <SliderRoot ref={ref} {...props}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
    <SliderThumb />
  </SliderRoot>
));

RangeSlider.displayName = "RangeSlider";
