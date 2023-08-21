import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PageLayoutSectionProps {
  secondary?: boolean;
}

export const PageLayoutSection: FC<
  PropsWithChildren<PageLayoutSectionProps>
> = ({ secondary = false, children }) => {
  return (
    <div
      className={twMerge(
        secondary ? `flex-[1] min-w-0` : `flex-[2] min-w-[51%]`,
        `basis-full md:basis-0`,
      )}
    >
      {children}
    </div>
  );
};
