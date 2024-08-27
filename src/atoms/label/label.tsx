import * as LabelPrimitive from "@radix-ui/react-label";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const label = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export interface LabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof label> {}

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>((props, ref) => (
  <LabelPrimitive.Root ref={ref} {...props} className={label(props)} />
));
