import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const selectLabel = tv({
  base: "px-2 py-1.5 text-sm font-semibold",
});

export interface SelectLabelProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
    VariantProps<typeof selectLabel> {}

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>((props, ref) => (
  <SelectPrimitive.Label ref={ref} {...props} className={selectLabel(props)} />
));
