import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";
import { tv } from "tailwind-variants";

export const sliderThumb = tv({
  base: "focus-visible:ring-ring block h-4 w-4 rounded-full border border-primary/50 bg-surface shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
});

export interface SliderThumbProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> {}

export const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  SliderThumbProps
>((props, ref) => (
  <SliderPrimitive.Thumb ref={ref} {...props} className={sliderThumb(props)} />
));

SliderThumb.displayName = "SliderThumb";
