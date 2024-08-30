import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const pageLayoutSection = tv({
  base: "col-span-3",
  variants: {
    variant: {
      fullWidth: "",
      primary: "md:col-span-2",
      secondary: "md:col-span-1",
    },
  },
  defaultVariants: {
    variant: "fullWidth",
  },
});

export interface PageLayoutSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutSection> {}

export const PageLayoutSection = forwardRef<
  HTMLDivElement,
  PageLayoutSectionProps
>((props, ref) => (
  <div ref={ref} {...props} className={pageLayoutSection(props)} />
));
