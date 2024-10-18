import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";
import { tv } from "tailwind-variants";

export const sliderTrack = tv({
  base: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-fill-primary/20",
});

export interface SliderTrackProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> {}

export const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  SliderTrackProps
>((props, ref) => (
  <SliderPrimitive.Track ref={ref} {...props} className={sliderTrack(props)} />
));

SliderTrack.displayName = "SliderTrack";
