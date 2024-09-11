import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";
import { tv } from "tailwind-variants";

export const sliderRange = tv({
  base: "absolute h-full bg-fill-primary",
});

export interface SliderRangeProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> {}

export const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  SliderRangeProps
>((props, ref) => (
  <SliderPrimitive.Range ref={ref} {...props} className={sliderRange(props)} />
));

SliderRange.displayName = "SliderRange";
