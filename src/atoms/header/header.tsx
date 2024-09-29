import { type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";

const header = tv({
  base: "h-14 w-full",
});

export interface HeaderProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  navigation?: ReactNode;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div {...props} className={header(props)}>
      {typeof props.header !== "undefined" && <div>{props.header}</div>}
      {typeof props.navigation !== "undefined" && <div>{props.navigation}</div>}
      {props.children}
    </div>
  );
};
