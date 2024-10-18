import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";
import { tv } from "tailwind-variants";

export const slider = tv({
  base: "relative flex w-full touch-none select-none items-center",
});

export interface SliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "onChange" | "onValueChange" | "onValueCommit"
  > {
  onChange?: React.ComponentPropsWithoutRef<
    typeof SliderPrimitive.Root
  >["onValueChange"];
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ onChange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    {...props}
    className={slider(props)}
    onValueChange={onChange}
  />
));

Slider.displayName = "Slider";
