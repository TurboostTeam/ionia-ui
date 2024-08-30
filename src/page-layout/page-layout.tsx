import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const pageLayout = tv({
  base: "grid grid-cols-3 gap-4",
});

export interface PageLayoutProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayout> {}

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  (props, ref) => <div ref={ref} {...props} className={pageLayout(props)} />,
);
