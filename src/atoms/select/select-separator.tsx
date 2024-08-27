import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv } from "tailwind-variants";

export const selectSeparator = tv({
  base: "bg-muted -mx-1 my-1 h-px",
});

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>((props, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    {...props}
    className={selectSeparator(props)}
  />
));
