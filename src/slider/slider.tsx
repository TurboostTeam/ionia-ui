import React from "react";

import {
  Slider as SliderRoot,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "../atoms/slider";

export interface SliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderRoot>,
    "value" | "onChange"
  > {
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderRoot>,
  SliderProps
>((props, ref) => (
  <SliderRoot
    ref={ref}
    {...props}
    value={typeof props.value === "number" ? [props.value] : undefined}
    onChange={(value) => {
      if (typeof props.onChange === "function") {
        props.onChange(value[0]);
      }
    }}
  >
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
  </SliderRoot>
));

Slider.displayName = "Slider";
