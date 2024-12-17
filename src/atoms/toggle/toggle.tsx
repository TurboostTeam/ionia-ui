import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: "ring-offset-background inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-fill-secondary-hover hover:text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-fill-secondary-active data-[state=on]:text-default [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-fill-secondary",
      outline:
        "border bg-transparent text-default hover:bg-fill-secondary-hover hover:text-default",
    },
    size: {
      default: "h-10 min-w-10 px-3",
      sm: "h-9 min-w-9 px-2.5",
      lg: "h-11 min-w-11 px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
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
