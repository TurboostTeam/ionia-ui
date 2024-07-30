import { type FC } from "react";
import { tv } from "tailwind-variants";

import { useAppProviderProps } from "../AppProvider";
import { Badge } from "../Badge";
import { useNavigationProps } from "../Navigation";
import { type NavigationItemProps } from "./NavigationItem";

export interface NavigationItemChildrenItemProps
  extends Omit<NavigationItemProps, "children"> {}

// eslint-disable-next-line react-refresh/only-export-components
export const navigationItemChildrenItem = tv({
  slots: {
    itemLink:
      "flex h-8 w-full cursor-pointer items-center gap-2 rounded pl-9 pr-1 text-sm text-nav hover:bg-nav-surface-hover hover:text-nav-hover",
    itemIcon: "h-5 w-5",
    itemLabel: "flex-1 font-semibold",
  },
  variants: {
    itemActive: {
      true: {
        itemLink:
          "bg-nav-surface text-nav-active hover:bg-nav-surface-hover hover:text-nav-hover",
      },
    },
  },
});

export const NavigationItemChildrenItem: FC<
  NavigationItemChildrenItemProps
> = ({
  label,
  href,
  exactMatch = false,
  excludePaths = [],
  icon: Icon,
  selected = false,
  onAction,
  badge,
}) => {
  const { itemLink, itemIcon, itemLabel } = navigationItemChildrenItem();

  const { location } = useNavigationProps();
  const { linkComponent: Link } = useAppProviderProps();

  const active =
    selected ||
    (typeof href !== "undefined" &&
      !excludePaths.includes(href) &&
      (exactMatch ? href === location : location.startsWith(href)));
  return (
    <Link
      className={itemLink({
        itemActive: active,
      })}
      href={href}
      onClick={onAction}
    >
      {typeof Icon !== "undefined" && <Icon className={itemIcon()} />}
      <div className={itemLabel()}>{label}</div>
      {typeof badge !== "undefined" && <Badge rounded>{badge}</Badge>}
    </Link>
  );
};
