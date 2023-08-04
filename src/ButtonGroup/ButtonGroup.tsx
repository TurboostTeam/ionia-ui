import { type FC, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const ButtonGroup: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={twMerge(`flex gap-2`, className)} {...props}>
      {children}
    </div>
  );
};
