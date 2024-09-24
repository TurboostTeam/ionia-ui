import { type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";

const header = tv({
  base: "flex h-14 items-center gap-4 border-b bg-surface px-4",
});

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div {...props} className={header(props)}>
      {props.children}
    </div>
  );
};
