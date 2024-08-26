import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from "react";

export type LinkProps = Pick<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "children" | "className" | "href" | "target" | "onClick"
>;

export const Link: FC<LinkProps> = ({ children, ...props }) => {
  return <a {...props}>{children}</a>;
};
