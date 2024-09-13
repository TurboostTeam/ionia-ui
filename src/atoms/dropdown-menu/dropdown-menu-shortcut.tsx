import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const dropdownMenuShortcutVariants = tv({
  base: "ml-auto text-xs tracking-widest opacity-60",
});

export interface DropdownMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dropdownMenuShortcutVariants> {}

export const DropdownMenuShortcut = React.forwardRef<
  React.ElementRef<"span">,
  DropdownMenuShortcutProps
>(({ className, ...props }, ref) => (
  <span
    className={dropdownMenuShortcutVariants({ className })}
    ref={ref}
    {...props}
  />
));

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
