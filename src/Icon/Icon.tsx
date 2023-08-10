import { type ElementType } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface IconProps {
  as: ElementType;
  size?: keyof typeof sizeMap;
}

const sizeMap = {
  xs: twMerge(`h-3 w-3`),
  sm: twMerge(`h-4 w-4`),
  md: twMerge(`h-5 w-5`),
  lg: twMerge(`h-6 w-6`),
  xl: twMerge(`h-7 w-7`),
  "2xl": twMerge(`h-8 w-8`),
  "3xl": twMerge(`h-9 w-9`),
  "4xl": twMerge(`h-10 w-10`),
  "5xl": twMerge(`h-11 w-11`),
};

export const Icon = forwardRef<IconProps, "svg">(
  ({ as: Component = "svg", className, size = "md", ...props }, ref) => {
    return (
      <Component
        className={twMerge(sizeMap[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
