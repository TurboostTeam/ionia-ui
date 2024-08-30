import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const selectSeparator = tv({
  base: "bg-muted -mx-1 my-1 h-px",
});

export interface SelectSeparatorProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>,
    VariantProps<typeof selectSeparator> {}

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>((props, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    {...props}
    className={selectSeparator(props)}
  />
));
