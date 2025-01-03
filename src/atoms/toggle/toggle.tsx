import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: "ring-offset-background inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-fill-secondary-hover hover:text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-fill-secondary-active data-[state=on]:text-default [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      primary: "bg-fill-primary text-fill-primary hover:bg-fill-primary-hover",
      secondary: "bg-fill-secondary text-default hover:bg-fill-secondary-hover",
      destructive:
        "bg-fill-destructive text-fill-destructive hover:bg-fill-destructive-hover",
      outline: "border bg-transparent text-default",
      ghost: "bg-fill-transparent text-default hover:bg-fill-transparent-hover",
      link: "bg-transparent text-link underline-offset-4 hover:text-link-hover active:text-link-active",
    },
    size: {
      sm: "rounded p-1.5 text-xs font-normal",
      md: "rounded-md p-2 text-sm font-medium",
      lg: "rounded-lg p-3 text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
});

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    className={twMerge(toggleVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;
